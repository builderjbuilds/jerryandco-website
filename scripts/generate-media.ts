/**
 * Jerry & Co. — Media Generation Script
 * ─────────────────────────────────────────────────────────────────
 * Generates photorealistic images via Flux.1-dev (HuggingFace)
 * and uploads them to Cloudinary.
 *
 * Usage:
 *   npx tsx scripts/generate-media.ts                  # generate + upload all
 *   npx tsx scripts/generate-media.ts --dry-run        # generate only, no upload
 *   npx tsx scripts/generate-media.ts hero             # filter by keyword + upload
 *   npx tsx scripts/generate-media.ts hero --dry-run   # filter by keyword, no upload
 *
 * Prerequisites:
 *   pnpm add -D tsx dotenv cloudinary
 *   HF_TOKEN, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY,
 *   CLOUDINARY_API_SECRET set in .env
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// ── CLI flags ────────────────────────────────────────────────────
const args      = process.argv.slice(2);
const DRY_RUN   = args.includes('--dry-run');
const FILTER    = args.find(a => !a.startsWith('--')) ?? '';

// ── Config ───────────────────────────────────────────────────────
const HF_TOKEN  = process.env.HF_TOKEN;
const CLOUD     = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? process.env.CLOUDINARY_CLOUD_NAME;
const CLD_KEY   = process.env.CLOUDINARY_API_KEY;
const CLD_SEC   = process.env.CLOUDINARY_API_SECRET;
const OUT_DIR   = 'assets/img/generated';
const HF_MODEL  = 'black-forest-labs/FLUX.1-dev';
const HF_URL    = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
const DELAY_MS  = 2500; // between requests — respects HF rate limits

if (!HF_TOKEN) {
  console.error('ERROR: HF_TOKEN not set in .env');
  process.exit(1);
}

if (!DRY_RUN) {
  if (!CLOUD || !CLD_KEY || !CLD_SEC) {
    console.error('ERROR: Cloudinary credentials missing in .env (CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET)');
    process.exit(1);
  }
  cloudinary.config({ cloud_name: CLOUD, api_key: CLD_KEY, api_secret: CLD_SEC });
}

fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Universal negative prompt ────────────────────────────────────
const NEGATIVE = [
  'cartoon, illustration, painting, watercolor, sketch, anime, drawing',
  'low quality, blurry, pixelated, jpeg artifacts, grainy, noisy',
  'oversaturated, HDR, heavy vignette, lens flare, fisheye',
  'text overlay, logo, watermark, border, frame, collage',
  'distorted perspective, warped architecture, melted surfaces',
  'cluttered, dirty, stained, mold, damage, peeling',
  'dark harsh shadows, blown highlights, flash photography glare',
].join(', ');

// ── Asset type ───────────────────────────────────────────────────
interface Asset {
  id: string;
  prompt: string;
  w: number;
  h: number;
}

// ── Helpers ──────────────────────────────────────────────────────
function localPath(publicId: string): string {
  return path.join(OUT_DIR, publicId.replace(/\//g, '_') + '.png');
}

async function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

async function generateFlux(
  prompt: string,
  publicId: string,
  width = 1024,
  height = 768,
  attempt = 1,
): Promise<string> {
  const file = localPath(publicId);

  if (fs.existsSync(file)) {
    const kb = Math.round(fs.statSync(file).size / 1024);
    console.log(`  ↳ exists locally (${kb}KB): ${file}`);
    return file;
  }

  console.log(`  Generating${attempt > 1 ? ` (attempt ${attempt})` : ''}: ${publicId}`);

  const res = await fetch(HF_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        width,
        height,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        negative_prompt: NEGATIVE,
      },
    }),
  });

  // Model cold-start — HF returns 503 while loading
  if (res.status === 503) {
    const wait = attempt <= 3 ? 30_000 : 60_000;
    console.log(`  ⏳ Model loading — waiting ${wait / 1000}s before retry...`);
    await sleep(wait);
    return generateFlux(prompt, publicId, width, height, attempt + 1);
  }

  // Rate limit
  if (res.status === 429) {
    console.log(`  ⏳ Rate limited — waiting 60s...`);
    await sleep(60_000);
    return generateFlux(prompt, publicId, width, height, attempt + 1);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`HF API ${res.status}: ${body.slice(0, 200)}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());

  // Sanity check — HF sometimes returns an error JSON instead of image bytes
  if (buf.length < 10_000) {
    const text = buf.toString('utf-8');
    if (text.startsWith('{')) {
      const err = JSON.parse(text);
      throw new Error(`HF returned JSON instead of image: ${err.error ?? text}`);
    }
  }

  fs.writeFileSync(file, buf);
  console.log(`  ✓ saved ${file} (${Math.round(buf.length / 1024)}KB)`);
  return file;
}

async function uploadCld(file: string, publicId: string): Promise<string> {
  console.log(`  ↑ uploading → Cloudinary: ${publicId}`);
  const result = await cloudinary.uploader.upload(file, {
    public_id: publicId,
    overwrite: true,
    resource_type: 'image',
    quality: 'auto',
    fetch_format: 'auto',
  });
  console.log(`  ✓ ${result.secure_url}`);
  return result.secure_url;
}

async function gen(asset: Asset): Promise<void> {
  try {
    const file = await generateFlux(asset.prompt, asset.id, asset.w, asset.h);
    if (!DRY_RUN) {
      await uploadCld(file, asset.id);
    } else {
      console.log(`  ↷ dry-run: skipped upload for ${asset.id}`);
    }
  } catch (err) {
    console.error(`  ✗ FAILED ${asset.id}: ${(err as Error).message}`);
    // Continue with next asset — do not abort the whole run
  }
}

// ── Full asset manifest ──────────────────────────────────────────
const ASSETS: Asset[] = [

  // ════════════════════════════════════════════════════════════════
  // HERO SLIDES — P0 launch blockers
  // ════════════════════════════════════════════════════════════════
  {
    id: 'v1/hero/hero-slide-01-boston-aerial',
    w: 1600, h: 900,
    prompt: `Photorealistic wide-angle street photograph of a classic Boston inner-suburb neighborhood,
triple-decker wood-frame houses and 3-story brick condo buildings lining a tree-lined residential street
in Somerville or Cambridge Massachusetts, late afternoon golden hour light raking warmly across bay
windows and aged brick facades, rich amber and terracotta tones, deep green mature maple trees in full
leaf, quiet well-kept sidewalk, slight cinematic depth of field with foreground softly blurred,
architectural residential photography, 24mm lens perspective, no prominent people, no cars in
foreground, premium real estate neighborhood photography, ultra-detailed, 8K quality`,
  },
  {
    id: 'v1/hero/hero-slide-02-kitchen-before',
    w: 1600, h: 900,
    prompt: `Photorealistic interior photograph of a compact condominium kitchen in Boston Massachusetts,
original 1990s to early 2000s honey oak cabinet doors with medium oak finish, slightly dated but
structurally sound, galley or L-shaped layout, warm natural window daylight from left side, clean
laminate or tile countertops in neutral beige or white, white ceramic tile backsplash, tile or
vinyl floor, no people, clean but lived-in condo condition, honest residential interior photography,
not staged, realistic`,
  },
  {
    id: 'v1/hero/hero-slide-03-kitchen-after',
    w: 1600, h: 900,
    prompt: `Photorealistic interior photograph of a transformed condominium kitchen in Boston Massachusetts,
same compact galley or L-shaped layout now with cabinet doors refinished in deep forest green matte
factory-smooth finish, 2K polyurethane spray result with zero brush marks, crisp bright natural window
light, clean white quartz countertops, matte black cabinet hardware and pulls, clean subway tile
backsplash, no people, interior design editorial photography, dramatic before-after transformation
quality, immaculate professional result, magazine quality`,
  },
  {
    id: 'v1/hero/hero-slide-04-bathroom-after',
    w: 1600, h: 900,
    prompt: `Photorealistic interior photograph of a freshly renovated compact condominium bathroom in
Boston Massachusetts, gut-free refresh result, white 3x6 subway tile on walls in running bond pattern,
updated white rectangular sink vanity with brushed nickel faucet and hardware, fresh painted walls in
warm white, frameless mirror with warm LED vanity lighting, clean porcelain floor tile, no people,
spa-like hotel bathroom quality in small footprint, bright and airy interior design photography,
immaculate condition`,
  },
  {
    id: 'v1/hero/hero-video-poster',
    w: 1600, h: 900,
    prompt: `Photorealistic interior photograph of a transformed condominium kitchen in Boston Massachusetts,
compact galley layout with cabinet doors refinished in deep forest green factory-smooth matte finish,
professional 2K polyurethane result, crisp natural window light, white quartz countertops, matte black
hardware, no people, editorial interior design photography, perfect smooth finish`,
  },

  // ════════════════════════════════════════════════════════════════
  // GALLERY — before/after project pairs (P1)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'v1/projects/somerville-cabinet-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a compact galley kitchen in a Somerville Massachusetts
triple-decker apartment unit, original 1990s honey oak raised-panel cabinet doors, medium-tone wood
grain, dated but clean and structurally intact, natural daylight from small window, white or off-white
tile countertops, no people, honest residential before-state photography`,
  },
  {
    id: 'v1/projects/somerville-cabinet-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of the same compact galley kitchen in a Somerville
Massachusetts triple-decker apartment unit, cabinet doors fully refinished in deep forest green
factory-smooth matte 2K polyurethane finish, professional spray result with no brush marks, crisp
natural light, updated matte black hardware, dramatic transformation result, editorial interior
photography quality, no people`,
  },
  {
    id: 'v1/projects/cambridge-bathroom-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a small dated bathroom in a Cambridge Massachusetts
condominium, original 1980s ceramic tile in beige or light pink, older pedestal or vanity sink with
chrome fixtures, fluorescent light bar, dated condition but clean, honest before-state residential
photography, no people`,
  },
  {
    id: 'v1/projects/cambridge-bathroom-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a renovated small bathroom in a Cambridge Massachusetts
condominium, new white 3x6 subway tile on walls, updated white rectangular vanity with brushed nickel
fixtures, fresh warm white paint, LED mirror lighting, clean floor tile, gut-free refresh result,
spa-like quality, interior design photography, no people`,
  },
  {
    id: 'v1/projects/arlington-painting-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a living room in a 1970s Arlington Massachusetts
colonial single-family home, existing wall paint in yellowed or slightly dingy white and beige,
original wood trim and baseboards, natural light through double-hung windows, dated but clean
condition, honest before-state residential photography, no people`,
  },
  {
    id: 'v1/projects/arlington-painting-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of the same living room in an Arlington Massachusetts
colonial home after professional interior repaint, fresh bright crisp white walls with clean bright
white trim and baseboards, warm natural light through windows, editorial real estate photography
quality, clean and modern result, no people`,
  },
  {
    id: 'v1/projects/medford-cabinet-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a compact kitchen in a Medford Massachusetts
condominium conversion unit, original honey oak or medium-tone wood cabinet doors from 1990s,
slightly dated finish, natural daylight, clean condition, honest before-state residential
photography, no people`,
  },
  {
    id: 'v1/projects/medford-cabinet-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a kitchen in a Medford Massachusetts condominium
conversion unit, cabinet doors refinished in warm bone white factory-smooth matte finish,
professional 2K polyurethane spray result, bright and crisp natural light, clean transformation,
editorial interior photography, no people`,
  },
  {
    id: 'v1/projects/malden-cabinet-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a basic rental kitchen in a Malden Massachusetts
multi-family building unit, original builder-grade oak or medium brown cabinet doors, functional
but dated, neutral countertops, honest before-state rental property photography, no people`,
  },
  {
    id: 'v1/projects/malden-cabinet-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of the same rental kitchen in a Malden Massachusetts
multi-family building unit, cabinets refinished in clean bright white factory-smooth matte finish,
elevated rental-ready result, bright natural light, professional quality, no people`,
  },
  {
    id: 'v1/projects/everett-bathroom-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a small dated bathroom in an Everett Massachusetts
condominium, original ceramic tile in dated beige or off-white, older vanity and fixtures from
1990s, honest before-state condition documentation photography, no people`,
  },
  {
    id: 'v1/projects/everett-bathroom-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a refreshed small bathroom in an Everett Massachusetts
condominium, large-format 12x24 white porcelain tile on walls, updated white vanity with chrome or
brushed nickel fixtures, clean and modern result, gut-free renovation, interior photography, no people`,
  },
  {
    id: 'v1/projects/woburn-painting-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a living room and dining area in a 1960s Woburn
Massachusetts colonial home, original aged wall paint in ivory or yellowed white, original trim,
natural light, dated but clean residential condition, honest before-state photography, no people`,
  },
  {
    id: 'v1/projects/woburn-painting-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a refreshed living room and dining area in a Woburn
Massachusetts colonial home, fresh crisp white paint on walls with bright white trim, warm natural
light, editorial real estate result quality, clean and updated, no people`,
  },
  {
    id: 'v1/projects/winchester-kitchen-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a generously sized kitchen in a Winchester Massachusetts
colonial single-family home, original 1990s full-overlay oak cabinet doors in honey or medium tone,
solid wood cabinet boxes, spacious layout, slightly dated but high-quality construction, natural light,
honest before-state photography, no people`,
  },
  {
    id: 'v1/projects/winchester-kitchen-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of the same generous kitchen in a Winchester Massachusetts
colonial home, all cabinet doors and frames refinished in deep navy blue factory-smooth matte 2K
polyurethane finish, dramatic high-value transformation, warm natural light, brass or gold hardware,
editorial interior design photography, magazine quality, no people`,
  },
  {
    id: 'v1/projects/cambridge-cabinet-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a compact condo kitchen in Cambridge Massachusetts
near Inman or Porter Square, original dated cabinet doors in medium wood tone or honey oak,
honest before-state documentation, natural light, no people`,
  },
  {
    id: 'v1/projects/cambridge-cabinet-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a compact condo kitchen in Cambridge Massachusetts
after cabinet refinishing, deep navy blue matte shaker-style finish, factory-smooth 2K polyurethane
result, crisp editorial interior photography, no people`,
  },
  {
    id: 'v1/projects/somerville-bathroom-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a dated bathroom in a Somerville Massachusetts
triple-decker unit, original 1980s pink or beige ceramic tile, older chrome fixtures, fluorescent
lighting, honest before-state documentation, no people`,
  },
  {
    id: 'v1/projects/somerville-bathroom-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a refreshed bathroom in a Somerville Massachusetts
triple-decker unit, new white subway tile, updated brushed nickel fixtures and vanity, clean bright
result, gut-free refresh, interior design photography, no people`,
  },
  {
    id: 'v1/projects/winchester-cabinet-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a kitchen in a Winchester Massachusetts colonial home,
original medium-oak full-overlay cabinet doors, solid construction but dated finish, generous layout,
honest before-state photography, no people`,
  },
  {
    id: 'v1/projects/winchester-cabinet-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of the same kitchen in a Winchester Massachusetts colonial
home after cabinet refinishing in charcoal gray factory-smooth matte 2K polyurethane finish, dramatic
premium transformation, editorial interior photography, no people`,
  },
  {
    id: 'v1/projects/malden-painting-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a rental unit in a Malden Massachusetts multi-family
building, walls in worn tenant-used paint showing marks and scuffs, dated condition, honest
before-state turnover documentation photography, no people`,
  },
  {
    id: 'v1/projects/malden-painting-01-after',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a freshly painted rental unit in a Malden Massachusetts
multi-family building, fresh clean white walls ready for new tenant, professional interior painting
result, bright and clean, no people`,
  },

  // ════════════════════════════════════════════════════════════════
  // PROCESS STEP IMAGES (P2)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'v1/process/step-01-video-estimate',
    w: 800, h: 600,
    prompt: `Photorealistic lifestyle photograph of a homeowner holding a smartphone horizontally
showing a video call with a contractor discussing a kitchen renovation estimate, compact condo
kitchen visible in background, natural window light, candid warm lifestyle photography, no faces
fully visible, blurred background, focused on the phone and hands`,
  },
  {
    id: 'v1/process/step-02-prep-containment',
    w: 800, h: 600,
    prompt: `Photorealistic close-up photograph of professional cabinet refinishing preparation work,
blue 3M ScotchBlue painter's tape carefully and neatly applied along cabinet frame edges and
door hinges, clear plastic sheeting protecting countertops and appliances below, methodical
professional contractor workspace in a residential kitchen, craft trade photography, no people
visible, natural light, clean and precise`,
  },
  {
    id: 'v1/process/step-03-hand-sand',
    w: 800, h: 600,
    prompt: `Photorealistic close-up photograph of professional hand-sanding a flat cabinet door
face panel, cork sanding block with fine 220-grit sandpaper, wood grain with previous finish
being carefully abraded, smooth controlled hand pressure, craft trade photography, hands visible
in blue nitrile work gloves, natural workshop lighting, no power tools anywhere in frame`,
  },
  {
    id: 'v1/process/step-04-spray-finish',
    w: 800, h: 600,
    prompt: `Photorealistic photograph of a professional HVLP spray gun applying a smooth white
2K polyurethane factory finish to a cabinet door panel laid flat, fine mist cloud of paint
visible in side-lit scene, professional contained residential spray setup, gloved hands holding
the gun at proper distance, dramatic side lighting showing mirror-smooth finish quality building
on the surface, craft trade commercial photography`,
  },
  {
    id: 'v1/process/step-05-final-walkthrough',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of freshly finished deep forest green kitchen
cabinets in a residential kitchen, perfectly smooth factory matte finish on all cabinet doors
and frames, gleaming professional result, warm natural light, blurred figure in background
suggesting a satisfied homeowner walkthrough, editorial interior photography`,
  },
  {
    id: 'v1/process/process-page-hero',
    w: 1600, h: 600,
    prompt: `Photorealistic wide panoramic cinematic photograph of a professional cabinet refinishing
operation mid-process in a residential kitchen, HVLP spray gun equipment visible to one side,
careful masking tape and clear plastic sheeting protecting all surfaces, methodical and clean
professional contractor workspace, editorial commercial photography, no people's faces visible`,
  },

  // ════════════════════════════════════════════════════════════════
  // ABOUT PAGE (P2)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'v1/about/craft-spray-setup',
    w: 1200, h: 800,
    prompt: `Photorealistic close-up photograph of professional cabinet spray painting equipment
setup, HVLP spray gun with fluid nozzle pointed at a white cabinet door, careful blue painter's
tape masking visible on cabinet frames at edges of frame, professional contractor workspace in
a residential kitchen setting, natural window light supplemented by work light, detailed craft
trade photography, gloved hands visible gripping the spray gun, equipment looks professional-grade
and well-maintained, commercial craft photography quality`,
  },

  // ════════════════════════════════════════════════════════════════
  // STANDALONE PAGE IMAGES (P2)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'v1/pages/vs-replacement-demo-chaos',
    w: 800, h: 600,
    prompt: `Photorealistic photograph of a residential kitchen during full cabinet demolition and
replacement, upper cabinet boxes removed exposing raw drywall and dust, debris on countertops,
construction chaos and disruption visible, exposed electrical boxes, torn drywall paper,
documentary renovation photography showing the high disruption cost of full replacement`,
  },
  {
    id: 'v1/pages/guarantee-finish-closeup',
    w: 800, h: 800,
    prompt: `Photorealistic extreme macro close-up photograph of a freshly refinished kitchen cabinet
door surface in deep forest green color, factory-smooth 2K polyurethane matte finish with
absolutely zero brush marks or texture, even raking light showing perfect smooth surface,
professional cabinet refinishing quality proof photograph, product photography with neutral
background reflection in the finish`,
  },
  {
    id: 'v1/pages/guarantee-touchup-bottle',
    w: 600, h: 600,
    prompt: `Photorealistic product photography of a small cylindrical paint touch-up bottle,
approximately 2 ounces, with a professional printed label in forest green and cream colors,
sitting on a clean light cream or white surface, soft even studio lighting from above left,
isolated product shot, shadow directly below, professional commercial product photography`,
  },
  {
    id: 'v1/pages/financing-approval-concept',
    w: 800, h: 600,
    prompt: `Photorealistic lifestyle photograph of a person's hands holding a modern smartphone
horizontally, the screen showing a loan pre-approval confirmation screen with a green checkmark,
soft bokeh blurred background of a bright kitchen renovation in progress, warm natural window
light, aspirational lifestyle photography, no face visible, focused on hands and phone screen,
warm optimistic feeling`,
  },
];

// ── Main ─────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const filtered = FILTER
    ? ASSETS.filter(a => a.id.includes(FILTER))
    : ASSETS;

  console.log(`\nJerry & Co. Media Generation`);
  console.log(`${'─'.repeat(48)}`);
  console.log(`Mode:    ${DRY_RUN ? 'DRY RUN (generate only, no Cloudinary upload)' : 'FULL (generate + upload)'}`);
  console.log(`Filter:  ${FILTER || 'none (all assets)'}`);
  console.log(`Assets:  ${filtered.length} of ${ASSETS.length} total`);
  console.log(`Output:  ${OUT_DIR}/\n`);

  if (filtered.length === 0) {
    console.log(`No assets match filter "${FILTER}". Check the id field in the manifest.`);
    process.exit(0);
  }

  let success = 0;
  let failed  = 0;
  let skipped = 0;

  for (const [i, asset] of filtered.entries()) {
    console.log(`\n[${i + 1}/${filtered.length}] ${asset.id}`);

    const file = localPath(asset.id);
    const alreadyExists = fs.existsSync(file);

    try {
      await gen(asset);
      if (alreadyExists) skipped++;
      else success++;
    } catch {
      failed++;
    }

    if (i < filtered.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n${'─'.repeat(48)}`);
  console.log(`Done.`);
  console.log(`  Generated: ${success}`);
  console.log(`  Skipped (already existed): ${skipped}`);
  console.log(`  Failed: ${failed}`);
  if (DRY_RUN) {
    console.log(`\n  Images saved to: ${OUT_DIR}/`);
    console.log(`  Review them, then run WITHOUT --dry-run to upload approved ones,`);
    console.log(`  OR run: npx tsx scripts/upload-approved.ts`);
  } else {
    console.log(`\n  Check Cloudinary dashboard: https://cloudinary.com/console`);
  }
}

main().catch(err => {
  console.error('\nFatal error:', err);
  process.exit(1);
});
