import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { scenarios } from '../src/data/scenarios.mjs';
import { reviews } from '../src/data/reviews.mjs';

test('Astro npm commands use a portable Node launcher instead of shell environment assignments', async () => {
  const { scripts } = JSON.parse(await readFile('package.json', 'utf8'));
  for (const command of ['dev', 'check', 'build', 'build:release', 'preview']) {
    assert.ok(scripts[command].startsWith(`node scripts/astro.mjs ${command}`), command);
    assert.doesNotMatch(scripts[command], /(?:^|\s)[A-Z_]+=/, command);
  }
});

test('the canonical origin rejects an explicit default port rather than silently normalizing it', async () => {
  const { siteConfig } = await import('../src/lib/site-config.mjs');
  assert.throws(() => siteConfig({ SITE_URL: 'https://aicommentmoderation.com:443' }), /origin/);
});

test('the keyboard skip target has an explicit visible inward focus outline', async () => {
  const css = await readFile('src/styles/site.css', 'utf8');
  assert.doesNotMatch(css, /main:focus\s*\{[^}]*outline:\s*none/);
  assert.match(css, /main:focus-visible\s*\{[^}]*outline:\s*3px solid[^}]*outline-offset:\s*-3px/s);
});

const anchors = [
  'what-this-covers',
  'tool-reviews',
  'try-the-examples',
  'choose-a-workflow',
  'native-settings',
  'review-tradeoffs',
  'rules-and-review',
  'moderaty',
  'questions',
  'sources',
  'privacy-and-ownership',
  'other-platforms',
];
const escape = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
function example(scenario) {
  return `<article data-static-scenario id="example-${scenario.id}"><h3>${escape(scenario.label)}</h3><blockquote>${escape(scenario.text)}</blockquote><p>${escape(scenario.context)}</p><p><strong>Cautious:</strong> ${escape(scenario.decisions.cautious.reason)}</p><p><strong>Stricter:</strong> ${escape(scenario.decisions.stricter.reason)}</p><p>${escape(scenario.missingContext)}</p></article>`;
}
function guide(examples) {
  const sections = anchors.map((id) => `<section id="${id}"></section>`).join('');
  const options = scenarios
    .map((scenario) => `<option value="${scenario.id}">${escape(scenario.label)}</option>`)
    .join('');
  const reviewLinks = reviews.map((review) => `<a href="/reviews/${review.slug}/"></a>`).join('');
  return `<html><head><title>AI Comment Moderation Tool Reviews: Workflows, Examples and Review Choices</title><link rel="canonical" href="https://aicommentmoderation.com/"><meta name="robots" content="noindex,follow"></head><body><h1>My reviews of AI comment moderation tools</h1><div class="hero-visual" role="group"></div><span id="checklist-count" hidden></span><button id="reset-checklist" hidden></button><p>Illustrative rules, not a live AI prediction; My reviews of AI comment moderation tools; top-level YouTube comments</p>${sections}${reviewLinks}<select>${options}</select><details class="all-examples"><div class="static-example-grid">${examples}</div></details></body></html>`;
}
async function checkOutput(html, release = false) {
  const dir = await mkdtemp(join(tmpdir(), 'aicm-output-review-'));
  try {
    await mkdir(join(dir, 'dist/client'), { recursive: true });
    await writeFile(join(dir, 'dist/client/index.html'), html);
    await writeFile(join(dir, 'dist/client/404.html'), 'Page not found noindex,follow');
    await writeFile(
      join(dir, 'dist/client/robots.txt'),
      `Allow: /\nSitemap: https://aicommentmoderation.com/sitemap.xml`,
    );
    await writeFile(
      join(dir, 'dist/client/sitemap.xml'),
      '<loc>https://aicommentmoderation.com/</loc>',
    );
    return spawnSync(process.execPath, [resolve('scripts/check-output.mjs')], {
      cwd: dir,
      encoding: 'utf8',
      env: {
        ...process.env,
        SITE_URL: 'https://aicommentmoderation.com',
        SITE_RELEASE: String(release),
      },
    });
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

test('built-output fixture coverage accepts complete prerendered examples', async () => {
  const run = await checkOutput(guide(scenarios.map(example).join('')));
  assert.equal(run.status, 0, run.stderr);
});
test('built-output fixture coverage rejects a missing article even when its option ID remains', async () => {
  const run = await checkOutput(guide(scenarios.slice(1).map(example).join('')));
  assert.notEqual(run.status, 0, run.stdout);
  assert.match(run.stderr, /pre-rendered fictional fixture/);
});
test('built-output fixture coverage rejects missing fictional comment text', async () => {
  const html = guide(scenarios.map(example).join('')).replace(
    /<blockquote>[^<]*<\/blockquote>/,
    '',
  );
  const run = await checkOutput(html);
  assert.notEqual(run.status, 0, run.stdout);
  assert.match(run.stderr, /fictional comment text/);
});
test('built-output fixture coverage rejects a missing policy explanation', async () => {
  const html = guide(scenarios.map(example).join('')).replace(
    /<p><strong>Stricter:<\/strong>[^<]*<\/p>/,
    '',
  );
  const run = await checkOutput(html);
  assert.notEqual(run.status, 0, run.stdout);
  assert.match(run.stderr, /stricter policy/);
});
test('built-output fixture coverage rejects articles outside the readable example grid', async () => {
  const html = guide(scenarios.map(example).join('')).replace(
    'class="static-example-grid"',
    'class="wrong-grid"',
  );
  const run = await checkOutput(html);
  assert.notEqual(run.status, 0, run.stdout);
  assert.match(run.stderr, /pre-rendered fictional fixture/);
});
test('built-output fixture coverage rejects a missing context explanation', async () => {
  const html = guide(scenarios.map(example).join('')).replace(
    `<p>${escape(scenarios[0].context)}</p>`,
    '',
  );
  const run = await checkOutput(html);
  assert.notEqual(run.status, 0, run.stdout);
  assert.match(run.stderr, /fixture context/);
});
test('offline stylesheet packaging avoids nested template literals', async () => {
  const source = await readFile('scripts/package-preview.mjs', 'utf8');
  assert.doesNotMatch(source, /`<style>\$\{await readFile\(`/);
});
test('fixture identity-set comparison supplies the same explicit string comparator on both sides', async () => {
  const source = await readFile('tests/scenarios.test.mjs', 'utf8');
  const identityCheck = source.slice(0, source.indexOf("test('ten fictional fixtures"));
  assert.doesNotMatch(identityCheck, /\.sort\(\)/);
  assert.equal((identityCheck.match(/\.sort\(compareFixtureIds\)/g) ?? []).length, 2);
});
for (const [name, tag] of [
  ['HTTP editorial destination', '<a href="http://unapproved.invalid/">Exit</a>'],
  ['protocol-relative editorial destination', '<a href="//unapproved.invalid/">Exit</a>'],
  ['unapproved remote script', '<script src="https://unapproved.invalid/script.js"></script>'],
  [
    'allowlisted remote script without selected runtime integration',
    '<script src="https://moderaty.com/script.js"></script>',
  ],
  ['remote image', '<img src="https://unapproved.invalid/image.png" alt="Fixture">'],
  ['executable link scheme', '<a href="javascript:alert(1)">Exit</a>'],
  ['external stylesheet', '<link rel="stylesheet" href="https://moderaty.com/remote.css">'],
  [
    'external script preload',
    '<link rel="preload" as="script" href="https://github.com/remote.js">',
  ],
  ['external base element', '<base href="https://github.com/">'],
])
  test(`built-output destination policy rejects ${name}`, async () => {
    const html = guide(scenarios.map(example).join('')).replace('</body>', `${tag}</body>`);
    const run = await checkOutput(html);
    assert.notEqual(run.status, 0, run.stdout);
    assert.match(run.stderr, /Unapproved/);
  });
test('built-output fragment coverage rejects broken root-relative targets', async () => {
  const html = guide(scenarios.map(example).join('')).replace(
    '</body>',
    '<a href="/#nonexistent">Missing</a></body>',
  );
  const run = await checkOutput(html);
  assert.notEqual(run.status, 0, run.stdout);
  assert.match(run.stderr, /Missing link target/);
});
test('built-output release validation cannot mistake noindex for index', async () => {
  const run = await checkOutput(guide(scenarios.map(example).join('')), true);
  assert.notEqual(run.status, 0, run.stdout);
  assert.match(run.stderr, /robots metadata/);
});
