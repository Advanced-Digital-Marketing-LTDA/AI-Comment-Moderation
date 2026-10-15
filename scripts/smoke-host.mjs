import assert from 'node:assert/strict';
import { sourceCommit, verifyBuildMarker, verifyArtifact } from '../src/lib/build-provenance.mjs';
const target = process.argv[2];
const expectedCommit = process.argv[3];
if (expectedCommit !== undefined) sourceCommit({ SITE_COMMIT: expectedCommit });
if (!target) throw new Error('Pass the approved local preview base URL');
const base = new URL(target);
if (
  !['127.0.0.1', 'localhost'].includes(base.hostname) ||
  base.protocol !== 'http:' ||
  base.username ||
  base.password ||
  base.search ||
  base.hash ||
  base.pathname !== '/'
)
  throw new Error('Smoke test accepts an isolated HTTP loopback preview only');
async function get(path) {
  return fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(5000) });
}
const root = await get('/');
assert.equal(root.status, 200);
const html = await root.text();
assert.ok(html.includes('My reviews of AI comment moderation tools'));
assert.ok(html.includes('noindex,follow'), 'Use a preview build for this smoke test');
const csp = root.headers.get('content-security-policy');
assert.ok(csp?.includes("connect-src 'none'"));
assert.ok(!csp.includes('unsafe-inline'));
assert.equal(root.headers.get('x-content-type-options'), 'nosniff');
const identity = await get('/build.json');
assert.equal(identity.status, 200);
assert.ok(identity.headers.get('content-type')?.includes('application/json'));
assert.equal(identity.headers.get('cache-control'), 'no-store');
assert.ok(identity.headers.get('x-robots-tag')?.includes('noindex'));
const marker = await identity.json();
verifyBuildMarker(marker, expectedCommit);
assert.equal(marker.release, false, 'The isolated smoke must use a preview artifact');
verifyArtifact(marker, 'index.html', html);
assert.equal((await get('/healthz')).status, 200);
assert.equal((await get('/missing-page/')).status, 404);
const missing = await get('/missing-page/');
const errorHtml = await missing.text();
assert.ok(errorHtml.includes('Page not found'));
verifyArtifact(marker, '404.html', errorHtml);
assert.ok(missing.headers.get('content-security-policy'));
assert.ok(missing.headers.get('x-robots-tag')?.includes('noindex'));
assert.equal((await get('/404.html')).status, 200);
for (const path of ['/index.html', '/404.html']) {
  const response = await get(path);
  const content = await response.text();
  assert.equal(response.status, 200);
  assert.ok(content.includes('http-equiv="Content-Security-Policy"'), path);
  assert.equal(response.headers.get('x-frame-options'), 'DENY', path);
  assert.ok(
    response.headers.get('content-security-policy')?.includes("frame-ancestors 'none'"),
    path,
  );
}
for (const path of ['/404', '/404/']) {
  const response = await get(path);
  assert.equal(response.status, 404);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.ok(response.headers.get('content-security-policy'));
  assert.ok(response.headers.get('x-robots-tag')?.includes('noindex'));
}
assert.ok((await (await get('/404.html')).text()).includes('noindex,follow'));
assert.equal((await get('/_astro/missing.js')).status, 404);
assert.equal((await get('/healthz.txt')).status, 404);
assert.equal((await get('/.env')).status, 404);
for (const match of html.matchAll(/(?:src|href)="(\/(?:_astro\/|favicon|social)[^"]+)"/g)) {
  const response = await get(match[1]);
  assert.equal(response.status, 200, match[1]);
  verifyArtifact(marker, match[1].slice(1), Buffer.from(await response.arrayBuffer()));
}
const scripts = [...html.matchAll(/src="(\/_astro\/[^"]+\.js)"/g)];
if (scripts.length) {
  const asset = await get(scripts[0][1]);
  assert.ok(asset.headers.get('content-type')?.includes('javascript'));
  assert.ok(asset.headers.get('cache-control')?.includes('immutable'));
}
console.log(
  'Local standalone Node smoke passed: source/artifact identity, root/assets/health, real 404, CSP/headers and preview indexing',
);
