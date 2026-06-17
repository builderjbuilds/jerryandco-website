/**
 * Jerry & Co. — Media Generation Script v2
 * ─────────────────────────────────────────────────────────────────
 * Generates photorealistic images via Higgsfield CLI (seedream_v4_5)
 * and uploads them to Cloudinary.
 *
 * KEY CHANGES FROM v1:
 *  - Before/after pairs share a locked spatial anchor (same room geometry)
 *  - After prompts pass --reference-image <before-file> to Higgsfield
 *    so the model uses the before state as a spatial conditioning input
 *  - Damage/wear language is specific and localized, not cartoonish
 *  - ASSETS array is ordered: every before always precedes its after
 *
 * Usage:
 *   npx tsx scripts/generate-media.ts                  # generate + upload all
 *   npx tsx scripts/generate-media.ts --dry-run        # generate only, no upload
 *   npx tsx scripts/generate-media.ts hero             # filter by keyword + upload
 *   npx tsx scripts/generate-media.ts hero --dry-run   # filter by keyword, no upload
 *
 * Prerequisites:
 *   npm install -g @higgsfield/cli && higgsfield auth login
 *   pnpm add -D tsx dotenv cloudinary
 *   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { v2 as cloudinary } from 'cloudinary';

// ── CLI flags ────────────────────────────────────────────────────
const args     = process.argv.slice(2);
const DRY_RUN  = args.includes('--dry-run');
const FILTER   = args.find(a => !a.startsWith('--')) ?? '';

// ── Config ───────────────────────────────────────────────────────
const CLOUD    = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? process.env.CLOUDINARY_CLOUD_NAME;
const CLD_KEY  = process.env.CLOUDINARY_API_KEY;
const CLD_SEC  = process.env.CLOUDINARY_API_SECRET;
const OUT_DIR  = 'assets/img/generated';
const DELAY_MS = 1500;

if (!DRY_RUN) {
  if (!CLOUD || !CLD_KEY || !CLD_SEC) {
    console.error('ERROR: Cloudinary credentials missing in .env');
    process.exit(1);
  }
  cloudinary.config({ cloud_name: CLOUD, api_key: CLD_KEY, api_secret: CLD_SEC });
}

fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Aspect ratio helper ──────────────────────────────────────────
function aspectRatio(w: number, h: number): string {
  const r = w / h;
  const candidates: [number, string][] = [
    [21 / 9, '21:9'], [16 / 9, '16:9'], [3 / 2, '3:2'],
    [4 / 3,  '4:3' ], [1,      '1:1' ], [3 / 4, '3:4'],
    [2 / 3,  '2:3' ], [9 / 16, '9:16'],
  ];
  return candidates.reduce((best, c) =>
    Math.abs(r - c[0]) < Math.abs(r - best[0]) ? c : best
  )[1];
}

// ── Asset type ───────────────────────────────────────────────────
interface Asset {
  id: string;
  prompt: string;
  w: number;
  h: number;
  referenceId?: string; // publicId of a previously generated before image
}

// ── Helpers ──────────────────────────────────────────────────────
function localPath(publicId: string): string {
  return path.join(OUT_DIR, publicId.replace(/\//g, '_') + '.png');
}

async function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

async function generateImage(
  prompt: string,
  publicId: string,
  width = 1024,
  height = 768,
  referenceId?: string,
): Promise<string> {
  const file = localPath(publicId);

  if (fs.existsSync(file)) {
    const kb = Math.round(fs.statSync(file).size / 1024);
    console.log(`  ↳ exists locally (${kb}KB): ${file}`);
    return file;
  }

  const ratio = aspectRatio(width, height);
  const refFile = referenceId ? localPath(referenceId) : null;
  const hasRef  = refFile && fs.existsSync(refFile);

  console.log(`  Generating: ${publicId} [${ratio}]${hasRef ? ' [ref: ' + referenceId + ']' : ''}`);

  // Build CLI args — add --reference-image only when before file exists locally
  const cliArgs = [
    'generate', 'create', 'seedream_v4_5',
    '--prompt', prompt,
    '--aspect_ratio', ratio,
    '--quality', 'high',
    '--wait',
  ];

  if (hasRef) {
    cliArgs.push('--reference-image', refFile!);
    console.log(`  ↳ reference image: ${refFile}`);
  } else if (referenceId) {
    console.warn(`  ⚠ Reference file not found for ${referenceId} — generating without spatial anchor`);
  }

  const result = spawnSync('higgsfield', cliArgs, {
    encoding: 'utf-8',
    timeout: 300_000,
  });

  if (result.status !== 0) {
    throw new Error(`higgsfield CLI failed: ${(result.stderr ?? '').trim() || result.error?.message}`);
  }

  const url = result.stdout.trim();
  if (!url.startsWith('http')) {
    throw new Error(`Unexpected CLI output (expected URL): ${url.slice(0, 120)}`);
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image download failed: ${res.status} ${url}`);

  const buf = Buffer.from(await res.arrayBuffer());
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
  const file = await generateImage(
    asset.prompt,
    asset.id,
    asset.w,
    asset.h,
    asset.referenceId,
  );
  if (!DRY_RUN) {
    await uploadCld(file, asset.id);
  } else {
    console.log(`  ↷ dry-run: skipped upload`);
  }
}

// ════════════════════════════════════════════════════════════════
// PROMPT ARCHITECTURE NOTES
//
// Every before/after pair shares a ROOM ANCHOR block — identical
// text that locks: camera angle, room layout, window position,
// cabinet run count, floor material, ceiling character.
//
// The after prompt copies the anchor verbatim and adds only the
// surface transformation (finish color, new tile, new fixtures).
//
// After assets carry referenceId pointing to their before pair.
// The generateImage function passes the saved before PNG as
// --reference-image to Higgsfield for spatial conditioning.
//
// Wear/damage language is localized and specific:
//   ✓ "grout darkened near the floor in the lower two tile courses"
//   ✗ "worn and damaged bathroom"
// ════════════════════════════════════════════════════════════════

const ASSETS: Asset[] = [

  // ════════════════════════════════════════════════════════════════
  // HERO SLIDES — P0
  // ════════════════════════════════════════════════════════════════
  {
    id: 'v1/hero/hero-slide-01-boston-aerial',
    w: 1600, h: 900,
    prompt: `Wide-angle street-level photograph of a dense Boston inner-suburb residential 
neighborhood, classic triple-decker wood-frame houses and 3-story brick condo buildings lining 
a tree-lined street in Somerville Massachusetts, late afternoon golden hour light, warm amber 
tones raking across bay windows and aged brick facades, deep green mature maple trees in full 
leaf, quiet well-kept residential sidewalk, slight cinematic depth of field with near 
foreground softly out of focus, architectural photography on 24mm lens, no people prominently 
visible, no cars in immediate foreground, premium real estate neighborhood photography`,
  },
  {
    id: 'v1/hero/hero-slide-02-kitchen-before',
    w: 1600, h: 900,
    prompt: `Photorealistic interior photograph of a compact L-shaped condo kitchen in Boston 
Massachusetts shot from the doorway corner at standing eye-level, two runs of original 1990s 
raised-panel honey oak cabinet doors — upper row along back wall, lower base cabinets 
continuous — white ceramic 4x4 tile backsplash, small single window centered above the sink 
on the back wall letting in natural light, grey vinyl tile floor, no appliances on counters, 
no people. The oak finish shows age: slightly yellowed near the ceiling from years of cooking 
steam, one lower cabinet door has a small scuff at kick height from foot contact, the grout 
on the tile backsplash has darkened slightly in the corners. Honest before-state documentary 
interior photography, not staged, no filters`,
  },
  {
    id: 'v1/hero/hero-slide-03-kitchen-after',
    w: 1600, h: 900,
    referenceId: 'v1/hero/hero-slide-02-kitchen-before',
    prompt: `Photorealistic interior photograph of the exact same compact L-shaped condo kitchen 
in Boston Massachusetts, same doorway corner camera position at standing eye-level, same two 
runs of cabinet doors in the same positions, same small single window centered above the sink 
on the back wall, same grey vinyl tile floor. The only changes: all cabinet doors and drawer 
fronts have been refinished in deep forest green (#1E3934) factory-smooth matte 2K polyurethane 
finish — zero brush marks, perfectly even coverage. Matte black cup-pull hardware on all doors. 
White quartz countertops replacing the old tile counters. The backsplash tile is the same but 
freshly grouted bright white. Crisp natural light through the window. Interior design editorial 
photography, no people`,
  },
  {
    id: 'v1/hero/hero-slide-04-bathroom-after',
    w: 1600, h: 900,
    prompt: `Photorealistic interior photograph of a compact rectangular full bathroom in a Boston 
Massachusetts condominium, camera positioned in the doorway at standing eye-level looking 
straight in, showing the full width of the room: walk-in shower with ceiling-height white 3x6 
subway tile in running bond on left wall, white rectangular undermount vanity with brushed 
nickel single-handle faucet centered on the back wall, toilet tucked right, frameless rectangle 
mirror above vanity, 3-globe vanity light bar, 12x24 light grey porcelain floor tile laid 
vertically. Warm soft light from the vanity bar. Gut-free renovation quality. No people`,
  },
  {
    id: 'v1/hero/hero-video-poster',
    w: 1600, h: 900,
    referenceId: 'v1/hero/hero-slide-03-kitchen-after',
    prompt: `Same compact L-shaped condo kitchen after cabinet refinishing in deep forest green 
factory-smooth matte finish, identical camera position and room geometry as before, crisp 
natural window light, white quartz countertops, matte black hardware, no people, editorial 
interior photography`,
  },

  // ════════════════════════════════════════════════════════════════
  // GALLERY PAIRS — P1
  // ROOM ANCHOR strategy: before establishes the spatial truth,
  // after references it and changes only finishes/surfaces.
  // ════════════════════════════════════════════════════════════════

  // ── Somerville cabinet ───────────────────────────────────────────
  {
    id: 'v1/projects/somerville-cabinet-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a narrow galley kitchen in a Somerville 
Massachusetts triple-decker apartment unit, camera at the entry end of the galley looking 
straight down the length of the room, two parallel counter runs with a 36-inch walkway 
between them, one window at the far end centered above the sink, upper and lower oak 
raised-panel cabinet doors continuous on both sides, white 4x4 ceramic tile backsplash, 
linoleum floor in a beige grid pattern. The oak shows natural aging: finish slightly 
dull from cleaning, minor yellowing near the vent hood area, one cabinet hinge slightly 
misaligned on a door mid-run. No people, no staged items on counters. Honest pre-renovation 
documentary photography shot on a wide-angle lens`,
  },
  {
    id: 'v1/projects/somerville-cabinet-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/somerville-cabinet-01-before',
    prompt: `Photorealistic interior photograph of the exact same narrow galley kitchen in a 
Somerville Massachusetts triple-decker, identical camera position at the entry end looking 
down the galley, same two parallel counter runs with the same walkway width, same window 
at the far end above the sink, same linoleum floor. The only changes: all cabinet doors 
and frames refinished in deep forest green factory-smooth matte 2K polyurethane, matte 
black cup-pull hardware, white quartz countertops replacing the originals, backsplash 
tile freshly re-grouted bright white. Crisp natural light. No people`,
  },

  // ── Cambridge bathroom ───────────────────────────────────────────
  {
    id: 'v1/projects/cambridge-bathroom-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a small rectangular bathroom in a Cambridge 
Massachusetts condominium, camera in the doorway at standing eye-level looking straight in, 
showing: cast-iron clawfoot tub along the left wall, pedestal sink centered on the back wall, 
toilet on the right, single frosted window above the tub, large-format beige 6x6 ceramic wall 
tile floor to ceiling on all walls, hexagonal white mosaic floor tile. Natural aging: grout 
lines between wall tiles darkened from moisture in the lower two courses near the floor, 
chrome fixtures on the pedestal sink showing light surface oxidation near the base, caulk 
line around the tub base slightly yellowed. Single incandescent globe light above the sink 
mirror. No people, honest pre-renovation documentation photography`,
  },
  {
    id: 'v1/projects/cambridge-bathroom-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/cambridge-bathroom-01-before',
    prompt: `Photorealistic interior photograph of the same small rectangular Cambridge 
Massachusetts bathroom, identical camera position in the doorway, same room proportions, 
same window position above where the tub was. Gut-free refresh: original clawfoot tub 
refinished in bright white, pedestal sink replaced with a floating white rectangular vanity 
with undermount sink and brushed nickel single-handle faucet, same toilet position, white 
3x6 subway tile in running bond over the existing wall tile, white re-grouted hexagonal 
floor tile cleaned and sealed, frameless square mirror with brushed nickel 3-globe vanity 
bar. Bright warm vanity light. No people`,
  },

  // ── Arlington interior painting ──────────────────────────────────
  {
    id: 'v1/projects/arlington-painting-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a living room in a 1970s Arlington 
Massachusetts colonial single-family home, camera in the far corner at standing eye-level 
showing the full room: two double-hung windows on the front wall with natural light, 
original painted wood baseboard trim and door casing, hardwood floor with area rug, 
plaster walls painted in an aged cream-ivory color. Specific wear: paint slightly yellowed 
near the ceiling line from decades of age, one 12-inch section of paint at the corner 
near the window has a hairline crack in the plaster beneath it, baseboard trim shows minor 
scuff marks at floor level near the sofa position. Furniture present: basic sofa and side 
table. No people, honest pre-painting documentation photography`,
  },
  {
    id: 'v1/projects/arlington-painting-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/arlington-painting-01-before',
    prompt: `Photorealistic interior photograph of the same living room in the Arlington 
Massachusetts colonial, identical camera position in the far corner, same two windows in 
same positions, same hardwood floor and area rug, same furniture arrangement, same door 
and baseboard trim positions. The only change: walls and ceiling freshly painted in bright 
clean white, trim and baseboards repainted in crisp semi-gloss white, plaster crack 
repaired and invisible, warm natural light through the windows. Professional interior 
painting result. No people`,
  },

  // ── Medford cabinet ──────────────────────────────────────────────
  {
    id: 'v1/projects/medford-cabinet-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a compact U-shaped kitchen in a Medford 
Massachusetts condominium conversion unit, camera at the entry threshold looking straight 
in, three walls of original 1990s medium-oak flat-panel cabinet doors — upper and lower 
continuous runs on back wall and both side walls, small window above the sink on the back 
wall, black laminate countertops, white subway tile backsplash, vinyl tile floor. Oak finish 
shows: dull surface sheen from years of cleaning product buildup, minor water staining on 
the cabinet face below the sink from an old minor leak now repaired, handles worn to bare 
metal at the grip points. No people, pre-renovation documentation`,
  },
  {
    id: 'v1/projects/medford-cabinet-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/medford-cabinet-01-before',
    prompt: `Photorealistic interior photograph of the exact same U-shaped kitchen in the 
Medford Massachusetts condominium, identical camera position and room geometry, same window 
above the sink, same vinyl tile floor. All cabinet doors and frames refinished in warm bone 
white factory-smooth matte 2K polyurethane finish, brushed nickel bar-pull hardware, white 
quartz countertops, backsplash tile freshly grouted. Clean bright result. No people`,
  },

  // ── Malden cabinet ───────────────────────────────────────────────
  {
    id: 'v1/projects/malden-cabinet-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a simple rectangular rental kitchen in a 
Malden Massachusetts multi-family building unit, camera at the doorway looking straight in, 
one wall of builder-grade flat-panel brown oak cabinet doors upper and lower, laminate 
counter in almond color, stainless single-bowl sink beneath a single window, vinyl sheet 
floor in a grey pattern, basic white GE range in the corner. Honest wear: cabinet face 
near the range shows slight smoke discoloration, one drawer front slightly askew from a 
loose screw, floor vinyl has a small worn patch in front of the sink from foot traffic. 
No people, landlord turnover documentation`,
  },
  {
    id: 'v1/projects/malden-cabinet-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/malden-cabinet-01-before',
    prompt: `Photorealistic interior photograph of the same rectangular rental kitchen in 
Malden Massachusetts, identical camera position, same room layout, same window and sink 
position, same range in the corner, same vinyl sheet floor. All cabinet doors refinished 
in clean bright white factory-smooth matte finish, new brushed nickel knob hardware, 
countertop cleaned and re-sealed. Fresh rental-ready result. No people`,
  },

  // ── Everett bathroom ─────────────────────────────────────────────
  {
    id: 'v1/projects/everett-bathroom-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a small rectangular bathroom in an Everett 
Massachusetts condominium, camera in the doorway looking straight in, tub-shower combo 
along the right wall with a sliding glass door, vanity with cultured marble top on the 
left wall, toilet between them on the back wall, small frosted window above the toilet. 
4x4 beige ceramic wall tile from floor to ceiling, matching beige floor tile. Wear: 
caulk around the tub edge has minor yellowing and one 3-inch section has pulled slightly 
from the wall, mirror above vanity has a small moisture spot in the upper corner, chrome 
faucet handle has surface tarnish. Fluorescent tube light above mirror. No people`,
  },
  {
    id: 'v1/projects/everett-bathroom-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/everett-bathroom-01-before',
    prompt: `Photorealistic interior photograph of the same small rectangular bathroom in 
Everett Massachusetts, identical camera position, same tub-shower position on the right, 
same vanity position on the left, same toilet on the back wall, same window above toilet. 
Gut-free refresh: tub refinished white and re-caulked, new sliding frameless glass door, 
12x24 white porcelain tile installed over existing beige tile on all walls, vanity 
resurfaced with new white top and undermount sink, brushed nickel faucet, new rectangular 
mirror with LED vanity bar. No people`,
  },

  // ── Woburn interior painting ─────────────────────────────────────
  {
    id: 'v1/projects/woburn-painting-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a combined living and dining room in a 
1960s Woburn Massachusetts colonial home, camera in the dining area corner showing both 
spaces, living room with picture window on the far wall, dining area with a two-light 
chandelier above the table position, hardwood floors throughout, plaster walls in an 
aged ivory-white, wood door casings and baseboard trim. Wear: paint on the wall adjacent 
to the exterior window has slight moisture-related bubbling in one lower 8-inch section 
from an old window seal issue now resolved, ceiling paint slightly yellowed above the 
chandelier location, baseboard trim shows minor paint buildup from previous coats. 
No people, pre-painting documentation`,
  },
  {
    id: 'v1/projects/woburn-painting-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/woburn-painting-01-before',
    prompt: `Photorealistic interior photograph of the same combined living and dining room 
in the Woburn Massachusetts colonial, identical camera position in the dining corner, same 
picture window, same chandelier position, same hardwood floors, same furniture arrangement. 
Walls and ceiling freshly painted in warm bright white, trim and baseboard in clean 
semi-gloss white, moisture patch repaired and invisible, warm natural light through picture 
window. No people`,
  },

  // ── Winchester kitchen ───────────────────────────────────────────
  {
    id: 'v1/projects/winchester-kitchen-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a generously sized kitchen in a Winchester 
Massachusetts colonial single-family home, camera in the entry corner at eye level showing 
the full kitchen: three-wall layout with an island, original 1990s full-overlay honey oak 
cabinet doors on all walls and island, granite tile countertops, stainless appliances, 
hardwood floor, two windows — one above the sink on the back wall, one on the right side 
wall. The oak finish shows its age: dull surface from years of use, slight variation in 
color uniformity near the dishwasher from steam exposure, visible wear marks on the 
cabinet doors near the most-used drawers. No people`,
  },
  {
    id: 'v1/projects/winchester-kitchen-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/winchester-kitchen-01-before',
    prompt: `Photorealistic interior photograph of the exact same generously sized kitchen in 
Winchester Massachusetts, identical camera position in the entry corner, same three-wall 
layout with island, same two windows in the same positions, same stainless appliances, same 
hardwood floor. All cabinet doors and frames — walls and island — refinished in deep navy 
blue factory-smooth matte 2K polyurethane finish, brass cup-pull hardware, white quartz 
countertops replacing granite tile. Warm natural light through both windows. No people`,
  },

  // ── Cambridge cabinet (extra) ────────────────────────────────────
  {
    id: 'v1/projects/cambridge-cabinet-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a compact galley kitchen in a Cambridge 
Massachusetts condominium near Inman Square, camera at the entry end looking down the 
galley, single run of upper and lower flat-panel medium-oak cabinet doors along one wall, 
open shelving on the opposite wall, single window at the far end, butcher block countertop, 
white subway tile backsplash, hardwood floor. Oak finish shows: cleaning product residue 
buildup on the surface giving a slightly tacky look, one lower cabinet has a small dent in 
the face panel from an impact. No people`,
  },
  {
    id: 'v1/projects/cambridge-cabinet-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/cambridge-cabinet-01-before',
    prompt: `Photorealistic interior photograph of the exact same compact galley kitchen in 
Cambridge Massachusetts, identical camera position at the entry end looking down the galley, 
same single run of cabinet doors along one wall, same open shelving opposite, same window 
at the far end, same hardwood floor. All cabinet doors refinished in deep navy blue 
factory-smooth matte 2K polyurethane finish, matte black knob hardware, new white quartz 
counter replacing butcher block. Crisp natural light. No people`,
  },

  // ── Somerville bathroom (extra) ──────────────────────────────────
  {
    id: 'v1/projects/somerville-bathroom-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a small rectangular full bathroom in a 
Somerville Massachusetts triple-decker unit, camera in the doorway looking straight in, 
tub-shower along the left wall with a shower curtain rod, wall-mount pedestal sink on the 
right, toilet on the back wall between them, single window above the toilet. Original 
4x4 pink ceramic wall tile from waist height to ceiling, white painted drywall below, 
black and white hexagonal floor tile. Honest wear: grout between pink tiles shows greying 
in the shower area from moisture, caulk at the tub rim has minor yellowing and a small 
separation at one corner, chrome towel bar has light rust spotting at the wall anchors. 
No people`,
  },
  {
    id: 'v1/projects/somerville-bathroom-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/somerville-bathroom-01-before',
    prompt: `Photorealistic interior photograph of the same small rectangular bathroom in 
the Somerville Massachusetts triple-decker, identical camera position in the doorway, same 
tub position on the left, same sink position on the right, same toilet on the back wall, 
same window above the toilet. Gut-free refresh: tub refinished and re-caulked, white 3x6 
subway tile in running bond installed over the existing pink tile from floor to ceiling in 
the shower area, fresh white paint on lower drywall sections, new floating white vanity 
replacing pedestal sink, brushed nickel fixtures and accessories, hexagonal floor tile 
cleaned and re-grouted white. No people`,
  },

  // ── Winchester cabinet (extra) ───────────────────────────────────
  {
    id: 'v1/projects/winchester-cabinet-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a large L-shaped kitchen in a Winchester 
Massachusetts colonial, camera in the corner at eye level showing the full L, original 
medium-oak full-overlay cabinet doors on both runs plus a peninsula, white tile countertops 
with oak-trim edge, stainless steel double oven built in, hardwood floor, window above the 
peninsula sink. Oak wear: countertop trim has minor staining at the grout lines, cabinet 
doors near the oven show slight heat-related finish darkening on two adjacent doors. 
No people`,
  },
  {
    id: 'v1/projects/winchester-cabinet-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/winchester-cabinet-01-before',
    prompt: `Photorealistic interior photograph of the same L-shaped kitchen in Winchester 
Massachusetts, identical camera position in the corner, same L layout with peninsula, same 
built-in oven position, same window above the sink, same hardwood floor. All cabinet doors 
and frames refinished in charcoal grey factory-smooth matte 2K polyurethane finish, 
brushed nickel bar-pull hardware, white quartz countertops replacing tile. No people`,
  },

  // ── Malden painting (extra) ──────────────────────────────────────
  {
    id: 'v1/projects/malden-painting-01-before',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a bedroom in a Malden Massachusetts 
multi-family building rental unit, camera in the far corner showing the full room: two 
double-hung windows on the front wall, closet door on the left wall, bedroom door on the 
right, hardwood floor with no rug, standard 8-foot ceilings. Walls painted in a pale 
yellow from the previous tenant, end-of-tenancy wear visible: scuff marks on the wall 
beside the door from furniture contact, one 4-inch nail hole patch that was poorly touched 
up and shows as a slightly raised white spot, baseboard trim has minor paint drips from 
a previous amateur paint job. No people, landlord turnover documentation`,
  },
  {
    id: 'v1/projects/malden-painting-01-after',
    w: 800, h: 600,
    referenceId: 'v1/projects/malden-painting-01-before',
    prompt: `Photorealistic interior photograph of the same bedroom in the Malden Massachusetts 
rental unit, identical camera position in the far corner, same two windows, same closet and 
door positions, same hardwood floor. Walls and ceiling freshly painted in clean bright white, 
all scuffs and nail holes repaired and invisible, baseboard trim repainted crisp semi-gloss 
white, warm natural light through the windows. Rental-ready professional result. No people`,
  },

  // ════════════════════════════════════════════════════════════════
  // PROCESS STEP IMAGES — P2
  // ════════════════════════════════════════════════════════════════
  {
    id: 'v1/process/step-01-video-estimate',
    w: 800, h: 600,
    prompt: `Photorealistic lifestyle photograph focused on a pair of hands holding a 
smartphone horizontally showing a FaceTime or video call UI with a kitchen visible on 
the phone screen, the real kitchen background behind the phone is blurred, warm natural 
window light from the left, no faces visible, candid and natural composition`,
  },
  {
    id: 'v1/process/step-02-prep-containment',
    w: 800, h: 600,
    prompt: `Photorealistic close-up photograph of 3M ScotchBlue painter's tape being 
carefully applied along the edge of a wood cabinet frame, fingers pressing the tape edge 
down precisely, clear poly sheeting draped over the countertop below visible in lower 
frame, natural window light from the left, hands wearing blue nitrile gloves, no faces, 
craft trade documentation photography`,
  },
  {
    id: 'v1/process/step-03-hand-sand',
    w: 800, h: 600,
    prompt: `Photorealistic close-up photograph of a cork sanding block with 220-grit 
sandpaper being pressed flat against a cabinet door face panel, the sanding motion creating 
a fine wood-dust haze visible in the side light, gloved hands visible, no power tools in 
frame, raking natural light from a window at 45 degrees showing the surface texture, craft 
trade documentation photography`,
  },
  {
    id: 'v1/process/step-04-spray-finish',
    w: 800, h: 600,
    prompt: `Photorealistic photograph of a professional HVLP spray gun applying a smooth 
white finish to a flat cabinet door laid on sawhorses, fine atomized paint mist visible 
in the side lighting, gloved hand visible holding the gun at the correct distance, the 
surface showing the smooth finish building up, dramatic side raking light from a single 
work light, contained professional setup, craft trade photography`,
  },
  {
    id: 'v1/process/step-05-final-walkthrough',
    w: 800, h: 600,
    prompt: `Photorealistic interior photograph of a kitchen with freshly refinished deep 
forest green cabinet doors, the doors reflecting a subtle light showing the perfectly 
smooth factory matte surface, warm natural light, a blurred human figure visible in the 
far background suggesting the homeowner present, no faces in focus, editorial interior 
photography`,
  },
  {
    id: 'v1/process/process-page-hero',
    w: 1600, h: 600,
    prompt: `Photorealistic wide panoramic photograph of a residential kitchen mid-refinishing 
operation, upper cabinet doors removed and leaning masked against the wall to the right, 
blue painter's tape applied precisely to all cabinet frames, clear poly sheeting protecting 
countertops, HVLP spray equipment visible on the left edge of frame, professional methodical 
workspace, warm window light, no faces visible`,
  },

  // ════════════════════════════════════════════════════════════════
  // ABOUT PAGE — P2
  // ════════════════════════════════════════════════════════════════
  {
    id: 'v1/about/craft-spray-setup',
    w: 1200, h: 800,
    prompt: `Photorealistic close-up photograph of a professional HVLP spray gun, the gun 
held in a gloved hand with the nozzle pointed at a white primed cabinet door visible at 
the edge of frame, blue painter's tape masking clearly visible on the cabinet frame behind 
the door, professional contractor setting, natural window light supplemented by a work 
light from the right, sharp detail on the gun mechanism, commercial craft photography`,
  },

  // ════════════════════════════════════════════════════════════════
  // STANDALONE PAGES — P2
  // ════════════════════════════════════════════════════════════════
  {
    id: 'v1/pages/vs-replacement-demo-chaos',
    w: 800, h: 600,
    prompt: `Photorealistic photograph of a residential kitchen mid-cabinet-replacement 
demolition, the upper wall cabinet boxes have been removed leaving exposed raw drywall 
with visible screw holes and torn paper facing, lower base cabinets still in place with 
countertops removed, a thin layer of drywall dust on the remaining counters, one electrical 
box exposed in the upper wall, natural light from the window without window treatment, 
realistic documentary renovation photography — not exaggerated, just the honest mid-demo 
state, no people`,
  },
  {
    id: 'v1/pages/guarantee-finish-closeup',
    w: 800, h: 800,
    prompt: `Photorealistic extreme macro close-up of a cabinet door surface refinished in 
deep forest green (#1E3934) factory-smooth matte finish, raking side light showing 
absolutely flat even surface with zero brush marks or orange peel texture, the wood 
grain subtly visible beneath the paint, commercial product photography on a neutral 
background`,
  },
  {
    id: 'v1/pages/guarantee-touchup-bottle',
    w: 600, h: 600,
    prompt: `Photorealistic product photograph of a small 2-ounce cylindrical glass touch-up 
paint bottle with a professional label in forest green and cream, placed on a clean cream 
linen surface, soft even diffused studio light from above left, isolated product shot with 
a soft natural shadow directly below, commercial product photography`,
  },
  {
    id: 'v1/pages/financing-approval-concept',
    w: 800, h: 600,
    prompt: `Photorealistic lifestyle photograph focused on two hands holding a smartphone 
showing a financing pre-approval confirmation screen with a green check indicator, 
background is a softly blurred bright kitchen interior with white cabinets, warm natural 
window light, no faces visible, aspirational lifestyle photography`,
  },

  // ════════════════════════════════════════════════════════════════
  // COLOR SWATCHES — P1 (note: consider Ideogram for these instead)
  // ════════════════════════════════════════════════════════════════
  {
    id: 'v1/colors/swatch-deep-forest',
    w: 600, h: 600,
    prompt: `Extreme macro close-up of a painted wood cabinet door panel surface, deep forest 
green color (#1E3934), factory-smooth matte 2K polyurethane finish, subtle wood grain 
visible beneath the paint, even diffused studio lighting, fills entire frame, no text, 
no labels, commercial paint color sample photography`,
  },
  {
    id: 'v1/colors/swatch-bone-white',
    w: 600, h: 600,
    prompt: `Extreme macro close-up of a painted wood cabinet door panel surface, warm bone 
white color (#F7F3EA), factory-smooth matte finish, subtle wood grain visible beneath, 
even diffused studio lighting, fills entire frame, no text, no labels`,
  },
  {
    id: 'v1/colors/swatch-soft-sage',
    w: 600, h: 600,
    prompt: `Extreme macro close-up of a painted wood cabinet door panel surface, soft sage 
green muted earthy color, factory-smooth matte finish, subtle wood grain beneath, even 
diffused studio lighting, fills entire frame, no text, no labels`,
  },
  {
    id: 'v1/colors/swatch-charcoal-matte',
    w: 600, h: 600,
    prompt: `Extreme macro close-up of a painted wood cabinet door panel surface, dark 
charcoal grey (#2C2C2C) factory-smooth matte finish, subtle wood grain beneath, even 
diffused studio lighting, fills entire frame, no text, no labels`,
  },
  {
    id: 'v1/colors/swatch-navy-shaker',
    w: 600, h: 600,
    prompt: `Extreme macro close-up of a painted wood cabinet door panel surface, deep 
navy blue (#1B2A4A) factory-smooth matte finish, subtle wood grain beneath, even 
diffused studio lighting, fills entire frame, no text, no labels`,
  },
  {
    id: 'v1/colors/swatch-warm-taupe',
    w: 600, h: 600,
    prompt: `Extreme macro close-up of a painted wood cabinet door panel surface, warm 
taupe greige color (#9E8E7E) factory-smooth matte finish, subtle wood grain beneath, 
even diffused studio lighting, fills entire frame, no text, no labels`,
  },
  {
    id: 'v1/colors/swatch-matte-black',
    w: 600, h: 600,
    prompt: `Extreme macro close-up of a painted wood cabinet door panel surface, flat 
matte black finish, zero sheen, subtle wood grain visible beneath, even diffused studio 
lighting, fills entire frame, no text, no labels`,
  },
  {
    id: 'v1/colors/swatch-champagne',
    w: 600, h: 600,
    prompt: `Extreme macro close-up of a painted wood cabinet door panel surface, champagne 
warm gold-white color (#E8D9B0) factory-smooth matte finish, subtle wood grain beneath, 
even diffused studio lighting, fills entire frame, no text, no labels`,
  },
];

// ── Main ─────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const filtered = FILTER
    ? ASSETS.filter(a => a.id.includes(FILTER))
    : ASSETS;

  console.log(`\nJerry & Co. Media Generation v2`);
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

    const file           = localPath(asset.id);
    const alreadyExists  = fs.existsSync(file);

    try {
      await gen(asset);
      if (alreadyExists) skipped++;
      else success++;
    } catch (err) {
      console.error(`  ✗ FAILED: ${(err as Error).message}`);
      failed++;
    }

    if (i < filtered.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n${'─'.repeat(48)}`);
  console.log(`Done.`);
  console.log(`  Generated:  ${success}`);
  console.log(`  Skipped:    ${skipped} (already existed locally)`);
  console.log(`  Failed:     ${failed}`);
  if (DRY_RUN) {
    console.log(`\n  Images saved to: ${OUT_DIR}/`);
    console.log(`  Preview: npx tsx scripts/preview-server.ts`);
    console.log(`  Upload approved: npx tsx scripts/upload-approved.ts`);
  } else {
    console.log(`\n  Check dashboard: https://cloudinary.com/console`);
  }
}

main().catch(err => {
  console.error('\nFatal error:', err);
  process.exit(1);
});