import test from 'node:test';
import assert from 'node:assert/strict';
import { reviews, reviewBySlug, reviewMethod } from '../src/data/reviews.mjs';
import { questions } from '../src/content/page.mjs';
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

test('review copy avoids ownership claims and discloses its lack of hands-on testing', () => {
  const text = JSON.stringify([reviews, reviewMethod]);
  assert.ok(!/(owner|team behind|my own product)/i.test(text));
  const noHandsOnDisclosure =
    /\b(?:did not|didn't|never|not)\s+(?:personally\s+)?(?:test|run|ran|use|operate)\w*\b(?=[^.!?]*\btools?\b)(?=[^.!?]*\breal channel\b)[^.!?]*/i;
  assert.ok(
    noHandsOnDisclosure.test(reviewMethod.join(' ')),
    'review method should disclose no hands-on testing of tools on a real channel',
  );
});

test('YouTube support status and feature limits stay qualified where primary evidence is missing', () => {
  for (const slug of ['conversario', 'commentmod']) {
    const review = reviewBySlug(slug);
    assert.match(review.youtube, /unconfirmed/i, slug);
    assert.doesNotMatch(review.youtube, /^\s*yes\b/i, slug);
  }

  const bodyguard = reviewBySlug('bodyguard-ai');
  assert.match(bodyguard.youtube, /organic YouTube Live posts/i);
  assert.match(bodyguard.youtube, /live chat is not documented/i);
  assert.match(bodyguard.limits.join(' '), /cannot be restored/i);
});

test('CommentShark and Spikerz descriptions expose their YouTube scan delays', () => {
  const commentshark = reviewBySlug('commentshark');
  const commentsharkText = [
    commentshark.youtube,
    commentshark.approach,
    ...commentshark.limits,
  ].join(' ');
  assert.match(commentsharkText, /30 minutes/i);
  assert.match(commentsharkText, /2 hours/i);
  assert.match(commentsharkText, /after.*sync/i);
  assert.match(
    commentshark.limits.join(' '),
    /paid plans.{0,80}30 minutes.{0,80}Free.{0,40}2 hours/i,
  );

  const spikerz = reviewBySlug('spikerz');
  const spikerzText = [spikerz.tagline, spikerz.youtube, spikerz.approach, spikerz.caveat].join(
    ' ',
  );
  assert.match(spikerzText, /1\.5 hours/i);
  assert.match(spikerzText, /not confirm real-time YouTube moderation/i);
  assert.match(spikerzText, /25\+ language support for YouTube/i);
});

test('live-chat FAQ keeps product scope and links to YouTube’s live-chat guidance', () => {
  const question = questions.find(
    (item) => item.question === 'Which platforms does Moderaty support?',
  );
  assert.ok(question);
  assert.match(question.answer, /top-level YouTube comments/i);
  assert.match(question.answer, /YouTube live chat/i);
  assert.equal(question.relatedSource, 'https://support.google.com/youtube/answer/9826490?hl=en');
  assert.equal(allowedExternalUrl(question.relatedSource), true);
});
