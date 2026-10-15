import { siteConfig } from '../lib/site-config.mjs';
const config = siteConfig(process.env);
export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${config.origin}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
