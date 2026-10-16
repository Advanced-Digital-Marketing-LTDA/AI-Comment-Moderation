> Current stack (8 October 2026): standalone Astro/Node on port 8080, with prerendered content in dist/client and runtime /healthz. The nginx references and older results below describe historical verification only. Current commands and hosting contracts are in docs/coolify.md, docs/routes.md and README.md. New verification is recorded in docs/verification.md.

# Actual invariant register

These P01-P06 names identify test invariants. They are a separate namespace from the bootstrap P01-P05 analytics/operation requirement IDs. Source provenance and actual task records live in docs/template-provenance.md and docs/bootstrap-tasks.md.

## P01: Canonical privacy

| Required field                          | Actual target contract                                                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Contract and boundaries                 | Canonical of the root with arbitrary query/fragment equals https://aicommentmoderation.com/. Queries/hash never enter canonical/sitemap.                     |
| Independent oracle                      | Literal approved root from project specification, independent of canonical().                                                                                |
| Input strategy and reset                | fc.string query/fragment encoded into root URL; no mutable state.                                                                                            |
| Observed output/state/forbidden effects | Actual canonical output equality; no credential or fixture/provider data.                                                                                    |
| Concrete detectable fault               | Return raw URL href and preserve query/hash.                                                                                                                 |
| Deterministic regression                | Known email/UTM/hash regressions in tests/config.test.mjs; disposable query-leak fault in scripts/verify-fault.mjs.                                          |
| Actual evidence/replay                  | Final ordinary properties and focused 1000-run properties passed; both known faults detected locally. No actual shrunk failing seed/path for this alignment. |
| Limitations                             | Sampling does not establish real host redirects/crawler/indexing.                                                                                            |

## P02: Exact production and editorial identity

| Required field                          | Actual target contract                                                                                                                                          |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contract and boundaries                 | Only literal approved HTTPS apex with optional trailing / is production origin; no credentials/port/query/hash/path. Editorial hosts use exact HTTPS allowlist. |
| Independent oracle                      | Literal project origin and independent approved destinations.                                                                                                   |
| Input strategy and reset                | Constructed foreign .invalid hostname labels1-40; deterministic localhost/www/old-domain/port/path/query/credentials cases; pure per-case state.                |
| Observed output/state/forbidden effects | siteConfig throws foreign production origins; allowedExternalUrl rejects suffix lookalikes.                                                                     |
| Concrete detectable fault               | Suffix/substr origin/host acceptance or normalize explicit :443 as accepted input.                                                                              |
| Deterministic regression                | tests/config.test.mjs includes explicit :443/foreign/old/canceled/lookalike cases.                                                                              |
| Actual evidence/replay                  | Final ordinary discovery/config-host property and focused 1000-run property passed; current host runtime remains separate.                                      |
| Limitations                             | Build canonical validation is not DNS/domain ownership, publicTLS or CSRF verification.                                                                         |

## P03: Independent fictional rules

| Required field                          | Actual target contract                                                                                                                                   |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contract and boundaries                 | Ten versioned unique synthetic fixtures; 20 literal mode outcomes; criticism/complaints remain allowed and required context stays review.                |
| Independent oracle                      | Independent tests/fixture-policy.mjs literal 10x2 outcome table, approved guide specification.                                                           |
| Input strategy and reset                | Fixture indexes0-9 and cautious/stricter; JSON before snapshot inside each generated run.                                                                |
| Observed output/state/forbidden effects | Actual production result matches independent policy and input fixture remains unchanged.                                                                 |
| Concrete detectable fault               | Prize-fee action outcome becomes allow; missing-context review becomes allow.                                                                            |
| Deterministic regression                | tests/scenarios.test.mjs literal outcome table and scripts/verify-fault.mjs prize mutant.                                                                |
| Actual evidence/replay                  | Four actual properties passed in final 90-test ordinary discovery and focused 1000-run check; both faults detected locally; no fabricated replay values. |
| Limitations                             | Fixed synthetic illustrative decisions are not live AI predictions, calibrated accuracy or real moderation action.                                       |

