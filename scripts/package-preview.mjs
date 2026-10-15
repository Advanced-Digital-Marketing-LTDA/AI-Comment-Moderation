import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { build } from 'esbuild';
import { resolve } from 'node:path';
let html = await readFile('dist/client/index.html', 'utf8');
// Packaging changes inline script/style bytes, so remove the server artifact policy.
html = html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/g, '');
const robotsMeta = /(<meta name="robots" content=")[^"]+("[^>]*>)/;
if (!robotsMeta.test(html)) throw new Error('Cannot package a preview without robots metadata');
html = html.replace(robotsMeta, '$1noindex,follow$2');
for (const match of [...html.matchAll(/<link rel="stylesheet" href="(\/_astro\/[^"]+)"[^>]*>/g)]) {
  const stylesheetPath = `dist/client${match[1]}`;
  const stylesheet = await readFile(stylesheetPath, 'utf8');
  html = html.replace(match[0], `<style>${stylesheet}</style>`);
}
for (const match of [
  ...html.matchAll(/<script type="module" src="(\/_astro\/[^"]+)"><\/script>/g),
]) {
  const result = await build({
    entryPoints: [resolve(`dist/client${match[1]}`)],
    bundle: true,
    write: false,
    minify: true,
    platform: 'browser',
    format: 'iife',
  });
  html = html.replace(
    match[0],
    `<script>${result.outputFiles[0].text.replaceAll('</script', '<\\/script')}</script>`,
  );
}
html = html.replaceAll('href="/#', 'href="#').replaceAll('href="/"', 'href="#main"');
// The review pages are not packaged in this single file, so their link points at the published page.
html = html.replaceAll('href="/reviews/"', 'href="https://aicommentmoderation.com/reviews/"');
const icon = await readFile('public/favicon.svg');
html = html.replace(
  'href="/favicon.svg"',
  `href="data:image/svg+xml;base64,${icon.toString('base64')}"`,
);
if (html.includes('src="/_astro/') || html.includes('href="/_astro/'))
  throw new Error('Preview still depends on server assets');
await mkdir('deliverables', { recursive: true });
await writeFile('deliverables/AICommentModeration-preview.html', html);
console.log(
  `Packaged self-contained noindex preview (${Buffer.byteLength(html)} bytes). No hosting or publication occurred.`,
);
