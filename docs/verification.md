# PR #3 review triage — 8 October 2026

These checks cover the corrections on build/simple-astro-stack after published parent 302c2c270551d7e20eca7593dda5d6b1e1a64893. Commands ran in /workspace/AI-Comment-Moderation with Node 24.19.0/npm 11.9.0. The preview artifact intentionally has commit:null because the tested tree included uncommitted corrections.

- Fixed all four CodeAnt findings: matching foreground-server/smoke ports, preserved shell failure status, complete hashes for nested public files and HTTP frame protection for /index.html and /404.html. The pinned adapter's manifest route patterns now include the two aliases, allowing its native static header registry to apply; prerender paths stay unchanged.
- Fixed CodeRabbit's unused CI loop variable, dirty-tree source marker instructions, preview access boundary and stale adapter description. CSP generation now rejects either missing head element before writing files. Its regression failed before the guard and passes afterward. The nested-file regression likewise failed before the hash fix.
- Simplified Docker builds to the build/prune steps; required source checks remain in CI. The local runbook waits for health, retains failures and cleans up only the container it created.
- Kept output:static with the standalone adapter. Amazon Q's incompatibility finding is a false positive for Astro 7.3.6/@astrojs/node 11.1.6: this adapter supports static output with runtime routes, demonstrated by successful builds and real HTTP checks. Optional response buffering/caching and blanket docstring suggestions do not identify a functional defect and were not adopted.
- npm ci, npm run check, npm run lint and npm run format:check passed. Astro reported no diagnostics. npm test passed 92/92 including actual properties; npm run test:fault detected both deliberate faults. npm run build passed; npm run test:dom passed 4/4 and npm run test:e2e passed 10/10.
- The final Docker image built with the environment's build-only CA secret. Its node user reached healthy and node scripts/smoke-host.mjs http://127.0.0.1:4545 passed source/artifact identity, root/assets/health, genuine 404, HTML alias CSP/frame headers and preview indexing.
- Independent source review found no introduced runtime defect; its cleanup-name collision finding was corrected by capturing the newly created container ID.

No merge, Coolify deployment or public release occurred. Earlier records below retain their original tested source and limits.

# Standalone Astro/Node verification — 8 October 2026

Branch: build/simple-astro-stack, based on current origin/main 16a16c240e02f06478388d1791d5f27635173c51. These observations describe the modified local tree, not a published commit. Preview markers intentionally record commit:null. Reference stack: Site-Bootstrap-ADM 49db7fecae8b8ee6357d44e2fa3a9f14d00c52f8.

- npm ci: clean locked install passed with Node 24.19.0/npm 11.9.0.
- npm run check, npm run lint, npm run format:check: passed; no Astro diagnostics.
- npm test: 91/91 passed, including actual fast-check properties.
- npm run test:fault: both intentional canonical/policy faults detected.
- npm run build: standalone Node output passed all built-content contracts; public output has 11 files and 132969 bytes.
- npm run test:dom: 4/4 passed.
- npm run test:e2e: 10/10 Chromium/axe tests passed, including responsive, keyboard and no-JS flows.
- npm start and node scripts/smoke-host.mjs on isolated loopback ports: passed root/assets/health/source-marker checks, exact public byte hashes, missing documents/assets/dotfiles, CSP in HTML aliases, /404 and /404/ security/noindex/no-store, and explicit readable noindex /404.html.
- npm run dev: real root response was 200 with production CSP disabled, preserving Vite inline styling and HMR.
- Docker: real Node-only multi-stage image built with the optional build_ca secret; nonroot runtime reached healthy and passed the same expanded HTTP smoke. The certificate mount is build-only and not copied into image layers.

The code review found and corrected adapter error/alias header behavior and development CSP interference. Static media/crawler files now use native Node adapter headers with revalidation; root/runtime responses retain HTTP security headers, and static HTML aliases have CSP meta policies. The direct /404.html template is 200/noindex; unknown URLs remain 404. No nginx or TinaCMS is installed. Sessions and application collection remain absent.

