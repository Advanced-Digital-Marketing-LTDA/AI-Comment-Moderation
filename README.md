# AI-Comment-Moderation

AI Comment Moderation website.

Source for [AICommentModeration.com](https://aicommentmoderation.com), an English-language guide to choosing an AI-assisted comment moderation workflow. Astro prerenders the guide; a standalone Node server serves it with local browser interactions.

## How it works

Readers can select one of ten fictional comments and compare cautious and stricter review policies. The explorer displays predefined decisions, reasons and missing context using local rules. Its label, "Illustrative rules, not a live AI prediction," describes the behavior: it does not run an AI model or moderate a real comment.

The workflow chooser covers YouTube, social platforms, websites/CMSs and API-based workflows. The site presents my reviews of AI comment moderation tools; its Moderaty section covers top-level YouTube comments only. The six-item checklist keeps state in the current tab without writing browser storage. All ten examples and both policy explanations remain readable when JavaScript is unavailable.

## What's included

- One responsive guide with section navigation, FAQs, sources and ownership/privacy information
- Fictional examples, the workflow chooser, review checklist and print styles
- Canonical metadata, robots.txt, a single-URL sitemap, social assets and a real 404 page
- A Dockerfile and nonroot standalone Astro/Node server with security headers, a health check and an artifact identity marker
- Unit tests, fast-check properties, deliberate-fault checks, compiled-DOM tests, Playwright/axe browser checks and container CI
- Development, hosting, release, data-lifecycle and template-provenance documentation in [docs/](docs/)

There is no CMS, account system, contact form, database, analytics collector, model API or platform connection. No provider credentials are required. The guide makes no moderation-accuracy or ranking guarantee.

## Stack and project files

Use Node **24.19.0** and npm **11.9.0**, as pinned in [.node-version](.node-version) and [package.json](package.json). Astro **7.3.6** and @astrojs/node **11.1.6** build prerendered content in `dist/client/` and a standalone server in `dist/server/`. The final Node container runs as the node user on port **4321**. Both stages use the same digest-pinned Node image.

| File                                                              | Purpose                                             |
| ----------------------------------------------------------------- | --------------------------------------------------- |
| [src/pages/index.astro](src/pages/index.astro)                    | Guide content and checklist interaction             |
| [src/data/scenarios.mjs](src/data/scenarios.mjs)                  | Ten fictional fixtures and policy explanations      |
| [src/lib/scenario-rules.mjs](src/lib/scenario-rules.mjs)          | Preset decisions and workflow choices               |
| [src/lib/site-config.mjs](src/lib/site-config.mjs)                | Approved origin, indexing mode and canonical policy |
| [src/lib/build-provenance.mjs](src/lib/build-provenance.mjs)      | Source SHA and public-file digest validation        |
| [Dockerfile](Dockerfile) and [astro.config.mjs](astro.config.mjs) | Standalone Node build and HTTP behavior             |
| [.github/workflows/checks.yml](.github/workflows/checks.yml)      | Source, browser and isolated-container verification |

The foundation document templates and strict property-test helper come from a pinned Site-Bootstrap-ADM revision. See [template provenance](docs/template-provenance.md) and [third-party notices](THIRD_PARTY_NOTICES.md). Original guide source remains UNLICENSED; the adopted upstream portions retain their scoped MIT notice.

## Run locally

With the pinned Node and npm versions installed:

```sh
git clone https://github.com/Bonobo791/AI-Comment-Moderation.git
cd AI-Comment-Moderation
npm ci
npm run dev -- --port 4321
```

Open http://127.0.0.1:4321. Stop the development server before running the checks below.

```sh
npm run check
npm run lint
npm run format:check
npm test
npm run test:fault
npm run build
npm run test:dom
HOST=127.0.0.1 PORT=4531 npm start
```

Run `npm start` from the repository root to start the production server (port 4321 by default). The command above selects loopback port 4531; in PowerShell set `$env:HOST` and `$env:PORT` before `npm start`. Open http://127.0.0.1:4531 to inspect it. The DOM command also creates deliverables/AICommentModeration-preview.html, a standalone noindex preview you can open without a server.

For browser checks, stop the running server, install Playwright's browser and let the test runner start its own preview:

```sh
npx playwright install chromium
npm run test:e2e
```

CHROMIUM_PATH is an optional executable override. The default uses Playwright's installed Chromium. Linux environments that lack browser libraries can use `npx playwright install --with-deps chromium` when system-package installation is permitted. [Development details](docs/development.md) cover property replay and the other test commands.

## Preview and release builds

`npm run build` emits noindex HTML; robots.txt allows crawling and lists the sitemap. It still uses the intended canonical origin, https://aicommentmoderation.com/. SITE_RELEASE defaults to false. The selected public build settings are documented in [.env.example](.env.example); pass them through the process environment or Coolify build variables.

A release build requires the exact approved HTTPS origin and a lowercase 40-character source commit SHA. Start from a reviewed, clean checkout at the approved commit. This POSIX-shell command prepares indexable files and does not publish them:

```sh
SITE_URL=https://aicommentmoderation.com \
  SITE_COMMIT="$(git rev-parse HEAD)" npm run build:release
```

The release script supplies SITE_RELEASE=true to every build stage. A regular build can also prepare a release when all three settings are supplied explicitly. SITE_URL accepts only the intended apex origin, with an optional trailing slash; www, explicit ports, paths, queries and fragments are rejected. A missing or invalid release SHA fails the build.

Build generation writes `dist/build.json`; the runtime `/build.json` route serves it with the source SHA, release mode and SHA-256 digests of public output files. Unidentified previews use commit:null. The runtime route serves this marker with noindex/no-store. SITE_COMMIT is an identity assertion: the operator must compare it with the actual selected source and served artifact. [Release runbook](docs/release-runbook.md).

## Launch on Coolify

Use the repository's Dockerfile build pack. The image installs locked dependencies, runs source checks and builds Astro, then copies the built server, public files and production dependencies into Node. The runtime runs `node ./dist/server/entry.mjs` with `HOST=0.0.0.0` and `PORT=4321`. No secrets, database or persistent volume are needed. Configure these values for an authorized preview or release:

| Coolify setting                      | Value                                                           |
| ------------------------------------ | --------------------------------------------------------------- |
| Repository                           | https://github.com/Bonobo791/AI-Comment-Moderation              |
| Source                               | The reviewed branch/commit selected for this deployment         |
| Build pack / build strategy          | Dockerfile                                                      |
| Base Directory                       | /                                                               |
| Dockerfile Location                  | /Dockerfile                                                     |
| Ports Exposes                        | 4321                                                            |
| Build arguments                      | Managed manually in Dockerfile                                  |
| SITE_URL, as a build variable        | https://aicommentmoderation.com                                 |
| SITE_RELEASE, as a build variable    | false for preview; true for an approved public release          |
| SITE_COMMIT, as a build variable     | Full lowercase SHA of the selected source; required for release |
| Persistent storage / runtime secrets | None required                                                   |

Update SITE_COMMIT when selecting a new release commit. The image's HEALTHCHECK requests /healthz on internal port 4321 and expects ok. Coolify uses that image-owned check for a non-Compose Dockerfile application. It proves Node-server availability; artifact and UI checks are separate. The site requires an apex-root deployment and does not support a path prefix.

Before public launch, the owner/operator must confirm the source and release approval, domain/DNS ownership and routing, HTTPS certificate and redirects, preview protection, legal operator/contact/privacy details and host/proxy log retention. Configure the authorized server and domain, deploy the selected artifact, then verify the root page, local assets, real missing-page 404, /healthz, /build.json identity and indexable metadata/robots/sitemap. Complete manual keyboard, 200% zoom and screen-reader review, and retain a known-good artifact for rollback.

See [Coolify setup and isolated smoke commands](docs/coolify.md). The smoke helper targets a loopback **preview** container; it is not a public-release verifier. Current upstream references: [Dockerfile deployment](https://coolify.io/docs/applications/builds/dockerfile), [build variables](https://coolify.io/docs/applications/configuration/environment-variables) and [health checks](https://coolify.io/docs/applications/configuration/health-checks).

Preparing a build, pushing source or passing CI does not deploy the site or change DNS. [Verification records](docs/verification.md) distinguish tested source/container behavior from public-host and release evidence.
