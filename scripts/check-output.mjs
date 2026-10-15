import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { allowedExternalUrl, siteConfig } from '../src/lib/site-config.mjs';
import { scenarios } from '../src/data/scenarios.mjs';
import { JSDOM } from 'jsdom';
const config = siteConfig(process.env);
const html = await readFile('dist/client/index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;
assert.match(
  html,
  /class="hero-visual"[^>]*role="group"/,
  'Named workflow illustration needs a group role',
);
assert.match(
  html,
  /id="checklist-count"[^>]*\bhidden\b/,
  'No-JS count must stay hidden until enhancement',
);
assert.match(
  html,
  /id="reset-checklist"[^>]*\bhidden\b/,
  'No-JS reset must stay hidden until enhancement',
);
const expectedIds = [
  'what-this-covers',
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
assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
assert.ok(html.includes('Choose an AI comment moderation workflow'));
assert.ok(html.includes('AI Comment Moderation: Workflows, Examples and Review Choices'));
assert.match(html, /rel="canonical" href="https:\/\/aicommentmoderation\.com\/"/);
assert.equal(document.querySelectorAll('meta[name="robots"]').length, 1);
assert.equal(
  document.querySelector('meta[name="robots"]')?.getAttribute('content'),
  config.release ? 'index,follow' : 'noindex,follow',
  'Incorrect robots metadata for the selected artifact mode',
);
assert.ok(html.includes('Illustrative rules, not a live AI prediction'));
assert.ok(html.includes('the team behind Moderaty'));
assert.ok(html.includes('top-level YouTube comments'));
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
assert.equal(ids.size, [...html.matchAll(/\bid="([^"]+)"/g)].length, 'IDs must be unique');
for (const id of expectedIds) assert.ok(ids.has(id), `Missing required anchor ${id}`);
async function checkDestinations(document, label) {
  assert.equal(document.querySelector('base'), null, `Unapproved base element in ${label}`);
  for (const element of document.querySelectorAll('[href], [src]')) {
    for (const attribute of ['href', 'src']) {
      const value = element.getAttribute(attribute);
      if (value === null) continue;
      let url;
      try {
        url = new URL(value, `${config.origin}/`);
      } catch {
        throw new Error(`Unapproved ${attribute} destination in ${label}`);
      }
      const local = url.origin === config.origin && !url.username && !url.password;
      assert.ok(
        local || (attribute === 'href' && element.tagName === 'A' && allowedExternalUrl(value)),
        `Unapproved ${attribute} destination in ${label}`,
      );
      if (local && url.pathname === '/' && url.hash) {
        let fragment;
        try {
          fragment = decodeURIComponent(url.hash.slice(1));
        } catch {
          throw new Error('Missing link target: invalid fragment');
        }
        assert.ok(ids.has(fragment), `Missing link target ${fragment}`);
      }
      const resource =
        attribute === 'src' ||
        (element.tagName === 'LINK' &&
          ['stylesheet', 'icon'].includes(element.getAttribute('rel')));
      if (local && resource) await readFile(join('dist/client', url.pathname));
    }
  }
}
await checkDestinations(document, 'index.html');
const examples = [
  ...dom.window.document.querySelectorAll(
    'details.all-examples > .static-example-grid > article[data-static-scenario]',
  ),
];
const normalized = (value) => value.replace(/\s+/g, ' ').trim();
for (const scenario of scenarios) {
  const article = examples.find((item) => item.id === `example-${scenario.id}`);
  assert.ok(article, `Missing pre-rendered fictional fixture ${scenario.id}`);
  assert.equal(
    normalized(article.querySelector('h3')?.textContent ?? ''),
    normalized(scenario.label),
  );
  assert.equal(
    normalized(article.querySelector('blockquote')?.textContent ?? ''),
    normalized(scenario.text),
    `Missing fictional comment text for ${scenario.id}`,
  );
  for (const context of [scenario.context, scenario.missingContext])
    assert.ok(
      [...article.querySelectorAll('p')].some((item) =>
        normalized(item.textContent).includes(normalized(context)),
      ),
      `Missing fixture context for ${scenario.id}`,
    );
  for (const mode of ['cautious', 'stricter']) {
    const explanation = [...article.querySelectorAll('p')].find((paragraph) =>
      paragraph.querySelector('strong')?.textContent.toLowerCase().startsWith(`${mode}:`),
    );
    assert.ok(
      explanation &&
        normalized(explanation.textContent).includes(normalized(scenario.decisions[mode].reason)),
      `Missing ${mode} policy explanation for ${scenario.id}`,
    );
  }
}
assert.equal(examples.length, scenarios.length, 'Unexpected pre-rendered fictional fixture count');
dom.window.close();
const error = await readFile('dist/client/404.html', 'utf8');
assert.ok(error.includes('Page not found'));
assert.ok(!error.includes('rel="canonical"'));
assert.ok(error.includes('noindex,follow'));
const errorDOM = new JSDOM(error);
await checkDestinations(errorDOM.window.document, '404.html');
errorDOM.window.close();
const robots = await readFile('dist/client/robots.txt', 'utf8');
assert.ok(robots.includes('Sitemap: https://aicommentmoderation.com/sitemap.xml'));
assert.ok(robots.includes('Allow: /'));
assert.ok(!robots.includes('Disallow'));
const sitemap = await readFile('dist/client/sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<loc>/g) ?? []).length, 1);
assert.ok(sitemap.includes('<loc>https://aicommentmoderation.com/</loc>'));
const files = [];
async function walk(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) await walk(path);
    else files.push(path);
  }
}
await walk('dist/client');
for (const path of files.filter((p) => /\.(?:html|js|txt|xml|json)$/.test(p))) {
  const body = await readFile(path, 'utf8');
  for (const forbidden of [
    'youtubeaimoderation.com',
    'aicommentmoderation.net',
    'localStorage',
    'sessionStorage',
    'googletagmanager',
    'gtag(',
    'umami',
    'Authorization:',
    'sk-proj-',
    'API_KEY',
  ])
    assert.ok(
      !body.toLowerCase().includes(forbidden.toLowerCase()),
      `${path}: forbidden ${forbidden}`,
    );
}
for (const match of html.matchAll(/(?:src|href)="(\/(?:_astro\/|favicon|social)[^"]+)"/g))
  await readFile(join('dist/client', match[1]));
const size = files.reduce(
  async (promise, path) => (await promise) + (await readFile(path)).byteLength,
  Promise.resolve(0),
);
console.log(
  `Built-output contracts passed: ${expectedIds.length} anchors, ${scenarios.length} fixtures, one canonical URL, ${files.length} files, ${await size} bytes`,
);