Commands ran from /workspace/AI-Comment-Moderation. Docker builds used BUILDX_CONFIG=/workspace/work/buildx and --secret id=build_ca,src=/etc/ssl/certs/ca-certificates.crt for this environment; ordinary hosts need no certificate override. Container check: docker run with loopback 4536:4321, docker inspect health, then node scripts/smoke-host.mjs http://127.0.0.1:4536.

Public Coolify deployment, changing its exposed/routed port to 4321, domain/TLS/DNS and operator release checks remain pending. At the end of local verification, no commit, push, merge or deployment had been performed. The owner subsequently authorized committing and pushing this branch. Earlier results below are historical.

# Verification record

## Published review checkpoint (7 October 2026, 00:28 UTC)

[PR #1](https://github.com/Bonobo791/AI-Comment-Moderation/pull/1) points to [fea9000ef6854da1f2ab251e04f2b2c5db571901](https://github.com/Bonobo791/AI-Comment-Moderation/commit/fea9000ef6854da1f2ab251e04f2b2c5db571901), with tested tree 5e049c54336dc40a3cfbbdebab12f54026a8eb4e. Main and the owner's README remain preserved. This source publication changed no deployment or PR readiness setting.

- [PR CI run 37550858187](https://github.com/Bonobo791/AI-Comment-Moderation/actions/runs/37550858187) and push run 37550855370 passed on that exact source head. PR logs confirm 90/90 ordinary tests, 4/4 DOM tests, 10/10 Chromium tests, the digest-pinned Docker build, Nginx syntax, healthy container and served source/artifact-hash HTTP checks
- Retained desktop/mobile screenshots passed independent static pixel inspection without an obvious visual blocker. The downloaded archive matched GitHub's size and SHA-256. True 200% zoom, screen-reader use and actual hosting remain pending
- Cubic marked all twelve previously reported issues addressed. Codex completed without new findings. Gitar's repeated punctuation suggestion remains a false positive: the built correction-link paragraph has no space before its period
- [CodeAnt's completed gate](https://github.com/Bonobo791/AI-Comment-Moderation/pull/1#issuecomment-6026261414) passes antipatterns, secrets, duplicates, SAST, bugs, IAC and dependencies. It still fails on two complex functions. The owner instructed us to skip those two findings; no complexity refactor was made and the gate remains failed
- [CodeRabbit's marker finding](https://github.com/Bonobo791/AI-Comment-Moderation/pull/1#discussion_r4201713602) is valid: verification accepted release:true with commit:null when no expected SHA was supplied. A local one-condition guard and red/green regression now reject that pair while accepting unidentified previews and identified releases. Fresh local check/lint/format, 91/91 ordinary tests, both deliberate faults, build and 4/4 DOM pass. Preview bytes are unchanged. This correction is awaiting publication and has no new exact-head CI result

The fresh discussion inventory has no other new actionable finding. Earlier records below retain their dated source and environment limits. The failed CodeAnt gate and CodeRabbit changes-requested review remain visible; this checkpoint does not establish merge or public-release readiness.

## Published preparation baseline (6 October 2026, 23:24 UTC)

Verified through GitHub on 6 October 2026 at 23:24 UTC: [PR #1](https://github.com/Bonobo791/AI-Comment-Moderation/pull/1) is open and ready for review, with source head [702b2908800be6cce2d58a610195b2bfe334e38a](https://github.com/Bonobo791/AI-Comment-Moderation/commit/702b2908800be6cce2d58a610195b2bfe334e38a). This alignment did not change its draft/readiness state. [PR workflow run 37539175975](https://github.com/Bonobo791/AI-Comment-Moderation/actions/runs/37539175975) completed successfully for that source head.

- Clean locked install, Astro check, lint, formatting, known deliberate faults and static build passed
- 40 deterministic/property tests passed, including four actual fast-check properties
- 4 compiled-DOM tests and 9 real Chromium/axe tests passed, including responsive/keyboard/no-JS/failed-module behavior
- A real isolated Docker image build, nginx -t, image health and root/assets/real-404/cache/security HTTP smoke passed
- These observations establish that exact source and isolated GitHub environment. Earlier workflow IDs, image resolutions, sizes/hashes and counts below remain historical

Local baseline 18e7f47692f3a6d9346610cfb8ae3228ac7d907e has the matching source tree. At this preparation checkpoint, build/template-alignment held the uncommitted actual-template/helper/marker alignment and no new source publication had occurred. Local checks below verify that alignment; new authorized publication/exact-head CI must establish its browser/container/workflow runtime results. The successful baseline run applies only to its linked source head. Later approved publication should add a dated exact-head record rather than reinterpret this checkpoint.

## Local template alignment preparation record (6 October 2026)

- Instantiated actual pinned AGENTS/status/setup-task/route/environment/release templates; recorded exact blob mappings and scoped upstream MIT notice
- Copied the strict property-options helper from the actual pinned executable asset into the real target suite; no synthetic upstream demo was substituted for target coverage
- Added safe optional preview/required-release SITE_COMMIT and a public static marker schemaVersion/commit/release/relative-file SHA-256 map; no credentials/build-system/account metadata or time field
- Prepared noindex/no-store marker delivery, exact checked-out source identity in both CI jobs and independent served root/asset hash verification; health remains availability only
- Prepared bounded browser screenshots/diagnostic artifact retention for 7 days using explicit synthetic output paths and hidden-file exclusion. Its source-policy regressions pass; alignment workflow/runtime execution remained pending at the preparation checkpoint
- Final local source/build/DOM/property/fault checks passed: Astro 13 files with zero errors/warnings/hints, lint/format, 90/90 ordinary tests including four actual properties, both deliberate faults, 13-file build and 4/4 compiled-DOM tests. Independent final source review found no remaining blocking defect
- T06 scoped mutation gate: actual run and reviewed accounting recorded below; 154/156 killed, two equivalent survivors. It verifies the exact scoped inputs, not unrelated whole-source/manual/production gates
- At the preparation checkpoint, this alignment had no new commit/push/merge/deployment/DNS/provider/production action. Later source publication requires its corresponding approval and an additional exact-head CI record

## Local command and artifact evidence

Commands ran from /workspace/scratch/6341ae6d3411/aicommentmoderation-site on build/template-alignment with Node 24.19.0/npm 11.9.0. Tested source was the alignment worktree over local baseline 18e7f47692f3a6d9346610cfb8ae3228ac7d907e, not a new published commit. The owner README remained byte-for-byte unchanged.

- Clean npm ci installed 612 packages; evidence/alignment-final-verification.log records the install before the final source-only corrections. Final npm run check, npm run lint, npm run format:check, npm test, npm run test:fault, npm run build and npm run test:dom passed in evidence/alignment-final-source.log at 23:17-23:18 UTC
- Ordinary suite: 90/90 passed, zero failed/skipped, including four actual fast-check properties, strict-helper/replay controls, marker/CI policy and negative output/resource cases
- Focused FC_NUM_RUNS=1000 npm run test:property passed all four actual properties, zero failed/skipped, at 23:26 UTC in evidence/alignment-property-1000.log. Higher sampling remains bounded evidence rather than exhaustive proof
- Both disposable canonical-query-leak and prize-action-to-allow faults triggered the required failing assertions; production modules/fixtures remained unchanged
- Checked static build: 11 anchors, 10 fictional fixtures, one canonical URL, 13 public files totalling 133500 bytes. Preview marker has schemaVersion 1, commit:null and release:false; this explicitly unidentified preview does not claim the worktree equals HEAD
- Compiled-DOM suite: 4/4 passed. Packaged standalone noindex preview: 68763 bytes, SHA-256 38f7493426e4c5c02ef8bb0a4ecb9c55c3a977352dabfd0a0deb6f0985b23afa
- npm lock SHA-256: a7ebf10c4728db628acd0d5eb2dc793c9d7ea93d7bb764096a67e2c6925a217b. Preserved README SHA-256: 220a7b704be294028431696a36eae01c046d2b95a1e5576116543ed4391e266d

The evidence logs and generated preview/mutation reports are machine-local ignored artifacts. Source identity, ordinary/build/DOM results, actual browser/container execution, manual review and public release remain separate observations. Documentation status updates after these commands change no implementation/test inputs; formatting of the updated records is checked separately.

## Current finding dispositions

- CodeAnt javascript:S2871: fixture ID-set comparison now uses the same deterministic ordinal comparator on both sides; the independent 20 policy assertions remain unchanged
- CodeAnt javascript:S4624: guide fixture sections/options are named fragments. Direct VM comparison against the published baseline produced byte-identical output for empty, HTML and escaping payloads; the escaping function, fixture IDs/labels and section order remain unchanged. Evidence: evidence/codeant-fragment-equivalence.log
- Final independent source review: external stylesheet/script-preload hrefs and base URLs now fail the destination policy, with negative regressions and final local checks passing. No remaining blocking source issue was reported

These are local dispositions, not new remote bot-check conclusions or review replies.

## Local scoped mutation evidence

The refreshed actual npm run test:mutation completed with exit 0 on 6 October 2026, 23:14:04 to 23:14:31 UTC (27 seconds) after the fixture-comparator correction. evidence/alignment-refreshed-mutation.log records this run; its console clock is UTC-03, so the displayed times are 20:14:04-20:14:31. @stryker-mutator/core and TAP runner 10.0.0 used the configured two real modules, all three actual test files, perTest coverage, ignoreStatic=true, concurrency 1 and no in-place/incremental execution. The dry command npm run test:mutation:dry maps to Stryker v10 --dryRunOnly; its successful run executes no mutants.

| Scope                      | Total | Killed | Survived |  Score |
| -------------------------- | ----: | -----: | -------: | -----: |
| src/lib/scenario-rules.mjs |    52 |     52 |        0 |   100% |
| src/lib/site-config.mjs    |   104 |    102 |        2 | 98.08% |
| Total                      |   156 |    154 |        2 | 98.72% |

Timeout, NoCoverage, CompileError, RuntimeError, Ignored and Pending counts are all zero. Every report mutant has static=false; ignoreStatic removed no listed constant in this run. No mutation exclusion or established assertion was weakened. The display bands high 80/low 60 and break:null do not automatically complete review.

Survivor #109 (site-config.mjs line 29, columns 5-37) replaces url.origin !== PRODUCTION_ORIGIN with false. Survivor #111 (line 30, columns 5-25) replaces url.pathname !== '/' with false. Both are equivalent under the preceding exact raw-input guard: only the two literal approved HTTPS apex strings can pass, and native URL parses each to the approved origin with '/' pathname. The guards remain intact and no exclusions were added. The implementer also exercised disposable imports with both accepted forms and rejected alias/foreign/malformed/path inputs. The first run's other survivors led to real diagnostic/normalized-alias regressions before the final run.

Participation accounting: the report credits all 154 kills to the deterministic config (102) and scenario (52) files. The actual property file covers 88 site-config and 45 scenario mutants, 133 of 156, with zero credited first kills. The TAP runner uses forceBail and stops after the first killing file. This records reported credit/coverage and does not show that the properties cannot detect those faults. The two survivors ran both configuration and property files. No property-only kill score or universal coverage claim is made.

Refreshed JSON SHA-256: 4778d6cf42db28642a3b23029d2b00d356b94dd409a1e75857f46862e607fddc. The report's two module source strings match the final alignment modules. Machine-local ignored JSON/HTML reports are in reports/mutation/. The earlier 22:30:14-22:30:56 UTC run (42 seconds wall; Stryker 39 seconds), JSON SHA-256 5e7ef5ea7fe2bdbf3bf707cc6bed2968fa0f4ffcabe68b8784f40f7200980dbd and 22:37 input comparison are historical scoped evidence superseded by this refresh. Final ordinary/build/DOM checks also passed as recorded above. Mutation verifies its scoped inputs; current browser/container/exact-head CI, manual and production gates remained pending at preparation.

## Remaining actual evidence

Manual mobile/desktop screenshot inspection, true 200% zoom, visible focus/live announcements and assistive-technology behavior remain pending. Historical browser/container startup restrictions apply to those attempts; no blocked attempt was counted as executed assertions. The implemented browser suite contains 10 tests, including print-color validation, and had not run for this alignment at preparation; a post-merge local run on 11 October 2026 executed all 10 (see Post-merge local verification). The new marker, digest-pinned images, expanded HTTP smoke and bounded artifact workflow likewise require approved publication and their own exact-head CI/runtime results.

Actual Coolify/proxy/TLS/DNS/redirect/cache/log lifecycle, protected external-preview access, immutable approved image/artifact, served identity, source license/legal operator/contact/content/privacy, release authority and rollback/recovery remain pending. D01-D08 stay production-pending. There is no selected CMS/contact/collector/database/scheduler/provider delivery to verify.

## Post-merge local verification

Recorded 11 October 2026 against merged main 92c9ae1894775294057fd91da0d8efeb7567d2df (PRs #1–3) in a local workspace. Toolchain: the real Node 24.19.0 binary and npx npm@11.9.0; the machine's default node/npm shims resolve to a different container toolchain and were bypassed. Fresh npm ci installed 632 packages and left the lockfile unchanged. In order: npm run check (17 files, zero diagnostics), npm run lint, npm run format:check, npm test (92/92 including the four fast-check properties), npm run test:fault (both disposable faults detected), npm run build (11 files, 132969 bytes; built-output contracts passed), npm run test:dom (4/4), npm run test:e2e (10/10 Chromium — the full implemented suite including print-color, previously unrun for this alignment), FC_NUM_RUNS=1000 npm run test:property (4/4) and node scripts/smoke-host.mjs against HOST=127.0.0.1 PORT=4535 node ./dist/server/entry.mjs (all listed route/header/marker contracts). SITE_URL values for the obsolete .net apex, localhost and a preview origin, plus malformed SITE_RELEASE and SITE_COMMIT, each failed the build at configuration load. Docker, podman and nginx were unavailable locally, so the container workflow remains unrun here; results are this-workspace evidence, not exact-head CI or production proof. The working tree was left clean.

## Historical verification records

Reviewed 6 October 2026. The owner authorized source publication on a review branch and a draft PR. Main and the owner's README remain preserved. No merge, deployment, DNS, account, credential or production action occurred.

### Historical CI at de0ba448

The published review head is [de0ba448cb3e6a6fe39565e11ed9d23551d48cc6](https://github.com/Bonobo791/AI-Comment-Moderation/commit/de0ba448cb3e6a6fe39565e11ed9d23551d48cc6), in [draft PR #1](https://github.com/Bonobo791/AI-Comment-Moderation/pull/1). Both the [push run 37536172124](https://github.com/Bonobo791/AI-Comment-Moderation/actions/runs/37536172124) and [PR run 37537165673](https://github.com/Bonobo791/AI-Comment-Moderation/actions/runs/37537165673) succeeded for that source head.

- Clean install, Astro check, lint, formatting, deliberate-fault checks and static build passed
- The deterministic/property suite passed 25 tests, including four real fast-check properties
- The compiled-script DOM suite passed 4 tests
- Chromium passed 9 Playwright tests, including axe checks, 320/375/768/1280 responsive overflow checks, reduced motion, keyboard tasks, no-JS and failed-module fallback
- Docker built an isolated preview image; `nginx -t`, image health and HTTP root/assets/real-404/cache/security smoke passed
- Image resolution recorded `node:24.19.0-bookworm-slim` at `sha256:a9f5f7c91a432850b2a8a7797adf5eadb6c733ceed61167806cee7ea7fbc29df` and `nginx:1.30.5-alpine` at `sha256:0985e772fb9f729e6fa0980da05fca5d9c468e870eed43071545afa9d2e27d94`

Those results apply to the linked source head and isolated GitHub runners. Later revisions must establish their own exact-head CI result; consult the PR for newer source heads and checks; its current ready-for-review state is recorded above. The recorded image resolutions do not constitute a vulnerability scan or a digest-pinned production deployment.

### Historical PR #1 local review corrections

This section records local triage on 6 October 2026, before its corrections were published. The prior head de0ba448 recorded a `javascript:S4624` CodeAnt antipattern failure. Later source head 702b290 passed the linked PR CI; the historical local record itself does not establish any other bot check conclusion.

- Replaced POSIX environment prefixes in the five Astro npm commands with a dependency-free Node launcher. It preserves literal arguments, disables telemetry, shares release mode across all build stages, forwards interruption and stops after a failed stage. Linux subprocess tests pass; an actual Windows runtime has not been tested.
- Strengthened the build check to require all ten real fixture articles inside the readable example grid, including comment text, context and both policy explanations. Tests reject missing/misplaced articles and incomplete content even when select-option IDs remain.
- Restored an inward visible outline for the keyboard skip target and added computed-outline assertions to the existing browser test. The revised real-browser test has not run locally.
- Rejected explicit default `:443` origins as well as non-default ports, matching the documented exact literal apex constraint.
- Added the missing DOM command to AGENTS and corrected stale verification documentation without replacing historical evidence.
- Fixed `javascript:S4624` in `scripts/package-preview.mjs` by reading the stylesheet path and content into separate variables before interpolation. Script escaping is unchanged. Against the same pre-triage built files, `cmp` verified byte-identical preview output: 68632 bytes and SHA-256 `85426de5925d7218ca0aba36f0eea1c9420ca1034812d8c65758d0abd696519b`.

Two suggestions did not warrant source changes. Amazon Q's healthcheck-injection claim was not reproduced: response bytes are grep input, with no shell-evaluation path. Gitar's punctuation claim contradicted the actual Astro compiler and built output, which attach the period directly to the correction link.

Local Astro check, ESLint, Prettier, all 40 deterministic/property tests, both deliberately wrong disposable fault checks, static build and all 4 compiled-DOM tests pass. New defect regressions were observed failing before their fixes. An independent final source review found no introduced blocking issue. The lockfile is unchanged. The current built output is 132194 bytes across twelve files; the regenerated offline preview is 68673 bytes, SHA-256 `ba765cc5a2a9fabed8d0878f1d1068b8fbb96827eb7015e61b6e97a5a82fab45`. Its extra bytes come from the focus-style correction, not the stylesheet-extraction refactor.

Fresh browser/container/CodeAnt results require an authorized push and exact-head checks. Historical successful CI is not a pass for later revisions. No public review replies, merge or deployment occurred during this triage.

### Historical original local artifact evidence

The following results describe the earlier local artifact, before review-branch publication. Counts, sizes and hashes remain historical evidence for that artifact.

- Clean npm ci completed with 419 packages from the committed lockfile; lock SHA remained 3ebc9e52b7ade372ceecb0b96aa76dee1a3da12bf8eb999672b6e31007d8814b
- Astro check: 12 source files, zero errors, warnings or hints
- ESLint and Prettier checks passed
- Normal Node suite: 22 tests, 22 passed; includes four fast-check properties
- Focused FC_NUM_RUNS=1000 suite: 22/22 passed; four properties sampled 1000 runs each
- Both deliberate-fault checks failed as intended in disposable copies: canonical query leakage and prize-action→allow; original source was never mutated
- Static production build passed; eleven section anchors, ten pre-rendered fictional cases, one canonical/sitemap URL, twelve output files totalling 132153 bytes
- Built-DOM integration suite: 4/4 passed, exercising compiled scripts, selection/policy/reset/scope, checklist/no-JS, restored controls and navigation state
- Artifact-specific CSP generator covers index and 404; a distinct 404 inline-script regression failed before the fix and now passes
- Original 1200×630 social-card PNG pixels inspected; relevant text-color pairs manually calculated at 4.55–6.64:1
- Independent guide source review and separate Coolify source review found no remaining blocking source-level issue after corrections

The original self-contained offline preview was 68632 bytes, SHA-256 85426de5925d7218ca0aba36f0eea1c9420ca1034812d8c65758d0abd696519b. It contained all guide styles/scripts and required no server or runtime third-party asset. It was a noindex, unpublished preview; these figures do not identify a later artifact.

### Historical local execution limits and remaining gates

- CLI Chromium launch failed because the execution runtime denied its socket
- The supported cloud browser rejected the local preview route; offline file inspection was denied again after one authorization-evidence retry
- Local Playwright startup failed; the successful Chromium/axe assertions above ran in GitHub CI, not this workspace
- Docker, Podman and nginx executables are unavailable locally; image build, syntax and HTTP checks above ran in GitHub CI
- Manual review of phone/desktop screenshots, visible focus and screen-reader announcements, assistive-technology testing, true 200% zoom and visual/performance QA remain pending
- Coolify UI/SSH/deployment, actual proxy/TLS/redirect/header behavior, deployed commit/artifact identity, protected preview access, host log retention, branch protections, crawler/indexing/AI settings and field metrics remain unverified
- Public license, guide legal operator/contact, selected host/privacy retention and release authorization remain pending

DOM tests establish DOM/script contracts. Chromium/axe and container smoke add browser and HTTP evidence in their tested environments. They do not establish accessibility certification or behavior on a future Coolify/public host.

### Historical deliverables

Full source with npm lockfile, tests, Docker/Nginx configuration and readable runbooks, plus the standalone offline HTML preview. Original archive metadata records its local commit and built-file hashes. No screenshots were fabricated or substituted for real UI evidence.

### Historical review-branch publication

The fuller developer guide is in docs/development.md. Browser preview uses foreground --ignore-lock, based on the installed Astro CLI's agent auto-background behavior. GitHub CI builds a disposable Docker/Nginx/health/HTTP preview with no image registry push or deployment. Source publication, exact-head CI, manual UI verification and public release remain separate approvals and evidence.

## Current CI/UI policy additions

yaml@2.9.1 is an explicit dev-only parser for structured CI-policy validation; it matches the version already pinned transitively. It adds no runtime website dependency or external integration. The new CI guard checks approved SHA-pinned actions/options, permitted push/pull-request verification triggers and bounded explicit synthetic artifact paths with hidden files disabled. Its negative cases include a build-push-action mutation, preventing registry publication from being inferred safe merely because the workflow text lacks a docker push command. Final source/normal-suite validation passed on 6 October 2026, including the structured CI-policy negative cases; the changed workflow itself remained unrun at preparation.

The implemented real Playwright print-color test takes the browser suite from the baseline 9 to 10 tests. It had not run for this alignment at preparation; all 10 tests passed locally on merged main 92c9ae1 on 11 October 2026 (see Post-merge local verification). Current fixes include readable dark print overrides, menu accessible names containing visible Menu, parsed root-relative fragments/resources, exact release robots metadata, force-noindex offline preview packaging and a Playwright-managed browser default when CHROMIUM_PATH is unset. Final local source/build/DOM tests passed; browser/container/exact-head workflow, manual and public-host gates remain separate.
