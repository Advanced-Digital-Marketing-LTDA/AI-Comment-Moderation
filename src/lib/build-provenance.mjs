import { createHash } from 'node:crypto';
import { siteConfig } from './site-config.mjs';

/** @typedef {{SITE_URL?: string, SITE_COMMIT?: string}} BuildEnvironment */
/** @typedef {{schemaVersion: number, commit: string|null, files: Record<string, string>}} BuildIdentity */

/** @param {unknown} path */
const validPath = (path) =>
  typeof path === 'string' &&
  !path.includes('\\') &&
  path.split('/').every((part) => part && !part.startsWith('.')) &&
  !['build.json', 'healthz.txt'].includes(path);

/** Return validated public source identity; unidentified development previews use null.
 * @param {BuildEnvironment} env
 */
export function sourceCommit(env = {}) {
  siteConfig(env);
  const commit = env.SITE_COMMIT;
  if (commit === undefined || commit === '') return null;
  if (typeof commit !== 'string' || commit.length !== 40 || !/^[a-f0-9]{40}$/.test(commit))
    throw new Error('SITE_COMMIT must be an exact lowercase 40-character source SHA');
  return commit;
}

/** Hash the actual public output without including secrets or a recursive self-hash.
 * @param {Array<[string, import('node:crypto').BinaryLike]>} entries
 * @param {BuildEnvironment} env
 * @returns {BuildIdentity}
 */
export function buildMarker(entries, env = {}) {
  const commit = sourceCommit(env);
  const paths = new Set();
  const hashes = [...entries]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, content]) => {
      if (!validPath(path) || paths.has(path))
        throw new Error('Invalid or duplicate public artifact path');
      paths.add(path);
      return [path, createHash('sha256').update(content).digest('hex')];
    });
  return { schemaVersion: 1, commit, files: Object.fromEntries(hashes) };
}

/** Validate an untrusted served marker before using its identity or file hashes.
 * @param {unknown} input
 * @param {string|undefined} expectedCommit
 * @returns {asserts input is BuildIdentity}
 */
export function verifyBuildMarker(input, expectedCommit) {
  const marker = /** @type {Partial<BuildIdentity>|null|undefined} */ (input);
  if (
    !marker ||
    marker.schemaVersion !== 1 ||
    (marker.commit !== null &&
      (typeof marker.commit !== 'string' ||
        marker.commit.length !== 40 ||
        !/^[a-f0-9]{40}$/.test(marker.commit))) ||
    !marker.files ||
    typeof marker.files !== 'object' ||
    Array.isArray(marker.files) ||
    !Object.hasOwn(marker.files, 'index.html') ||
    Object.entries(marker.files).some(
      ([path, digest]) =>
        !validPath(path) ||
        typeof digest !== 'string' ||
        digest.length !== 64 ||
        !/^[a-f0-9]{64}$/.test(digest),
    )
  )
    throw new Error('Invalid served build marker');
  if (expectedCommit !== undefined && marker.commit !== expectedCommit)
    throw new Error('Served source identity does not match the expected SHA');
}

/** Reject stale or transformed response bytes even when a health probe succeeds.
 * @param {BuildIdentity} marker
 * @param {string} path
 * @param {import('node:crypto').BinaryLike} content
 */
export function verifyArtifact(marker, path, content) {
  if (marker.files[path] !== createHash('sha256').update(content).digest('hex'))
    throw new Error('Served artifact bytes do not match the build marker');
}
