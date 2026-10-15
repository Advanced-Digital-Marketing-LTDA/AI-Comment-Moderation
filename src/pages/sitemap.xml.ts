import { canonical } from '../lib/site-config.mjs';
import { reviews } from '../data/reviews.mjs';
export function GET() {
  const paths = ['/', '/reviews/', ...reviews.map((review) => `/reviews/${review.slug}/`)];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths
      .map((path) => `<url><loc>${canonical(path)}</loc></url>`)
      .join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
