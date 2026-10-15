import node from '@astrojs/node';
import { defineConfig } from 'astro/config';
import { siteConfig } from './src/lib/site-config.mjs';
import { sourceCommit } from './src/lib/build-provenance.mjs';
try {
  process.loadEnvFile();
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const config = siteConfig(process.env);
sourceCommit(process.env);
export default defineConfig({
  site: config.origin,
  output: 'static',
  adapter: node({ mode: 'standalone', staticHeaders: true }),
  session: false,
  integrations: [
    {
      name: 'html-alias-headers',
      hooks: {
        'astro:build:ssr': ({ manifest }) => {
          // The standalone adapter applies static headers only to matched routes,
          // not public-file aliases. Register the two generated HTML aliases.
          for (const [alias, original] of [
            ['/index.html', '/'],
            ['/404.html', '/404'],
          ]) {
            const route = manifest.routes.find(({ routeData }) => routeData.route === original);
            if (!route) throw new Error(`Missing prerendered route: ${original}`);
            manifest.assets = manifest.assets.filter((path) => path !== alias);
            route.routeData.pattern = `^(?:${original === '/' ? '/' : '/404/?'}|${alias.replaceAll('.', '\\.')})$`;
          }
          // The review pages are directory-format files too: give their /index.html
          // aliases the same header-bearing routes as the guide.
          for (const [original, pattern] of [
            ['/reviews', '^\\/reviews(?:\\/(?:index\\.html)?)?$'],
            ['/reviews/[slug]', '^\\/reviews\\/([^/]+?)(?:\\/(?:index\\.html)?)?$'],
          ]) {
            const route = manifest.routes.find(({ routeData }) => routeData.route === original);
            if (!route) throw new Error(`Missing prerendered route: ${original}`);
            route.routeData.pattern = pattern;
          }
          manifest.assets = manifest.assets.filter(
            (path) => !/^\/reviews(?:\/[^/]+)?\/index\.html$/.test(path),
          );
        },
      },
    },
  ],
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
