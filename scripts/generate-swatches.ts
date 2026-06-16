/**
 * Jerry & Co. — Color Swatch Generation Script
 * ─────────────────────────────────────────────────────────────────
 * Generates 8 cabinet finish color swatch images via Ideogram API.
 * Ideogram has superior color accuracy for specific hex values.
 *
 * Usage:
 *   npx tsx scripts/generate-swatches.ts               # generate + upload all 8
 *   npx tsx scripts/generate-swatches.ts --dry-run     # generate only, no upload
 *   npx tsx scripts/generate-swatches.ts forest        # filter by keyword
 *
 * Free tier: 10 images/day on ideogram.ai
 * Prerequisites: IDEOGRAM_API_KEY, Cloudinary credentials in .env
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// ── CLI flags ────────────────────────────────────────────────────
const args    = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FILTER  = args.find(a => !a.startsWith('--')) ?? '';

// ── Config ───────────────────────────────────────────────────────
const IDEOGRAM_KEY = process.env.IDEOGRAM_API_KEY;
const CLOUD        = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? process.env.CLOUDINARY_CLOUD_NAME;
const CLD_KEY      = process.env.CLOUDINARY_API_KEY;
const CLD_SEC      = process.env.CLOUDINARY_API_SECRET;
const OUT_DIR      = 'assets/img/generated';

if (!IDEOGRAM_KEY) {
  console.error('ERROR: IDEOGRAM_API_KEY not set in .env');
  console.error('Get a free key at: ideogram.ai → Settings → API');
  process.exit(1);
}

if (!DRY_RUN) {
  if (!CLOUD || !CLD_KEY || !CLD_SEC) {
    console.error('ERROR: Cloudinary credentials missing in .env');
    process.exit(1);
  }
  cloudinary.config({ cloud_name: CLOUD, api_key: CLD_KEY, api_secret: CLD_SEC });
}

fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Helpers ──────────────────────────────────────────────────────
function localPath(publicId: string): string {
  return path.join(OUT_DIR, publicId.replace(/\//g, '_') + '.png');
}

async function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

async function generateSwatch(prompt: string, publicId: string): Promise<string> {
  const file = localPath(publicId);

  if (fs.existsSync(file)) {
    console.log(`  ↳ exists locally: ${file}`);
    return file;
  }

  console.log(`  Generating via Ideogram: ${publicId}`);

  const res = await fetch('https://api.ideogram.ai/generate', {
    method: 'POST',
    headers: {
      'Api-Key': IDEOGRAM_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_request: {
        prompt,
        model: 'V_2',
        aspect_ratio: 'ASPECT_1_1',
        magic_prompt_option: 'OFF', // critical — OFF preserves exact color prompt
        style_type: 'REALISTIC',
      },
    }),
  });

  if (res.status === 429) {
    console.log('  Daily limit reached (10/day). Try again tomorrow or upgrade Ideogram plan.');
    process.exit(1);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Ideogram API ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = await res.json() as { data?: Array<{ url?: string }> };
  const imageUrl = data.data?.[0]?.url;

  if (!imageUrl) {
    throw new Error(`No image URL in Ideogram response: ${JSON.stringify(data)}`);
  }

  // Download the generated image
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`Failed to download generated image: ${imgRes.status}`);

  const buf = Buffer.from(await imgRes.arrayBuffer());
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

// ── Swatch manifest ──────────────────────────────────────────────
interface Swatch {
  id: string;
  name: string;
  colorDesc: string;
}

const SWATCHES: Swatch[] = [
  {
    id: 'v1/colors/swatch-deep-forest',
    name: 'Deep Forest',
    colorDesc: 'deep forest green color #1E3934 hex value, dark rich green',
  },
  {
    id: 'v1/colors/swatch-bone-white',
    name: 'Bone White',
    colorDesc: 'warm bone white color #F7F3EA hex value, creamy off-white',
  },
  {
    id: 'v1/colors/swatch-soft-sage',
    name: 'Soft Sage',
    colorDesc: 'soft sage green color, muted earthy medium-light green, similar to #8FAF8A',
  },
  {
    id: 'v1/colors/swatch-charcoal-matte',
    name: 'Charcoal Matte',
    colorDesc: 'dark charcoal gray color #2C2C2C hex value, near-black dark gray',
  },
  {
    id: 'v1/colors/swatch-navy-shaker',
    name: 'Navy Shaker',
    colorDesc: 'deep navy blue color #1B2A4A hex value, dark rich blue',
  },
  {
    id: 'v1/colors/swatch-warm-taupe',
    name: 'Warm Taupe',
    colorDesc: 'warm taupe greige color #9E8E7E hex value, medium warm gray-brown',
  },
  {
    id: 'v1/colors/swatch-matte-black',
    name: 'Matte Black',
    colorDesc: 'flat matte black color #0A0A0A hex value, pure flat black',
  },
  {
    id: 'v1/colors/swatch-champagne',
    name: 'Champagne',
    colorDesc: 'champagne warm gold-white color #E8D9B0 hex value, pale golden beige',
  },
];

function buildPrompt(swatch: Swatch): string {
  return `COLOR ACCURACY CRITICAL: Photorealistic extreme close-up macro photograph of a smooth
painted wooden cabinet door panel surface, the paint color is ${swatch.colorDesc}, factory-smooth
2K polyurethane matte finish, subtle wood grain texture visible beneath the paint layer,
professional cabinet refinishing quality result, even neutral studio lighting with no harsh
reflections or hotspots, texture clearly visible, fills entire frame edge to edge, commercial
paint color sample photography quality, no labels, no text, no hands, no props`;
}

// ── Main ─────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const filtered = FILTER
    ? SWATCHES.filter(s => s.id.includes(FILTER) || s.name.toLowerCase().includes(FILTER))
    : SWATCHES;

  console.log(`\nJerry & Co. Color Swatch Generation`);
  console.log(`${'─'.repeat(48)}`);
  console.log(`Mode:    ${DRY_RUN ? 'DRY RUN (generate only)' : 'FULL (generate + upload)'}`);
  console.log(`Filter:  ${FILTER || 'none (all 8 swatches)'}`);
  console.log(`Assets:  ${filtered.length} of ${SWATCHES.length}`);
  console.log(`Note:    Ideogram free tier = 10 images/day\n`);

  let success = 0;
  let failed  = 0;

  for (const [i, swatch] of filtered.entries()) {
    console.log(`\n[${i + 1}/${filtered.length}] ${swatch.name} — ${swatch.id}`);
    try {
      const file = await generateSwatch(buildPrompt(swatch), swatch.id);
      if (!DRY_RUN) {
        await uploadCld(file, swatch.id);
      } else {
        console.log(`  ↷ dry-run: skipped upload`);
      }
      success++;
    } catch (err) {
      console.error(`  ✗ FAILED: ${(err as Error).message}`);
      failed++;
    }

    // Ideogram rate limit — 1 req/sec on free tier
    if (i < filtered.length - 1) await sleep(1500);
  }

  console.log(`\n${'─'.repeat(48)}`);
  console.log(`Done. Generated: ${success}  Failed: ${failed}`);
}

main().catch(err => {
  console.error('\nFatal error:', err);
  process.exit(1);
});
