import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Coolify runs the locked Astro standalone Node server as nonroot', async () => {
  const docker = await readFile('Dockerfile', 'utf8');
  assert.match(docker, /FROM node:24\.19\.0-bookworm-slim@sha256:/);
  assert.match(docker, /ARG SITE_RELEASE=false/);
  assert.match(docker, /npm ci/);
  assert.match(docker, /npm prune --omit=dev/);
  assert.match(docker, /COPY --from=build.*\/app\/dist/);
  assert.match(docker, /USER node/);
  assert.match(docker, /EXPOSE 8080/);
  assert.match(docker, /HEALTHCHECK/);
  assert.match(docker, /CMD \["node", "\.\/dist\/server\/entry\.mjs"\]/);
  assert.doesNotMatch(docker, /nginx|astro preview|COPY.*\.env/);
});

test('health is a runtime endpoint without a static health file', async () => {
  const { GET, prerender } = await import('../src/pages/healthz.ts');
  assert.equal(prerender, false);
  const response = GET();
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'ok\n');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('x-robots-tag'), 'noindex');
});
