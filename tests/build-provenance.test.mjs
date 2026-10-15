import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
const commit = '702b2908800be6cce2d58a610195b2bfe334e38a';
async function generated(env, inspect = () => {}, prepare = async () => {}) {
  const dir = await mkdtemp(join(tmpdir(), 'aicm-build-marker-'));
  try {
    await mkdir(join(dir, 'dist/client/_astro'), { recursive: true });
    await writeFile(
      join(dir, 'dist/client/index.html'),
      '<html><head></head><body><h1>My reviews of AI comment moderation tools</h1></body></html>',
    );
    await writeFile(
      join(dir, 'dist/client/404.html'),
      '<html><head></head><body><h1>Page not found</h1></body></html>',
    );
    await writeFile(join(dir, 'dist/client/_astro/test.js'), 'hello');
    await mkdir(join(dir, 'dist/client/nested'));
    await writeFile(join(dir, 'dist/client/nested/build.json'), 'hello');
    await writeFile(join(dir, 'dist/client/nested/healthz.txt'), 'hello');
    await prepare(dir);
    const run = spawnSync(process.execPath, [resolve('scripts/generate-hosting.mjs')], {
      cwd: dir,
      encoding: 'utf8',
      env: {
        ...process.env,
        SITE_URL: 'https://aicommentmoderation.com',
        SITE_RELEASE: 'false',
        SITE_COMMIT: '',
        ...env,
      },
    });
    await inspect(dir, run);
    return run;
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
test('hosting generates a safe source marker and actual public artifact hashes', async () => {
  await generated(
    { SITE_COMMIT: commit, SENTINEL_SECRET: 'do-not-expose-this' },
    async (dir, run) => {
      assert.equal(run.status, 0, run.stderr);
      const path = join(dir, 'dist/build.json');
      assert.ok(existsSync(path), 'Static build marker was not generated');
      const text = await readFile(path, 'utf8');
      const marker = JSON.parse(text);
      assert.equal(marker.schemaVersion, 1);
      assert.equal(marker.commit, commit);
      assert.equal(marker.release, false);
      assert.equal(
        marker.files['_astro/test.js'],
        '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
      );
      for (const path of ['nested/build.json', 'nested/healthz.txt']) {
        assert.equal(marker.files[path], marker.files['_astro/test.js'], path);
      }
      assert.match(marker.files['index.html'], /^[a-f0-9]{64}$/);
      assert.equal('build.json' in marker.files, false);
      assert.equal('healthz.txt' in marker.files, false);
      assert.equal(text.includes('do-not-expose-this'), false);
      assert.deepEqual(Object.keys(marker).sort(), ['commit', 'files', 'release', 'schemaVersion']);
    },
  );
});
test('preview markers explicitly record an absent source identity', async () => {
  await generated({}, async (dir, run) => {
    assert.equal(run.status, 0, run.stderr);
    assert.ok(existsSync(join(dir, 'dist/build.json')), 'Static build marker was not generated');
    assert.equal(JSON.parse(await readFile(join(dir, 'dist/build.json'), 'utf8')).commit, null);
  });
});
test('release builds require source identity and reject malformed marker configuration', async () => {
  for (const env of [
    { SITE_RELEASE: 'true' },
    { SITE_COMMIT: 'not-a-commit' },
    { SITE_COMMIT: `${commit}\n` },
  ]) {
    const run = await generated(env);
    assert.notEqual(run.status, 0, run.stdout);
    assert.match(run.stderr, /SITE_COMMIT/);
  }
});
test('source-marker configuration rejects malformed SHAs and does not mutate supplied inputs', async () => {
  assert.ok(existsSync('src/lib/build-provenance.mjs'), 'Source marker policy is missing');
  const { buildMarker, sourceCommit } = await import('../src/lib/build-provenance.mjs');
  const env = { SITE_COMMIT: commit };
  const entries = [['index.html', Buffer.from('hello')]];
  const marker = buildMarker(entries, env);
  assert.equal(sourceCommit(env), commit);
  assert.equal(sourceCommit({}), null);
  assert.equal(sourceCommit({ SITE_COMMIT: '' }), null);
  assert.throws(() => sourceCommit({ SITE_COMMIT: commit.toUpperCase() }), /SITE_COMMIT/);
  assert.throws(() => sourceCommit({ SITE_COMMIT: 'a'.repeat(39) }), /SITE_COMMIT/);
  assert.throws(
    () => sourceCommit({ SITE_URL: 'https://aicommentmoderation.com', SITE_RELEASE: 'true' }),
    /SITE_COMMIT/,
  );
  assert.throws(
    () => buildMarker([['../private', Buffer.from('hello')]], {}),
    /public artifact path/,
  );
  assert.equal(
    marker.files['index.html'],
    '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
  );
  assert.deepEqual(env, { SITE_COMMIT: commit });
  assert.deepEqual(entries, [['index.html', Buffer.from('hello')]]);
});
test('Coolify and CI bind marker identity to the checked-out source and retain bounded browser evidence', async () => {
  const docker = await readFile('Dockerfile', 'utf8');
  const config = await readFile('astro.config.mjs', 'utf8');
  const workflow = await readFile('.github/workflows/checks.yml', 'utf8');
  assert.match(docker, /ARG SITE_COMMIT/);
  assert.match(config, /mode: 'standalone'/);
  assert.match(
    workflow,
    /SITE_COMMIT: \$\{\{ github\.event\.pull_request\.head\.sha \|\| github\.sha \}\}/,
  );
  assert.match(workflow, /actions\/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a/);
  assert.match(workflow, /retention-days: 7/);
  assert.match(workflow, /include-hidden-files: false/);
  assert.match(workflow, /evidence\/desktop\.png/);
  assert.doesNotMatch(workflow, /path: evidence\/?\s*$/m);
});
test('served marker verification rejects stale source identity and corrupted public bytes', async () => {
  const { buildMarker, verifyBuildMarker, verifyArtifact } =
    await import('../src/lib/build-provenance.mjs');
  assert.equal(typeof verifyBuildMarker, 'function', 'Served marker verifier is missing');
  assert.equal(typeof verifyArtifact, 'function', 'Served artifact verifier is missing');
  const marker = buildMarker([['index.html', Buffer.from('hello')]], { SITE_COMMIT: commit });
  assert.doesNotThrow(() => verifyBuildMarker(marker, commit));
  assert.doesNotThrow(() => verifyArtifact(marker, 'index.html', Buffer.from('hello')));
  assert.throws(() => verifyBuildMarker(marker, 'a'.repeat(40)), /source identity/);
  assert.throws(
    () => verifyArtifact(marker, 'index.html', Buffer.from('corrupted')),
    /artifact bytes/,
  );
  assert.throws(() => verifyBuildMarker({ ...marker, schemaVersion: 2 }), /build marker/);
  assert.throws(
    () => verifyBuildMarker({ ...marker, files: { '../secret': 'a'.repeat(64) } }),
    /build marker/,
  );
  assert.throws(
    () => verifyBuildMarker({ ...marker, files: { 'index.html': 'not-a-hash' } }),
    /build marker/,
  );
});
test('served release markers require source identity even without an expected SHA', async () => {
  const { buildMarker, verifyBuildMarker } = await import('../src/lib/build-provenance.mjs');
  const preview = buildMarker([['index.html', Buffer.from('hello')]], {});
  assert.doesNotThrow(() => verifyBuildMarker(preview));
  assert.throws(() => verifyBuildMarker({ ...preview, release: true }), /build marker/);
  assert.doesNotThrow(() => verifyBuildMarker({ ...preview, release: true, commit }));
});
test('the isolated host smoke checks the served marker rather than relying on health alone', async () => {
  const smoke = await readFile('scripts/smoke-host.mjs', 'utf8');
  assert.match(smoke, /get\('\/build\.json'\)/);
  assert.match(smoke, /process\.argv\[3\]/);
  assert.match(smoke, /verifyBuildMarker\(/);
  assert.match(smoke, /verifyArtifact\(/);
});

test('hosting rejects a missing head before writing CSP metadata or the marker', async () => {
  for (const page of ['index.html', '404.html']) {
    await generated(
      {},
      async (dir, run) => {
        assert.notEqual(run.status, 0);
        assert.match(run.stderr, /head element/);
        assert.equal(existsSync(join(dir, 'dist/build.json')), false);
      },
      async (dir) => {
        const path = join(dir, 'dist/client', page);
        await writeFile(path, (await readFile(path, 'utf8')).replace('</head>', ''));
      },
    );
  }
});
