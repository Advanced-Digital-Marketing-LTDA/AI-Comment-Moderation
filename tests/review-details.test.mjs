import test from 'node:test';
import assert from 'node:assert/strict';
import { reviews, reviewedOn } from '../src/data/reviews.mjs';
import { reviewDetails, reviewedIso } from '../src/data/review-details.mjs';

const words = (text) => text.trim().split(/\s+/).length;

test('review details cover exactly the reviewed tools', () => {
  assert.deepEqual(Object.keys(reviewDetails).sort(), reviews.map((review) => review.slug).sort());
});

test('review details are complete and verdicts stay 40 to 60 words', () => {
  for (const review of reviews) {
    const details = reviewDetails[review.slug];
    const count = words(details.verdict);
    assert.ok(count >= 40 && count <= 60, `${review.slug}: verdict has ${count} words`);
    assert.ok(details.skipIf.trim(), `${review.slug}: skipIf`);
    for (const field of ['plans', 'features', 'notCovered'])
      assert.ok(details[field].length > 0, `${review.slug}: ${field}`);
    for (const plan of details.plans)
      assert.ok(
        plan.name.trim() && plan.price.trim() && plan.detail.trim(),
        `${review.slug}: plan`,
      );
  }
});

test('alternatives are two or three other reviews', () => {
  const slugs = new Set(reviews.map((review) => review.slug));
  for (const [slug, details] of Object.entries(reviewDetails)) {
    assert.ok(details.alternatives.length >= 2 && details.alternatives.length <= 3, slug);
    assert.equal(new Set(details.alternatives).size, details.alternatives.length, slug);
    for (const alternative of details.alternatives) {
      assert.ok(slugs.has(alternative), `${slug}: ${alternative}`);
      assert.notEqual(alternative, slug);
    }
  }
});

test('the machine-readable review date matches the displayed date', () => {
  const shown = new Date(`${reviewedOn} UTC`).toISOString().slice(0, 10);
  assert.equal(reviewedIso, shown);
});

test('unconfirmed tools state that in their verdict and plans', () => {
  for (const slug of ['conversario', 'commentmod']) {
    assert.match(reviewDetails[slug].plans[0].price, /not confirmed/i, slug);
    assert.match(reviewDetails[slug].verdict, /could not confirm/i, slug);
  }
});
