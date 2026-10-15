import { existsSync } from 'node:fs';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { securityHeaders } from '../src/lib/hosting-headers.mjs';
import { buildMarker } from '../src/lib/build-provenance.mjs';
import { reviews } from '../src/data/reviews.mjs';
let html = await readFile('dist/client/index.html', 'utf8');
let errorHtml = await readFile('dist/client/404.html', 'utf8');
if (!html.includes('My reviews of AI comment moderation tools'))
  throw new Error('Cannot prepare hosting without the expected built guide');
// A build without the reviews directory is rejected later by check-output's sitemap count.
const reviewPaths = existsSync('dist/client/reviews')
  ? ['/reviews', ...reviews.map((review) => `/reviews/${review.slug}`)]
  : [];
const reviewPages = await Promise.all(
  reviewPaths.map((path) => readFile(`dist/client${path}/index.html`, 'utf8')),
);
const headers = securityHeaders([html, errorHtml, ...reviewPages].join('\n'));
// Keep the script policy in the HTML as well as the native header registry;
// frame-ancestors requires an HTTP header and is omitted from the meta policy.
const policy = headers['Content-Security-Policy'].replace("; frame-ancestors 'none'", '');
const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}">`;
if (!html.includes('</head>') || !errorHtml.includes('</head>'))
  throw new Error('Cannot add CSP metadata without a head element');
html = html.replace('</head>', `${meta}</head>`);
errorHtml = errorHtml.replace('</head>', `${meta}</head>`);
await writeFile('dist/client/index.html', html);
await writeFile('dist/client/404.html', errorHtml);
for (const [index, path] of reviewPaths.entries()) {
  const file = `dist/client${path}/index.html`;
  if (!reviewPages[index].includes('</head>'))
    throw new Error(`Cannot add CSP metadata to ${file}`);
  await writeFile(file, reviewPages[index].replace('</head>', `${meta}</head>`));
}
const publicFiles = [];
async function collect(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) await collect(path);
    else {
      const publicPath = relative('dist/client', path).replaceAll('\\', '/');
      if (['build.json', 'healthz.txt'].includes(publicPath))
        throw new Error(`Reserved public artifact path: ${publicPath}`);
      publicFiles.push([publicPath, await readFile(path)]);
    }
  }
}
await collect('dist/client');
const marker = buildMarker(publicFiles, process.env);
const indexable = ['/', '/index.html', ...reviewPaths.flatMap((path) => [path, `${path}/`])];
const routes = [...indexable, '/404', '/404/', '/404.html'];
await writeFile(
  'dist/_headers.json',
  JSON.stringify(
    routes.map((pathname) => ({
      pathname,
      headers: Object.entries({
        ...headers,
        'Cache-Control': indexable.includes(pathname) ? 'no-cache' : 'no-store',
        ...(!indexable.includes(pathname) ? { 'X-Robots-Tag': 'noindex, follow' } : {}),
      }).map(([key, value]) => ({ key, value })),
    })),
    null,
    2,
  ),
);
await writeFile('dist/build.json', `${JSON.stringify(marker, null, 2)}\n`);
console.log('Prepared standalone Node headers, CSP hashes and source/artifact marker');
