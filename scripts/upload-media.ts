/**
 * Jerry & Co. — Cloudinary Upload Script
 * ─────────────────────────────────────────────────────────────────
 * Uploads pre-generated images from assets/img/generated/ to Cloudinary.
 * Run this after generate-media.ts --dry-run has produced the local files.
 *
 * Usage:
 *   npx tsx scripts/upload-media.ts             # upload all
 *   npx tsx scripts/upload-media.ts hero         # filter by keyword
 *   npx tsx scripts/upload-media.ts --dry-run    # list files, skip upload
 *
 * Requires in .env:
 *   PUBLIC_CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 */

import 'dotenv/config';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';

const args    = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FILTER  = args.find(a => !a.startsWith('--')) ?? '';
const OUT_DIR = 'assets/img/generated';

const CLOUD   = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? process.env.CLOUDINARY_CLOUD_NAME;
const CLD_KEY = process.env.CLOUDINARY_API_KEY;
const CLD_SEC = process.env.CLOUDINARY_API_SECRET;

if (!DRY_RUN) {
  if (!CLOUD || !CLD_KEY || !CLD_SEC) {
    console.error('ERROR: Cloudinary credentials missing. Set PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env');
    process.exit(1);
  }
  cloudinary.config({ cloud_name: CLOUD, api_key: CLD_KEY, api_secret: CLD_SEC });
}

// Reverse of generate-media's localPath():
//   v1_hero_hero-slide-01.png → v1/hero/hero-slide-01
// Category names are single words (no hyphens), so replacing the first two
// underscores with slashes is unambiguous.
function fileToPublicId(filename: string): string {
  return filename.replace(/\.png$/, '').replace('_', '/').replace('_', '/');
}

async function uploadFile(filePath: string, publicId: string): Promise<void> {
  // Compress to JPEG — free Cloudinary plan limit is 10MB; raw PNGs exceed this
  const tmp = path.join(os.tmpdir(), `jerryco-${path.basename(filePath, '.png')}.jpg`);
  await sharp(filePath).jpeg({ quality: 85, mozjpeg: true }).toFile(tmp);
  const kb = Math.round(fs.statSync(tmp).size / 1024);
  console.log(`  ↑ ${publicId} (compressed: ${kb}KB)`);

  try {
    const result = await cloudinary.uploader.upload(tmp, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
    });
    console.log(`  ✓ ${result.secure_url}`);
  } finally {
    fs.unlinkSync(tmp);
  }
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`ERROR: Directory not found: ${OUT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(OUT_DIR)
    .filter(f => f.endsWith('.png'))
    .filter(f => !FILTER || f.includes(FILTER))
    .sort();

  if (!files.length) {
    console.log(`No PNG files found in ${OUT_DIR}${FILTER ? ` matching "${FILTER}"` : ''}`);
    process.exit(0);
  }

  console.log(`\nUploading ${files.length} file(s) to Cloudinary${DRY_RUN ? ' [DRY RUN]' : ` (cloud: ${CLOUD})`}\n`);

  let ok = 0;
  let failed = 0;

  for (const filename of files) {
    const filePath = path.join(OUT_DIR, filename);
    const publicId = fileToPublicId(filename);
    const kb = Math.round(fs.statSync(filePath).size / 1024);
    console.log(`\n[${filename}] → ${publicId} (${kb}KB)`);

    if (DRY_RUN) {
      console.log('  ↷ dry-run: skipped');
      ok++;
      continue;
    }

    try {
      await uploadFile(filePath, publicId);
      ok++;
    } catch (err: any) {
      console.error(`  ✗ FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n─────────────────────────────────`);
  console.log(`Done: ${ok} uploaded, ${failed} failed`);
  if (failed) process.exit(1);
}

main();
