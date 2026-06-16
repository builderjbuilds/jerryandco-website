/**
 * Jerry & Co. — Upload Real Photo Script
 * ─────────────────────────────────────────────────────────────────
 * Replaces an AI-generated placeholder with a real project photo.
 *
 * Usage:
 *   npx tsx scripts/upload-real-photo.ts <local-file> <cloudinary-id>
 *
 * Examples:
 *   npx tsx scripts/upload-real-photo.ts \
 *     ./real-photos/somerville-kitchen-after.jpg \
 *     v1/projects/somerville-cabinet-01-after
 *
 *   npx tsx scripts/upload-real-photo.ts \
 *     ./real-photos/jeremiah-portrait.jpg \
 *     v1/about/jeremiah-portrait-primary
 *
 * Minimum photo resolution: 2000px on the longest edge.
 * Cloudinary auto-handles WebP/AVIF conversion and responsive srcset.
 */

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// ── Args (checked first so usage prints without needing credentials) ─
const [,, localFile, publicId] = process.argv;

if (!localFile || !publicId) {
  console.error('Usage: npx tsx scripts/upload-real-photo.ts <local-file> <cloudinary-public-id>');
  console.error('');
  console.error('Examples:');
  console.error('  npx tsx scripts/upload-real-photo.ts ./real-photos/somerville-after.jpg v1/projects/somerville-cabinet-01-after');
  console.error('  npx tsx scripts/upload-real-photo.ts ./real-photos/jeremiah.jpg v1/about/jeremiah-portrait-primary');
  process.exit(1);
}

// ── Config ───────────────────────────────────────────────────────
const CLOUD   = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? process.env.CLOUDINARY_CLOUD_NAME;
const CLD_KEY = process.env.CLOUDINARY_API_KEY;
const CLD_SEC = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD || !CLD_KEY || !CLD_SEC) {
  console.error('ERROR: Cloudinary credentials missing in .env');
  process.exit(1);
}

cloudinary.config({ cloud_name: CLOUD, api_key: CLD_KEY, api_secret: CLD_SEC });

const absPath = path.resolve(localFile);

if (!fs.existsSync(absPath)) {
  console.error(`ERROR: File not found: ${absPath}`);
  process.exit(1);
}

// ── Warn if file looks too small (likely wrong file or wrong export) ──
const stat    = fs.statSync(absPath);
const sizeMB  = stat.size / (1024 * 1024);
if (sizeMB < 0.1) {
  console.warn(`⚠ File is very small (${sizeMB.toFixed(2)}MB). Check that you exported at full resolution.`);
}

// ── Upload ───────────────────────────────────────────────────────
async function main(): Promise<void> {
  console.log(`\nJerry & Co. — Upload Real Photo`);
  console.log(`${'─'.repeat(48)}`);
  console.log(`File:      ${absPath}`);
  console.log(`Size:      ${sizeMB.toFixed(2)}MB`);
  console.log(`Target ID: ${publicId}`);
  console.log(`Cloud:     ${CLOUD}\n`);
  console.log(`Uploading...`);

  try {
    const result = await cloudinary.uploader.upload(absPath, {
      public_id:      publicId,
      overwrite:      true,
      resource_type:  'image',
      quality:        'auto',
      fetch_format:   'auto',
    });

    console.log(`\n✓ Uploaded successfully`);
    console.log(`  URL:        ${result.secure_url}`);
    console.log(`  Dimensions: ${result.width}×${result.height}`);
    console.log(`  Stored:     ${Math.round(result.bytes / 1024)}KB`);
    console.log(`  Format:     ${result.format}`);
    console.log(`\n  Public ID: ${result.public_id}`);
    console.log(`  This replaces the AI placeholder at the same path.`);
    console.log(`  The site will serve this real photo immediately on next build.`);
  } catch (err) {
    console.error(`\n✗ Upload failed: ${(err as Error).message}`);
    process.exit(1);
  }
}

main();
