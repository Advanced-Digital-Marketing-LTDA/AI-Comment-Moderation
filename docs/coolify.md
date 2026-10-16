# Standalone Astro on Coolify

Use the Dockerfile build pack. Astro 7.3.6 and @astrojs/node 11.1.6 prerender content into dist/client and build dist/server/entry.mjs. The final Node 24.19.0 image runs as node. Production dependencies stay in the image; development tooling is pruned. There is no nginx, CMS, database or persistent content volume.

| Setting            | Value                                                    |
| ------------------ | -------------------------------------------------------- |
| Repository         | Bonobo791/AI-Comment-Moderation                          |
| Source             | Selected reviewed branch/commit                          |
| Build pack         | Dockerfile                                               |
| Base directory     | /                                                        |
| Dockerfile         | /Dockerfile                                              |
| Exposed port       | 8080                                                     |
| Runtime HOST       | 0.0.0.0                                                  |
| Runtime PORT       | 8080                                                     |
| Build SITE_URL     | https://aicommentmoderation.com                          |
| Build SITE_RELEASE | false for preview, true for an approved release          |
| Build SITE_COMMIT  | Selected full lowercase source SHA; required for release |

The image starts with `node ./dist/server/entry.mjs`. Its health check uses Node fetch against /healthz. A successful health response proves the Node server is responding; compare /build.json with the selected source and public file bytes separately. Runtime settings do not rebuild canonical URLs or indexing metadata.

For a local preview container:

```sh
(
set -eu
test -z "$(git status --porcelain)" || { echo 'Commit or discard local changes before identifying this preview as HEAD.' >&2; exit 1; }
docker build --build-arg SITE_URL=https://aicommentmoderation.com --build-arg SITE_RELEASE=false --build-arg SITE_COMMIT="$(git rev-parse HEAD)" -t aicommentmoderation:preview .
preview_container=$(docker run -d --name aicm-preview -p 127.0.0.1:8080:8080 aicommentmoderation:preview)
trap 'docker rm -f "$preview_container" >/dev/null 2>&1 || true' EXIT
attempt=0
until [ "$(docker inspect --format '{{.State.Health.Status}}' "$preview_container")" = healthy ]; do
  attempt=$((attempt + 1))
  [ "$attempt" -lt 30 ] || { docker logs "$preview_container"; exit 1; }
  sleep 1
done
node scripts/smoke-host.mjs http://127.0.0.1:8080 "$(git rev-parse HEAD)"
)
```

The root page uses artifact-specific CSP hashes and security headers through the adapter's static header registry. The /index.html and /404.html aliases receive the same HTTP frame protection and also carry CSP meta policies; crawler and media files use native adapter headers. Runtime errors, health and the build marker use Astro routes and middleware. Fingerprinted assets use immutable caching; public media uses adapter defaults. /404.html is a readable noindex error template (200); unknown URLs return a genuine 404. /healthz.txt no longer exists. Headers are stored outside the public client directory.

Configure the existing Coolify proxy to forward to port 8080 when deploying this branch. Deployment, DNS, TLS, domain ownership, proxy behavior and public release still require their own operator checks. This change does not modify a running Coolify application.
