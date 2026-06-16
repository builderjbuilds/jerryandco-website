/**
 * Jerry & Co. — Local Preview Server
 * ─────────────────────────────────────────────────────────────────
 * Serves a visual gallery of all locally-generated images so you
 * can review them in the browser before pushing to Cloudinary.
 *
 * Usage:
 *   npx tsx scripts/preview-server.ts
 *   npx tsx scripts/preview-server.ts --port=4000
 *
 * Opens: http://localhost:3333 (or custom port)
 * Shows: all PNG files in assets/img/generated/ in a grid
 * Displays: filename, dimensions, file size per image
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const args    = process.argv.slice(2);
const portArg = args.find(a => a.startsWith('--port'));
const PORT    = portArg ? parseInt(portArg.split('=')[1] ?? '3333') : 3333;
const IMG_DIR = path.resolve('assets/img/generated');

if (!fs.existsSync(IMG_DIR)) {
  console.error(`ERROR: ${IMG_DIR} does not exist.`);
  console.error(`Run: npx tsx scripts/generate-media.ts --dry-run first.`);
  process.exit(1);
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function getFolder(filename: string): string {
  const parts = filename.replace('.png', '').split('_');
  // filename format: v1_hero_... or v1_projects_... etc.
  return parts[1] ?? 'other';
}

function serveGallery(res: http.ServerResponse): void {
  const files = fs.readdirSync(IMG_DIR)
    .filter(f => f.endsWith('.png'))
    .sort();

  const byFolder: Record<string, string[]> = {};
  for (const f of files) {
    const folder = getFolder(f);
    if (!byFolder[folder]) byFolder[folder] = [];
    byFolder[folder].push(f);
  }

  const folderOrder = ['hero', 'projects', 'colors', 'process', 'about', 'pages', 'other'];
  const sortedFolders = [
    ...folderOrder.filter(f => byFolder[f]),
    ...Object.keys(byFolder).filter(f => !folderOrder.includes(f)),
  ];

  const sections = sortedFolders.map(folder => {
    const folderFiles = byFolder[folder] ?? [];
    const cards = folderFiles.map(file => {
      const stat  = fs.statSync(path.join(IMG_DIR, file));
      const cldId = file.replace(/_/g, '/').replace('.png', '');
      const label = file.replace('v1_', '').replace(/_/g, '/').replace('.png', '');
      return `
        <div class="card">
          <div class="img-wrap">
            <img src="/img/${file}" loading="lazy" alt="${label}" />
          </div>
          <div class="info">
            <div class="label">${label}</div>
            <div class="meta">
              <span class="cld-id">${cldId}</span>
              <span class="size">${formatBytes(stat.size)}</span>
            </div>
          </div>
        </div>`;
    }).join('');

    return `
      <section>
        <h2>${folder} <span class="count">${folderFiles.length} images</span></h2>
        <div class="grid">${cards}</div>
      </section>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Jerry &amp; Co. — Generated Image Preview</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
         background: #F7F3EA; color: #20281F; font-size: 14px; }
  header { background: #1E3934; color: #F7F3EA; padding: 20px 32px;
           display: flex; align-items: center; justify-content: space-between; }
  header h1 { font-size: 18px; font-weight: 500; letter-spacing: -0.01em; }
  header .sub { font-size: 12px; opacity: 0.6; margin-top: 2px; }
  .badge { background: #C8A055; color: #14241F; font-size: 11px; font-weight: 600;
           padding: 4px 10px; border-radius: 3px; letter-spacing: 0.04em; }
  main { max-width: 1400px; margin: 0 auto; padding: 32px; }
  section { margin-bottom: 48px; }
  h2 { font-size: 13px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
       color: #6E6A5E; margin-bottom: 16px; padding-bottom: 10px;
       border-bottom: 1px solid rgba(30,57,52,0.12); display: flex;
       align-items: center; gap: 10px; }
  .count { font-size: 11px; background: rgba(30,57,52,0.08); color: #6E6A5E;
           padding: 2px 8px; border-radius: 10px; font-weight: 400;
           letter-spacing: 0; text-transform: none; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
  .card { background: #fff; border: 1px solid rgba(30,57,52,0.1);
          border-radius: 4px; overflow: hidden; }
  .img-wrap { aspect-ratio: 4/3; background: #EFE7D6; overflow: hidden; }
  .img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block;
                  transition: opacity 0.2s; opacity: 0; }
  .img-wrap img.loaded { opacity: 1; }
  .info { padding: 10px 12px; }
  .label { font-size: 12px; color: #20281F; font-weight: 500; margin-bottom: 5px;
           white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .meta { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
  .cld-id { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 10px;
             color: #6E6A5E; white-space: nowrap; overflow: hidden;
             text-overflow: ellipsis; flex: 1; }
  .size { font-size: 10px; color: #C8A055; font-weight: 600;
          white-space: nowrap; flex-shrink: 0; }
  .empty { color: #6E6A5E; font-size: 13px; padding: 40px 0; text-align: center; }
  .cmd { background: #1E3934; color: #F7F3EA; font-family: monospace; font-size: 12px;
         padding: 12px 16px; border-radius: 4px; margin-bottom: 32px; line-height: 1.7; }
  .cmd span { color: #C8A055; }
</style>
</head>
<body>
<header>
  <div>
    <div class="sub">Jerry &amp; Co. Home Improvement</div>
    <h1>Generated Image Preview</h1>
  </div>
  <span class="badge">${files.length} images</span>
</header>
<main>
  <div class="cmd">
    Review images below &middot; Approve what looks good &middot;
    Then: <span>npx tsx scripts/upload-approved.ts</span>
    &nbsp;&nbsp;or&nbsp;&nbsp;
    <span>npx tsx scripts/generate-media.ts</span> (upload all)
  </div>
  ${files.length === 0
    ? '<div class="empty">No generated images yet. Run: npx tsx scripts/generate-media.ts --dry-run</div>'
    : sections
  }
</main>
<script>
  document.querySelectorAll('.img-wrap img').forEach(function(img) {
    img.addEventListener('load', function() { img.classList.add('loaded'); });
    if (img.complete) img.classList.add('loaded');
  });
</script>
</body>
</html>`;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function serveImage(filename: string, res: http.ServerResponse): void {
  const filepath = path.join(IMG_DIR, filename);
  if (!fs.existsSync(filepath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const stat = fs.statSync(filepath);
  res.writeHead(200, {
    'Content-Type':   'image/png',
    'Content-Length': stat.size,
    'Cache-Control':  'no-cache',
  });
  fs.createReadStream(filepath).pipe(res);
}

// ── Server ───────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const url = req.url ?? '/';

  if (url === '/' || url === '/index.html') {
    serveGallery(res);
    return;
  }

  if (url.startsWith('/img/')) {
    const filename = decodeURIComponent(url.slice(5));
    // Security: only serve .png files from IMG_DIR, no path traversal
    if (!filename.endsWith('.png') || filename.includes('..') || filename.includes('/')) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    serveImage(filename, res);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\nJerry & Co. — Image Preview Server`);
  console.log(`${'─'.repeat(48)}`);
  console.log(`Serving: ${IMG_DIR}`);
  console.log(`Open:    ${url}\n`);

  // Auto-open in browser
  const opener =
    process.platform === 'darwin' ? 'open' :
    process.platform === 'win32'  ? 'start' : 'xdg-open';
  exec(`${opener} ${url}`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is in use. Try: npx tsx scripts/preview-server.ts --port=4000`);
  } else {
    console.error('Server error:', err.message);
  }
  process.exit(1);
});