## P04: YouTube-only product routing

| Required field                          | Actual target contract                                                                                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Contract and boundaries                 | Social/CMS/API category sequences keep moderaty=false; unknown/inherited categories reject. YouTube alone may expose documented related-product route.                         |
| Independent oracle                      | Explicit YouTube-only compatibility and category choices in specification.                                                                                                     |
| Input strategy and reset                | Arrays of social/cms/api, lengths1-30; pure independent function calls; cloned return behavior verified by deterministic tests.                                                |
| Observed output/state/forbidden effects | workflowFor() false for each non-YouTube operation; unknown/inherited keys throw.                                                                                              |
| Concrete detectable fault               | Default product recommendation for any category or allow prototype-chain workflow keys.                                                                                        |
| Deterministic regression                | toString/**proto**/constructor regressions and browser category choices.                                                                                                       |
| Actual evidence/replay                  | Final local property and 4/4 DOM checks passed; baseline Chromium evidence remains historical; alignment browser run passed locally on merged main 92c9ae1 on 11 October 2026. |
| Limitations                             | No provider account/API/platform moderation permission or exact third-party integration is tested.                                                                             |

## P05: Static hosting and artifact CSP

| Required field                          | Actual target contract                                                                                                                       |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Contract and boundaries                 | Checked source-only context/runtime; nonroot Nginx8080; genuine errors; CSP exact inline bytes of root+404; correct cache/MIME/security.     |
| Independent oracle                      | Explicit route/security matrix, fixture distinct 404 script and independent actual HTTP requests.                                            |
| Input strategy and reset                | Deterministic built fixture inputs/disposable script files; isolated CI container; no database state.                                        |
| Observed output/state/forbidden effects | Built output/source checks plus actual Nginx syntax/health/root/assets/error/header behavior; missing assets must be404/no-store.            |
| Concrete detectable fault               | Omit404 inline-script hash, use SPA/home fallback or cache missing hashed asset immutably.                                                   |
| Deterministic regression                | tests/hosting-headers.test.mjs distinct 404 regression; tests/hosting.test.mjs and scripts/smoke-host.mjs.                                   |
| Actual evidence/replay                  | Final local hosting/output regressions passed; baseline CI image/HTTP passed; current pinned-image/marker/missing-asset runtime run pending. |
| Limitations                             | Source/DOM checks cannot establish future Coolify proxy/TLS/DNS. Historical image tags/digests do not claim vulnerability clearance.         |

## P06: Safe source marker and byte identity

| Required field                          | Actual target contract                                                                                                                                                                             |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contract and boundaries                 | /build.json contains exactly schemaVersion 1/commit/release/files; release requires exact 40-hex SHA. Preview empty/unset SHA is explicit null. Each relative public file digest equals its bytes. |
| Independent oracle                      | Approved full source SHA supplied independently plus fixed known SHA-256 hello/test fixtures and actual fetched output bytes.                                                                      |
| Input strategy and reset                | Deterministic valid/malformed SHA/path/schema/hash and changed-file cases; disposable output directory per subprocess; verify input state unchanged.                                               |
| Observed output/state/forbidden effects | Marker strict fields/path redaction, no secret sentinel, root/asset hash verification; marker itself/healthz.txt excluded.                                                                         |
| Concrete detectable fault               | Use stale/wrong source commit, allow private/traversal path, or accept corrupted root/asset bytes.                                                                                                 |
| Deterministic regression                | tests/build-provenance.test.mjs release/invalid/source-state/sentinel/stale/corrupt tests.                                                                                                         |
| Actual evidence/replay                  | Final marker implementation/regressions and static build passed; preview commit is null; actual container/served production identity remains pending.                                              |
| Limitations                             | A caller-supplied commit is an identity assertion. It cannot prove an uncommitted tree equals that commit; verify reviewed clean source/artifact.                                                  |

## Built-browser invariants

