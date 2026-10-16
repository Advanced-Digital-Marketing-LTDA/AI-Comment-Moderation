import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import config from '../playwright.config.mjs';
import { assertVerificationWorkflow } from '../scripts/ci-policy.mjs';

test('the README retains the owner’s original heading and description', async () => {
  const readme = await readFile('README.md', 'utf8');
  assert.ok(readme.startsWith('# AI-Comment-Moderation\n'));
  assert.ok(readme.includes('\nAI Comment Moderation website.\n'));
});

test('Playwright preview stays foreground under Astro agent auto-background detection', () => {
  assert.ok(config.webServer.command.includes('--ignore-lock'));
  assert.equal(config.webServer.url, config.use.baseURL);
  assert.ok(config.webServer.command.includes('--port 4531'));
});

test('GitHub container verification builds locally and never publishes an image', async () => {
  const workflow = await readFile('.github/workflows/checks.yml', 'utf8');
  assertVerificationWorkflow(workflow);
  assert.ok(workflow.includes('docker build'));
  assert.ok(workflow.includes('scripts/smoke-host.mjs'));
  assert.ok(!workflow.includes('nginx'));
  assert.ok(workflow.includes('127.0.0.1:8080:8080'));
  assert.ok(!workflow.includes('docker push'));
  assert.ok(!workflow.includes('docker login'));
});
