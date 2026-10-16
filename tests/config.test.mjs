import test from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig, canonical, allowedExternalUrl } from '../src/lib/site-config.mjs';

test('preview defaults are safe and release requires explicit intended origin', () => {
  assert.deepEqual(siteConfig({}), { origin: 'https://aicommentmoderation.com', release: false });
  assert.throws(() => siteConfig({ SITE_RELEASE: 'true' }), /SITE_URL/);
  assert.deepEqual(
    siteConfig({ SITE_URL: 'https://aicommentmoderation.com/', SITE_RELEASE: 'true' }),
    { origin: 'https://aicommentmoderation.com', release: true },
  );
});
test('release origin rejects corrected-away, copied, preview and lookalike hosts', () => {
  for (const origin of [
    'https://aicommentmoderation.net',
    'https://youtubeaimoderation.com',
    'http://aicommentmoderation.com',
    'https://www.aicommentmoderation.com',
    'http://localhost:8080',
    'https://preview.aicommentmoderation.com',
    'https://aicommentmoderation.com.evil.invalid',
    'https://aicommentmoderation.com:444',
    'https://aicommentmoderation.com:443',
    'https://AICOMMENTMODERATION.COM',
    ' https://aicommentmoderation.com ',
    'https://aicommentmoderation.com?',
    'https://aicommentmoderation.com#',
    'https://aicommentmoderation.com/?x=1',
    'https://user:pass@aicommentmoderation.com',
    'https://aicommentmoderation.com/other',
    'not-a-url',
  ]) {
    assert.throws(() => siteConfig({ SITE_URL: origin, SITE_RELEASE: 'true' }), /origin/);
  }
});
test('malformed origins receive a parsing diagnostic before valid-but-unapproved origin checks', () => {
  assert.throws(() => siteConfig({ SITE_URL: 'not-a-url' }), {
    name: 'Error',
    message: 'Invalid site origin',
  });
  assert.throws(() => siteConfig({ SITE_URL: 'https://example.invalid' }), {
    name: 'Error',
    message: 'Invalid site origin: use the exact approved HTTPS apex',
  });
});
test('release flag accepts only explicit true or false', () => {
  assert.deepEqual(siteConfig({ SITE_RELEASE: 'false' }), {
    origin: 'https://aicommentmoderation.com',
    release: false,
  });
  for (const value of ['', 'yes', 'TRUE', '1', ' true '])
    assert.throws(() => siteConfig({ SITE_RELEASE: value }), /SITE_RELEASE/);
});
test('canonical defaults, directory slashes and file extensions preserve the approved origin', () => {
  assert.equal(canonical(), 'https://aicommentmoderation.com/');
  assert.equal(canonical('/guide/'), 'https://aicommentmoderation.com/guide/');
  assert.equal(
    canonical('/guide.html?private=true#section'),
    'https://aicommentmoderation.com/guide.html',
  );
  assert.equal(canonical('/GUIDE.HTML'), 'https://aicommentmoderation.com/GUIDE.HTML');
  assert.equal(canonical('/release.2026'), 'https://aicommentmoderation.com/release.2026');
  assert.equal(canonical('/folder.name-'), 'https://aicommentmoderation.com/folder.name-/');
  assert.throws(() => canonical('/', 'https://example.invalid'), /origin/);
});
test('canonical normalizes an approved origin with a trailing slash before joining paths', () => {
  assert.equal(
    canonical('/guide', 'https://aicommentmoderation.com/'),
    'https://aicommentmoderation.com/guide/',
  );
  assert.equal(
    canonical('/', 'https://aicommentmoderation.com/'),
    'https://aicommentmoderation.com/',
  );
});
test('canonical strips queries and fragments without switching hosts', () => {
  assert.equal(
    canonical('/?utm_source=anything#try-the-examples'),
    'https://aicommentmoderation.com/',
  );
  assert.equal(
    canonical('/guide?email=sensitive#source'),
    'https://aicommentmoderation.com/guide/',
  );
  for (const path of ['//evil.invalid', 'https://evil.invalid', '/\\evil.invalid'])
    assert.throws(() => canonical(path), /path/);
});
test('external links are HTTPS and exact-host allowlisted', () => {
  assert.equal(allowedExternalUrl('https://moderaty.com/pricing'), true);
  assert.equal(allowedExternalUrl('https://www.drupal.org/project/ai_comment_moderation'), true);
  for (const url of [
    'not a URL',
    'javascript:alert(1)',
    'https://moderaty.com.evil.invalid',
    'http://moderaty.com',
    'https://a:b@moderaty.com',
    'https://:secret@moderaty.com',
    'https://moderaty.com:444',
    'https://example.invalid',
  ])
    assert.equal(allowedExternalUrl(url), false);
});
test('every approved editorial destination remains available through its exact HTTPS host', () => {
  for (const host of [
    'moderaty.com',
    'github.com',
    'support.google.com',
    'developers.google.com',
    'developers.openai.com',
    'www.superpower.social',
    'www.komento.ai',
    'moderationapi.com',
    'www.drupal.org',
    'reviewnexa.com',
    'www.spikerz.com',
    'replient.ai',
    'respondology.com',
    'beyondcomments.io',
    'napoleoncat.com',
    'meetalto.ai',
  ]) {
    assert.equal(allowedExternalUrl(`https://${host}/guide?q=reference#source`), true, host);
    assert.equal(allowedExternalUrl(`https://${host}.evil.invalid/`), false, host);
  }
});
