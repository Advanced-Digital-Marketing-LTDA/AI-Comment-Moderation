export const PRODUCTION_ORIGIN = 'https://aicommentmoderation.com';
export const EXTERNAL_HOSTS = new Set([
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
  'help.spikerz.com',
  'help.bodyguard.ai',
  'replient.ai',
  'respondology.com',
  'beyondcomments.io',
  'napoleoncat.com',
  'meetalto.ai',
]);

/** @param {{ SITE_URL?: string }} env */
export function siteConfig(env = {}) {
  const candidate = env.SITE_URL ?? PRODUCTION_ORIGIN;
  let url;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error('Invalid site origin');
  }
  if (
    ![PRODUCTION_ORIGIN, `${PRODUCTION_ORIGIN}/`].includes(candidate) ||
    url.origin !== PRODUCTION_ORIGIN ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  )
    throw new Error('Invalid site origin: use the exact approved HTTPS apex');
  return { origin: PRODUCTION_ORIGIN };
}

/** @param {string} path @param {string} origin */
export function canonical(path = '/', origin = PRODUCTION_ORIGIN) {
  siteConfig({ SITE_URL: origin });
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\'))
    throw new Error('Invalid canonical path');
  const url = new URL(path, origin);
  let pathname = url.pathname;
  if (!pathname.endsWith('/') && !/\.[a-z0-9]+$/i.test(pathname)) pathname += '/';
  return `${url.origin}${pathname}`;
}

/** @param {string} value */
export function allowedExternalUrl(value) {
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      EXTERNAL_HOSTS.has(url.hostname) &&
      !url.username &&
      !url.password &&
      !url.port
    );
  } catch {
    return false;
  }
}
