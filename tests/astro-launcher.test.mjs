import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

async function launcher() {
  assert.ok(existsSync('scripts/astro.mjs'), 'Portable Astro launcher is missing');
  return import('../scripts/astro.mjs');
}
test('portable Astro plans preserve literal arguments and disable tooling telemetry', async () => {
  const { commandPlan } = await launcher();
  const args = ['--host', '127.0.0.1', '--ignore-lock', 'space ; $(literal) ü'];
  const plan = commandPlan('preview', args, {
    ASTRO_TELEMETRY_DISABLED: '0',
  });
  assert.equal(plan.env.ASTRO_TELEMETRY_DISABLED, '1');
  assert.equal(plan.steps[0][0], process.execPath);
  assert.match(plan.steps[0][1], /bin[/\\]astro\.mjs$/);
  assert.deepEqual(plan.steps[0].slice(2), ['preview', ...args]);
  assert.throws(() => commandPlan('anything'), /Unsupported Astro command/);
});
test('builds run every build stage and retain Docker build args', async () => {
  const { commandPlan } = await launcher();
  const env = { SITE_URL: 'https://aicommentmoderation.com' };
  const build = commandPlan('build', [], env);
  assert.equal(build.env.SITE_URL, env.SITE_URL);
  assert.equal(build.steps.length, 3);
  assert.equal(build.steps[0][2], 'build');
  assert.match(build.steps[1][1], /generate-hosting\.mjs$/);
  assert.match(build.steps[2][1], /check-output\.mjs$/);
});
test('portable runner executes real children in order and stops on the first failure', async () => {
  const { runCommands } = await launcher();
  const dir = await mkdtemp(join(tmpdir(), 'aicm-launcher-'));
  try {
    const log = join(dir, 'stages');
    const child = (message, status) => [
      process.execPath,
      '--input-type=module',
      '-e',
      `import { appendFileSync } from 'node:fs'; appendFileSync(process.env.STAGE_LOG, '${message}:'+process.env.ASTRO_TELEMETRY_DISABLED+':'+process.env.STAGE_MARK+'\\n'); process.exit(${status});`,
    ];
    const env = {
      ...process.env,
      STAGE_LOG: log,
      ASTRO_TELEMETRY_DISABLED: '1',
      STAGE_MARK: 'true',
    };
    assert.equal(
      await runCommands([child('first', 0), child('second', 7), child('forbidden', 0)], env),
      7,
    );
    assert.equal(await readFile(log, 'utf8'), 'first:1:true\nsecond:1:true\n');
    assert.equal(await runCommands([child('last', 0)], env), 0);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
test('portable runner reports spawn errors and restores signal listeners', async () => {
  const { runCommands } = await launcher();
  const before = ['SIGINT', 'SIGTERM'].map((signal) => process.listenerCount(signal));
  await assert.rejects(
    runCommands([[join(tmpdir(), 'aicm-missing-executable')]], process.env),
    /ENOENT/,
  );
  assert.deepEqual(
    ['SIGINT', 'SIGTERM'].map((signal) => process.listenerCount(signal)),
    before,
  );
});
test(
  'portable runner forwards termination and stops even if its child handles it with exit zero',
  {
    timeout: 8000,
    skip:
      process.platform === 'win32' ? 'POSIX signal delivery; Windows runtime not available' : false,
  },
  async () => {
    const dir = await mkdtemp(join(tmpdir(), 'aicm-interrupt-'));
    const marker = join(dir, 'ready');
    const forbidden = join(dir, 'forbidden');
    const module = pathToFileURL(resolve('scripts/astro.mjs')).href;
    const childCode = `process.on('SIGTERM', () => process.exit(0)); require('node:fs').writeFileSync(process.env.READY_FILE, 'ready'); setInterval(() => {}, 1000);`;
    const laterCode = `require('node:fs').writeFileSync(process.env.FORBIDDEN_FILE, 'unexpected');`;
    const code = `import { runCommands } from ${JSON.stringify(module)}; process.exitCode = await runCommands([[process.execPath, '-e', ${JSON.stringify(childCode)}], [process.execPath, '-e', ${JSON.stringify(laterCode)}]], process.env);`;
    const runner = spawn(process.execPath, ['--input-type=module', '-e', code], {
      env: { ...process.env, READY_FILE: marker, FORBIDDEN_FILE: forbidden },
      stdio: 'ignore',
      shell: false,
    });
    const closed = new Promise((resolve, reject) => {
      runner.once('error', reject);
      runner.once('close', (status) => resolve(status));
    });
    try {
      const deadline = Date.now() + 5000;
      while (!existsSync(marker) && Date.now() < deadline) await delay(20);
      assert.ok(existsSync(marker), 'Child did not become ready');
      runner.kill('SIGTERM');
      assert.equal(await closed, 143);
      assert.equal(existsSync(forbidden), false);
    } finally {
      if (runner.exitCode === null) runner.kill('SIGKILL');
      await closed;
      await rm(dir, { recursive: true, force: true });
    }
  },
);
