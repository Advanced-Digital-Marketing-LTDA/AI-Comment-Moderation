import test from 'node:test';
import assert from 'node:assert/strict';
import { reviews, reviewBySlug, reviewMethod } from '../src/data/reviews.mjs';
import { allowedExternalUrl } from '../src/lib/site-config.mjs';

test('review slugs are unique, URL-safe and resolvable', () => {
  const slugs = reviews.map((review) => review.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const review of reviews) {
    assert.match(review.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(reviewBySlug(review.slug), review);
  }
  assert.equal(reviewBySlug('missing'), undefined);
});

test('the hub covers the ten tools, including CommentMod', () => {
  assert.equal(reviews.length, 10);
  assert.ok(reviews.some((review) => review.slug === 'commentmod'));
});

test('every review has the fields its page renders', () => {
  for (const review of reviews) {
    for (const field of ['name', 'tagline', 'youtube', 'approach', 'pricing', 'bestFor'])
      assert.ok(review[field]?.trim(), `${review.slug}: ${field}`);
    assert.ok(review.limits.length > 0, `${review.slug}: limits`);
    assert.ok(review.sources.length > 0, `${review.slug}: sources`);
  }
});

test('every cited source is an allowlisted HTTPS destination with a date', () => {
  for (const review of reviews)
    for (const source of review.sources) {
      assert.equal(allowedExternalUrl(source.url), true, `${review.slug}: ${source.url}`);
      assert.ok(source.label.trim() && source.date.trim(), `${review.slug}: ${source.label}`);
    }
});

test('review copy never states who owns the site and claims no hands-on testing', () => {
  const text = JSON.stringify([reviews, reviewMethod]);
  assert.ok(!/(owner|team behind|my own product)/i.test(text));
  assert.ok(reviewMethod.some((line) => line.includes('did not run any of these tools')));
});
