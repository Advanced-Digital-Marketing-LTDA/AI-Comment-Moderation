> Current stack (8 October 2026): standalone Astro/Node on port 8080, with prerendered content in dist/client and runtime /healthz. The nginx references and older results below describe historical verification only. Current commands and hosting contracts are in docs/coolify.md, docs/routes.md and README.md. New verification is recorded in docs/verification.md.

# AICommentModeration.com

A one-page English-language guide to choosing an AI-assisted comment moderation workflow. Built with static Astro HTML and small local interactions. It contains ten fictional scenarios, a workflow chooser, a review checklist, current YouTube native options and a disclosed Moderaty product section.

## Preparation status (6 October 2026)

The published baseline [702b2908](https://github.com/Bonobo791/AI-Comment-Moderation/commit/702b2908800be6cce2d58a610195b2bfe334e38a) passed [PR CI run 37539175975](https://github.com/Bonobo791/AI-Comment-Moderation/actions/runs/37539175975): 40 deterministic/property tests, 4 compiled-DOM tests, 9 Chromium/axe tests and real isolated Docker/Nginx/health/HTTP checks. [PR #1](https://github.com/Bonobo791/AI-Comment-Moderation/pull/1) is open and ready for review. This local alignment did not change that status.

The website has not been deployed. Actual pinned template structures and the strict shared property-options helper are now adopted in the local build/template-alignment checkout; exact source/blob/file mapping is in docs/template-provenance.md. Final local checks passed: clean install (612 packages), Astro 13 files with no diagnostics, lint/format, 90/90 ordinary tests including four properties, both deliberate faults, build (13 files/133500 bytes) and 4/4 DOM tests. Focused 1000-run properties passed 4/4 at 23:26 UTC. Source publication/exact-head CI remain distinct from the baseline; at the verified 23:24 UTC checkpoint this alignment was uncommitted and unpublished. Add subsequent approved publication/check results as a dated record. Manual screenshots/200% zoom/assistive technology, original-source public license/legal operator/contact, actual Coolify/proxy/TLS/DNS/served identity/logging/recovery and release authority remain pending. Original source remains UNLICENSED; adopted upstream portions retain their scoped MIT notice.

## Run locally

Use Node 24.19.0 and npm 11.9.0. No account or provider credentials are required.

Astro commands use a Node launcher instead of shell-specific environment assignments. The launcher disables tooling telemetry, preserves literal arguments and stops the build pipeline on failure or interruption. Linux subprocess checks pass; an actual Windows runtime has not been tested.

```sh
npm ci
npm run check
npm run lint
npm run format:check
npm test
npm run test:fault
npm run build
npm run test:dom
npm run preview
```

The ordinary `npm test` suite includes deterministic tests and four real fast-check properties. `test:dom` checks the compiled browser scripts against a DOM implementation and creates a self-contained preview at `deliverables/AICommentModeration-preview.html`. Open that HTML file in a browser to inspect the unpublished guide without a server. It includes all styles/scripts and remains noindex.

For real browser checks, install Playwright's Chromium or use an existing Chromium. This example uses a POSIX shell:

```sh
npx playwright install chromium
CHROMIUM_PATH=/path/to/chromium npm run test:e2e
```

In Windows PowerShell, set `$env:CHROMIUM_PATH = 'C:\path\to\chrome.exe'`, then run `npm run test:e2e`.

The Playwright suite targets the built preview at port 4531. It covers interaction, routing, no-JS, responsive widths and axe checks. A suitable execution environment must permit the server/browser. Do not reinterpret a launch failure as a passed test.

## Coolify

The repository includes a multi-stage Dockerfile for Coolify's Dockerfile build pack. The standalone Astro Node adapter runs as a nonroot user on internal port 8080. CI checks container health, source/artifact identity, genuine 404 responses and security headers. See `docs/coolify.md` for settings and smoke commands. No Coolify resource or deployment was created.

## Build behavior

`npm run build` creates a noindex preview in `dist/`. `SITE_URL` defaults to the intended apex only for preview. For a separately authorized release artifact, `SITE_URL=https://aicommentmoderation.com SITE_COMMIT=$(git rev-parse HEAD) npm run build:release` in a POSIX shell requires explicit exact-host and full source-SHA configuration and emits indexable HTML. Use a reviewed clean source commit for an approved release; a marker supplied from HEAD does not prove an uncommitted tree equals that commit. In Windows PowerShell, set `$env:SITE_URL = 'https://aicommentmoderation.com'` and `$env:SITE_COMMIT = (git rev-parse HEAD)`, then run `npm run build:release`. That command does not authorize deployment; see `docs/release-runbook.md`.

The standalone Node server adapter is selected. No CMS generation, database, account, form, analytics, cookies, OAuth or model API is selected. The explorer computes fixed fictional decisions locally. All ten cases and both mode explanations are in HTML. Checklist state lasts only in the tab. The guide sends no runtime third-party requests.

## Project files

- `src/pages/index.astro`: one guide with stable S01–S11 anchors
- `src/data/scenarios.mjs`: versioned fictional fixtures
- `src/lib/scenario-rules.mjs`: deterministic preset and workflow rules
- `src/lib/site-config.mjs`: exact-origin, canonical and external-link policy
- `tests/fixture-policy.mjs`: independent literal 10×2 outcome oracle
- `scripts/check-output.mjs`: built HTML/asset/canonical/privacy contracts
- `scripts/verify-fault.mjs`: two deliberately wrong disposable copies that must fail
- `src/lib/build-provenance.mjs`: strict safe source marker and independent file-digest verification
- `tests/helpers/property-options.mjs`: actual pinned upstream strict control helper
- `docs/template-provenance.md`: exact upstream pin/blob/adopted-file map
- `docs/bootstrap.md`: observed requirement status and command results
- `docs/content-evidence.md`: content sources and limits

Original CSS, workflow illustration, icon and social SVG/PNG were authored for this project. No platform logos, user comments, customer data, copied testimonials or external fonts are used. The bootstrap reference is [Site-Bootstrap-ADM at 916df29d](https://github.com/Bonobo791/Site-Bootstrap-ADM/commit/916df29d7410b4a9a5048ed69819b5da448a2ecf); its actual document templates and strict property-options asset are now instantiated/adopted locally. Original application/content/assets are preserved; no Lippincott application code or clone ancestry is claimed. The scoped MIT notice is in THIRD_PARTY_NOTICES.md.

## Public marker and browser evidence

Build generation writes /build.json with schemaVersion 1, commit (full lower-case SHA or explicit null for an unidentified preview), release boolean and a SHA-256 map of relative public output paths. It excludes itself and healthz.txt. Preview may omit/empty SITE_COMMIT; release requires a valid full SHA. Invalid nonempty values fail. Nginx serves the marker noindex/no-store; the isolated smoke verifier compares expected source SHA and actual root/asset bytes. No public marker field contains secrets, timestamps, account metadata or build-system paths. Health is static availability only.

CI source/container jobs use the exact checked-out source SHA. New bounded browser diagnostics/screenshots retain only test-results/, playwright-report/ and explicit evidence/desktop.png and evidence/mobile.png for 7 days, excluding hidden files. At preparation, current screenshots/manual inspection and the alignment workflow runtime remained pending; local CI-policy and artifact-path negative regressions passed. Actual scoped Stryker T06 evidence is recorded: 154/156 killed with two equivalent survivors; reported property credit/coverage limits are explicit in docs/verification.md.

## Current CI/UI policy additions

yaml@2.9.1 is an explicit dev-only parser for structured CI-policy validation; it matches the version already pinned transitively. It adds no runtime website dependency or external integration. The new CI guard checks approved SHA-pinned actions/options, permitted push/pull-request verification triggers and bounded explicit synthetic artifact paths with hidden files disabled. Its negative cases include a build-push-action mutation, preventing registry publication from being inferred safe merely because the workflow text lacks a docker push command. Final source/normal-suite validation passed, including the structured CI-policy negative cases; the changed workflow itself remained unrun at preparation.

The implemented real Playwright print-color test takes the browser suite from the baseline 9 to 10 tests. It has not run for this alignment; the successful baseline remains 9 tests. Current fixes include readable dark print overrides, menu accessible names containing visible Menu, parsed root-relative fragments/resources, exact release robots metadata, force-noindex offline preview packaging and a Playwright-managed browser default when CHROMIUM_PATH is unset. Final local source/build/DOM tests passed; browser/container/exact-head workflow, manual and public-host gates remain separate.