Preset/mode/reset/restored controls match the actual text result and polite announcement. The skip/navigation target retains visible inward focus. Checklist state lasts only in the current tab. All ten cases and both mode explanations remain available with JavaScript disabled or modules failed. Repeated interactions create no external request or local/session storage. Layout does not overflow at 320/375/768/1280 and reduced motion remains useful.

Automated DOM and Chromium/axe cover those named contracts in their actual environments. Manual desktop/mobile screenshots, true 200% zoom, focus/announcements and assistive technology remain pending. Retaining screenshot files is not evidence that someone inspected them.

## Controls, regressions and replay

The actual pinned upstream propertyOptions() body in tests/helpers/property-options.mjs drives the target property suite. It defaults 100 runs, accepts only positive decimal safe-integer FC_NUM_RUNS, decimal signed 32-bit FC_SEED and numeric-colon FC_PATH with a seed. Invalid/empty supplied controls fail; tests exercise both helper boundaries and the actual property subprocess. A 1000-run focused check increases sampling and does not repair an incorrect oracle.

If a real failure occurs, keep its emitted seed/path, shrunk synthetic counterexample, exact property/file, compatible fast-check version and violated independent contract. Set those actual FC_SEED/FC_PATH values and replay only the named failing property with node --test --test-name-pattern='exact emitted property name' tests/actual-contracts.pbt.test.mjs. Add the shrunk case as a deterministic regression before fixing. No illustrative seed/path is represented as an observed failure.

## Fault and mutation accounting

scripts/verify-fault.mjs creates disposable query-leak and prize-action-to-allow wrong copies and requires relevant independent tests to fail. Both known faults were detected in the final local alignment checks; production modules/fixtures remained unchanged by the fault runner. They establish those fault detections.

Meaningful hand-authored domain modules make full T06 scoped Stryker applicable. T06 now has actual --ignoreStatic execution and reviewed killed/survived/timed-out/no-coverage accounting, equivalent-survivor explanations and reported property-versus-example participation evidence; preserve those exact-input limits. Preserve established assertions/thresholds; no universal 100% target or unobserved score is claimed. Requirements/oracle review remains independent of mutation sampling.

## Exact evidence boundary

Published baseline 702b2908800be6cce2d58a610195b2bfe334e38a passed 40 normal unit/property, 4 DOM and 9 Chromium/axe tests plus real isolated Docker/Nginx/health/HTTP in PR run 37539175975 on 6 October 2026. Exact links are in docs/verification.md. Earlier 22/25-test sizes/counts/hash/run records remain historical. Final local alignment checks passed 90/90 ordinary tests, four focused 1000-run properties, both deliberate faults, checked 13-file build and 4/4 DOM tests; local source/artifact identities and refreshed mutation evidence are recorded in docs/verification.md. At preparation, new authorized publication/exact-head browser/container/workflow results and manual gates remained pending; none of these tests proves actual public hosting, indexing, model accuracy or legal/WCAG certification.

## Configured scoped mutation execution

The new scripts npm run test:mutation:dry and npm run test:mutation invoke the portable Node launcher scripts/run-mutation.mjs with stryker.config.json. Current package pins @stryker-mutator/core and @stryker-mutator/tap-runner 10.0.0. The scope is src/lib/site-config.mjs and src/lib/scenario-rules.mjs, with tests/config.test.mjs, tests/scenarios.test.mjs and the actual-contracts.pbt.test.mjs properties. Per-test coverage, ignoreStatic=true, concurrency 1, no in-place mutation/incremental cache and explicit generated/vendor/report exclusions preserve isolation. Reports write to ignored reports/mutation/. Default sample controls FC_SEED=20261006/FC_NUM_RUNS=100 are reproducibility settings, not observed failure/replay evidence; authoritative mutation rejects FC_PATH. No prior mutation threshold exists; high 80/low 60 are display bands and break:null requires reviewed accounting before T06 completion. Actual dry/full execution and survivor/property participation evidence are in docs/verification.md; final ordinary/build/DOM gates passed separately; current browser/container/exact-head workflow/manual/public-host gates remain pending at preparation.
