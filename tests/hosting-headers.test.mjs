import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { securityHeaders } from '../src/lib/hosting-headers.mjs';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

test('hosting generation covers a distinct inline script on the real 404 template', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'aicm-hosting-fixture-'));
  try {
    await mkdir(join(dir, 'dist/client'), { recursive: true });
    await writeFile(
      join(dir, 'dist/client/index.html'),
      '<head></head><h1>My reviews of AI comment moderation tools</h1><script>root()</script>',
    );
    await writeFile(
      join(dir, 'dist/client/404.html'),
      '<head></head><h1>Page not found</h1><script>errorPage()</script>',
    );
    const run = spawnSync(process.execPath, [resolve('scripts/generate-hosting.mjs')], {
      cwd: dir,
      encoding: 'utf8',
    });
    assert.equal(run.status, 0, run.stderr);
    const headers = await readFile(join(dir, 'dist/_headers.json'), 'utf8');
    const expected = createHash('sha256').update('errorPage()').digest('base64');
    assert.ok(
      headers.includes(`'sha256-${expected}'`),
      '404 inline script requires its own CSP hash',
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('CSP hashes inline scripts without granting unsafe-inline or third-party access', () => {
  const body = 'document.body.dataset.ready="yes";';
  const headers = JSON.stringify(
    securityHeaders(`<script>${body}</script><script src="/_astro/example.js"></script>`),
  );
  const expected = createHash('sha256').update(body).digest('base64');
  assert.ok(headers.includes(`'sha256-${expected}'`));
  assert.ok(headers.includes("connect-src 'none'"));
  assert.ok(headers.includes("frame-ancestors 'none'"));
  assert.ok(headers.includes('X-Content-Type-Options'));
  assert.ok(headers.includes('Referrer-Policy'));
  assert.ok(!headers.includes('add_header'));
  assert.ok(!headers.includes('unsafe-inline'));
  assert.ok(!headers.includes('https://'));
});
test('external scripts are not mistaken for inline bodies and duplicate bodies share one hash', () => {
  const headers = JSON.stringify(
    securityHeaders(
      '<script src="/_astro/x.js"></script><script>hello()</script><script>hello()</script>',
    ),
  );
  assert.equal((headers.match(/sha256-/g) ?? []).length, 1);
});
