import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const baselinePath = join(root, '.github/ratchet/baseline.json');
const scanned = ['src', 'scripts', 'tests'];
const skippedDirs = new Set(['node_modules', 'dist', '.astro']);
// The script holds the patterns as text. Its test file holds fixture literals, so only the
// test ratchet (which must see its tests, or deleting them would pass) includes it.
const skippedFiles = new Set(['scripts/ratchet.mjs']);
const fixtureFiles = new Set(['tests/ratchet.test.mjs']);
const sourceFile = /\.(?:mjs|js|ts|astro)$/;

// Each ratchet counts matches; direction says which way a change is a regression.
export const ratchets = {
  test: {
    direction: 'floor',
    patterns: {
      tests: /^[ \t]*(?:test|it)(?:\.\w+)?\(/gm,
      assertions: /\bassert(?:\.\w+)?\(|\bexpect\(/g,
    },
    files: (path) => path.startsWith('tests/'),
  },
  suppress: {
    direction: 'ceiling',
    patterns: {
      lintDisable: /eslint-disable/g,
      tsSuppress: /@ts-(?:ignore|expect-error|nocheck)/g,
      prettierIgnore: /prettier-ignore/g,
      skippedTests:
        /\b(?:test|it|describe)\.(?:skip|todo|fixme)\(|\b(?:skip|todo)\s*:\s*(?!false\b)\S/g,
      focusedTests: /\b(?:test|it|describe)\.only\(|\bonly\s*:\s*true\b/g,
    },
    files: () => true,
  },
  type: {
    direction: 'ceiling',
    patterns: {
      anyType: /(?:[:=,<|&]|\bas)\s*any\b(?!\s+\w)/g,
      doubleCast: /\bas\s+unknown\s+as\b/g,
    },
    files: (path) => /\.(?:ts|astro)$/.test(path),
  },
};

export function countMatches(source, patterns) {
  return Object.fromEntries(
    Object.entries(patterns).map(([name, pattern]) => [name, source.match(pattern)?.length ?? 0]),
  );
}

/** Return the regressions of `current` against `baseline` for one ratchet. */
export function regressions(direction, baseline, current) {
  return [...new Set([...Object.keys(baseline ?? {}), ...Object.keys(current)])].flatMap((name) => {
    if (!Number.isInteger(current[name])) return [`${name}: metric is no longer measured`];
    if (!Number.isInteger(baseline?.[name])) return [`${name}: no baseline recorded`];
    const bad =
      direction === 'floor' ? current[name] < baseline[name] : current[name] > baseline[name];
    return bad
      ? [
          `${name}: ${current[name]} (baseline ${baseline[name]}, must not go ${direction === 'floor' ? 'down' : 'up'})`,
        ]
      : [];
  });
}

async function* walk(dir) {
  for (const entry of await readdir(join(root, dir), { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!skippedDirs.has(entry.name)) yield* walk(path);
    } else if (sourceFile.test(entry.name) && !skippedFiles.has(path)) yield path;
  }
}

export async function measure(name) {
  const { patterns, files } = ratchets[name];
  const totals = Object.fromEntries(Object.keys(patterns).map((key) => [key, 0]));
  for (const dir of scanned) {
    for await (const path of walk(dir)) {
      if (!files(relative(root, join(root, path)))) continue;
      if (name !== 'test' && fixtureFiles.has(path)) continue;
      const counts = countMatches(await readFile(join(root, path), 'utf8'), patterns);
      for (const key of Object.keys(totals)) totals[key] += counts[key];
    }
  }
  return totals;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [name, ...rest] = process.argv.slice(2);
  const update = rest.includes('--update');
  const flagAt = rest.indexOf('--baseline');
  // --baseline compares against a baseline file from the PR's base branch, which a PR cannot edit.
  const comparePath = flagAt === -1 ? baselinePath : rest[flagAt + 1];
  const known = rest.filter(
    (arg, i) => arg === '--update' || arg === '--baseline' || (flagAt !== -1 && i === flagAt + 1),
  );
  if (!ratchets[name] || known.length !== rest.length || (flagAt !== -1 && !comparePath)) {
    console.error(
      'Usage: node scripts/ratchet.mjs <test|suppress|type> [--update] [--baseline <file>]',
    );
    process.exit(2);
  }
  const current = await measure(name);
  if (update) {
    const stored = JSON.parse(await readFile(baselinePath, 'utf8').catch(() => '{}'));
    stored[name] = current;
    await writeFile(baselinePath, `${JSON.stringify(stored, null, 2)}\n`);
    console.log(`${name} ratchet baseline written:`, current);
  } else {
    const stored = JSON.parse(await readFile(comparePath, 'utf8').catch(() => '{}'));
    const failures = regressions(ratchets[name].direction, stored[name], current);
    if (failures.length) {
      console.error(`${name} ratchet failed:\n  ${failures.join('\n  ')}`);
      process.exit(1);
    }
    console.log(`${name} ratchet passed:`, current);
  }
}
