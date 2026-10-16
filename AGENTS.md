# Repository guidance

This project is AICommentModeration.com's static guide. Follow docs/project-specification.md and preserve the owner's README.

## Scope and branches

The standalone Astro/Node stack is merged on main through PRs #1–3; current main head is 92c9ae1894775294057fd91da0d8efeb7567d2df. Branch new work from current main and preserve unrelated edits. Do not commit, push, merge, deploy, change DNS, create provider accounts or spend without the corresponding approval. Never force-push by default. Source publication, release and production changes each require their own dated authority.

## Before feature work

Use Site-Bootstrap-ADM when available. Content is prerendered by Astro and served by its standalone Node adapter on port 4321. Runtime routes provide /healthz, /build.json and a 404 fallback. Do not introduce nginx or TinaCMS. Keep docs/bootstrap.md and docs/bootstrap-tasks.md verified/pending/not-applicable with exact evidence. Each applicable requirement needs its owner, dependencies, files, configuration, working directory, executable commands, positive/negative tests, forbidden effects and done criteria. Keep docs/routes.md and docs/environment.md current.

Use Node 24.19.0, npm 11.9.0 and Astro 7.3.6 with the committed npm lockfile. The original guide source remains UNLICENSED. The adopted upstream template/helper portions retain their scoped MIT notice in THIRD_PARTY_NOTICES.md and the exact mapping in docs/template-provenance.md. This is template instantiation in an existing application, with no upstream clone-ancestry claim.

## Verification

Run npm ci, npm run check, npm run lint, npm run format:check, npm test, npm run test:fault, npm run build, npm run test:dom and npm run test:e2e in this repository. The normal Node suite must discover the actual fast-check properties. Keep independent invariants and known faults in docs/testing-invariants.md. Preserve replay validation and existing assertions. Meaningful domain logic makes scoped Stryker with --ignoreStatic applicable; T06 now records a real scoped run and reviewed survivor/accounting evidence in docs/verification.md; preserve its scope and reported property participation limits.

Record results against the tested source state and environment. Prior CI success does not verify new local edits. Inspect real mobile/desktop screenshots for UI changes, keyboard focus, 200% zoom and assistive-technology behavior. Browser/DOM/container/production observations are separate gates; never reinterpret blocked startup as a passing test.

Preserve established test contracts and thresholds. Validate review findings against current source and reproduce behavioral defects before fixes. Generated output, dependencies, reports and real environment files stay ignored; do not hand-edit generated CSP/build output to hide failures.

## Boundaries

Fixtures are fictional. The standalone Node adapter is selected for hosting. No CMS, account, form, tracker, OAuth, model API, external inference, real channel access, database or paid service is selected. Keep source strings rendered as text and editorial destinations allowlisted. Do not copy another project's brands, domains, recipients, identifiers, credentials or private data. Do not claim independent product reviews, guaranteed accuracy or Moderaty support beyond its documented YouTube comment surface.

Default builds are noindex previews. SITE_RELEASE=true prepares an indexable artifact and does not authorize publication. A public commit marker contains only schemaVersion 1, a validated source SHA or null for unidentified preview, the release boolean and relative public output paths with SHA-256 digests; it must not contain account/build-system credentials or repository paths. Analytics stays absent and all routes are ineligible. Adding collection or provider behavior requires its selected contract and authority.

## Handoff

Report changed behavior, exact commands/results, current local source identity and pending operator/release checks. PRs #1–3 are merged on main; PR #1's reviewed head 702b290 passed automated source/browser/container checks, and the full documented local chain including the 10-test browser suite passed on merged main 92c9ae1 on 11 October 2026. Manual accessibility/visual review and actual Coolify/proxy/TLS/DNS/release/recovery evidence remain pending. No owner license, legal or contact gate applies to this site (owner decision, 15 October 2026). Local green, a source push or health 200 cannot establish a public release.

## Global Rules

### Scope discipline

Change only what I explicitly ask you to change. Never remove, restyle, or "clean up" anything else (design, images, animations, layout, code, settings). If I ask for a text rewrite, touch text only. Standard development steps the repo requires (tests, evidence, checks) are expected; this rule means never changing or removing existing work based on assumptions about what I meant.

### Confirm first

For any task that modifies something (files, sites, code, settings), first list exactly what you will change and what you will leave untouched, then wait for my approval before doing it.
