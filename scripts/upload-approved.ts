/**
 * Jerry & Co. — Upload Approved Assets Script
 * ─────────────────────────────────────────────────────────────────
 * After reviewing locally-generated images, add approved asset IDs
 * to the APPROVED array below and run this script to push only
 * those images to Cloudinary.
 *
 * Usage:
 *   npx tsx scripts/upload-approved.ts
 *
 * To populate APPROVED: run generate-media.ts --dry-run first,
 * review assets/img/generated/, then list approved IDs here.
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// ── Edit this list after your preview review ─────────────────────
// Add or remove IDs. IDs must match exactly what's in generate-media.ts.
// Leave empty to upload nothing (safe default).
const APPROVED: string[] = [
  // ── Hero slides (P0 — add these first after reviewing) ──
  // 'v1/hero/hero-slide-01-boston-aerial',
  // 'v1/hero/hero-slide-02-kitchen-before',
  // 'v1/hero/hero-slide-03-kitchen-after',
  // 'v1/hero/hero-slide-04-bathroom-after',
  // 'v1/hero/hero-video-poster',

  // ── Gallery pairs (P1 — uncomment after review) ──
  // 'v1/projects/somerville-cabinet-01-before',
  // 'v1/projects/somerville-cabinet-01-after',
  // ... add more as approved
];

// ── Config ───────────────────────────────────────────────────────
const CLOUD   = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? process.env.CLOUDINARY_CLOUD_NAME;
const CLD_KEY = process.env.CLOUDINARY_API_KEY;
const CLD_SEC = process.env.CLOUDINARY_API_SECRET;
const OUT_DIR = 'assets/img/generated';

// Early exit if APPROVED is empty — no credentials needed to report this
const _active = APPROVED.filter(id => id.trim() && !id.trim().startsWith('//'));
if (_active.length === 0) {
  console.log(`\nJerry & Co. — Upload Approved Assets`);
  console.log(`${'─'.repeat(48)}`);
  console.log('APPROVED list is empty. Edit scripts/upload-approved.ts to add IDs.');
  process.exit(0);
}

if (!CLOUD || !CLD_KEY || !CLD_SEC) {
  console.error('ERROR: Cloudinary credentials missing in .env');
  process.exit(1);
}

cloudinary.config({ cloud_name: CLOUD, api_key: CLD_KEY, api_secret: CLD_SEC });

// ── Main ─────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const active = APPROVED.filter(id => id.trim() && !id.trim().startsWith('//'));

  console.log(`\nJerry & Co. — Upload Approved Assets`);
  console.log(`${'─'.repeat(48)}`);
  console.log(`Queued: ${active.length} assets\n`);

  if (active.length === 0) {
    console.log('APPROVED list is empty. Edit scripts/upload-approved.ts to add IDs.');
    process.exit(0);
  }

  let success = 0;
  let missing = 0;
  let failed  = 0;

  for (const [i, id] of active.entries()) {
    const localFile = path.join(OUT_DIR, id.replace(/\//g, '_') + '.png');
    console.log(`[${i + 1}/${active.length}] ${id}`);

    if (!fs.existsSync(localFile)) {
      console.warn(`  ⚠ LOCAL FILE MISSING: ${localFile}`);
      console.warn(`  Run: npx tsx scripts/generate-media.ts ${id.split('/').pop()} --dry-run`);
      missing++;
      continue;
    }

    try {
      const result = await cloudinary.uploader.upload(localFile, {
        public_id: id,
        overwrite: true,
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto',
      });
      console.log(`  ✓ ${result.secure_url}`);
      console.log(`    ${result.width}×${result.height} · ${Math.round(result.bytes / 1024)}KB`);
      success++;
    } catch (err) {
      console.error(`  ✗ FAILED: ${(err as Error).message}`);
      failed++;
    }
  }

  console.log(`\n${'─'.repeat(48)}`);
  console.log(`Uploaded:      ${success}`);
  console.log(`Missing local: ${missing}`);
  console.log(`Failed:        ${failed}`);
  if (success > 0) {
    console.log(`\nCheck dashboard: https://cloudinary.com/console/media_library`);
  }
}

main().catch(err => {
  console.error('\nFatal error:', err);
  process.exit(1);
});
