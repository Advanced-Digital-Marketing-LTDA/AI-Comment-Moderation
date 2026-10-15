import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const baselinePath = join(root, '.github/ratchet/baseline.json');
const scanned = ['src', 'scripts', 'tests'];
const skippedDirs = new Set(['node_modules', 'dist', '.astro']);
const skippedFiles = new Set(['scripts/ratchet.mjs', 'tests/ratchet.test.mjs']);
const sourceFile = /\.(?:mjs|js|ts|astro)$/;

// Each ratchet counts matches; direction says which way a change is a regression.
export const ratchets = {
  test: {
    direction: 'floor',
    patterns: {
      tests: /^\s*(?:test|it)(?:\.\w+)?\(/gm,
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
      skippedTests: /\b(?:test|it|describe)\.(?:skip|todo)\(/g,
      focusedTests: /\b(?:test|it|describe)\.only\(/g,
    },
    files: () => true,
  },
  type: {
    direction: 'ceiling',
    patterns: { anyType: /(?::|\bas|<)\s*any\b/g, doubleCast: /\bas\s+unknown\s+as\b/g },
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
  return Object.keys(current).flatMap((name) => {
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
      const counts = countMatches(await readFile(join(root, path), 'utf8'), patterns);
      for (const key of Object.keys(totals)) totals[key] += counts[key];
    }
  }
  return totals;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [name, flag] = process.argv.slice(2);
  if (!ratchets[name] || (flag && flag !== '--update')) {
    console.error('Usage: node scripts/ratchet.mjs <test|suppress|type> [--update]');
    process.exit(2);
  }
  const current = await measure(name);
  const stored = JSON.parse(await readFile(baselinePath, 'utf8').catch(() => '{}'));
  if (flag === '--update') {
    stored[name] = current;
    await writeFile(baselinePath, `${JSON.stringify(stored, null, 2)}\n`);
    console.log(`${name} ratchet baseline written:`, current);
  } else {
    const failures = regressions(ratchets[name].direction, stored[name], current);
    if (failures.length) {
      console.error(`${name} ratchet failed:\n  ${failures.join('\n  ')}`);
      process.exit(1);
    }
    console.log(`${name} ratchet passed:`, current);
  }
}
