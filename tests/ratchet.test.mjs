import test from 'node:test';
import assert from 'node:assert/strict';
import { countMatches, ratchets, regressions } from '../scripts/ratchet.mjs';

test('countMatches counts each named pattern', () => {
  const counts = countMatches('a // @ts-ignore\nb // @ts-expect-error', ratchets.suppress.patterns);
  assert.equal(counts.tsSuppress, 2);
  assert.equal(counts.lintDisable, 0);
});
test('the type ratchet counts any in annotations, aliases and later generic arguments', () => {
  const source =
    'let a: any;\ntype Alias = any;\nconst m: Map<string, any> = x as any;\n// any thing';
  assert.equal(countMatches(source, ratchets.type.patterns).anyType, 4);
});
test('the test ratchet does not count blank lines as indentation', () => {
  const counts = countMatches("\n\n\n  test('a', () => {});", ratchets.test.patterns);
  assert.equal(counts.tests, 1);
});
test('a floor ratchet fails when a count drops and passes when it holds or grows', () => {
  assert.deepEqual(regressions('floor', { tests: 5 }, { tests: 5 }), []);
  assert.deepEqual(regressions('floor', { tests: 5 }, { tests: 6 }), []);
  assert.match(regressions('floor', { tests: 5 }, { tests: 4 })[0], /must not go down/);
});
test('a ceiling ratchet fails when a count rises and passes when it holds or shrinks', () => {
  assert.deepEqual(regressions('ceiling', { anyType: 1 }, { anyType: 1 }), []);
  assert.deepEqual(regressions('ceiling', { anyType: 1 }, { anyType: 0 }), []);
  assert.match(regressions('ceiling', { anyType: 1 }, { anyType: 2 })[0], /must not go up/);
});
test('a missing baseline is a failure, not a silent pass', () => {
  assert.match(regressions('ceiling', undefined, { anyType: 0 })[0], /no baseline/);
});
