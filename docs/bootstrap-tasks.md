# A01 — Simplify hosting to standalone Astro/Node

- Owner: repository implementer; deployment operator owns release checks.
- State: source/build/browser/standalone HTTP and container checks verified locally.
- Dependencies: existing prerendered guide, exact Astro 7.3.6 / Node adapter 11.1.6, Node 24.19.0 and npm 11.9.0.
- Files: package.json/package-lock.json, astro.config.mjs, Dockerfile, src/middleware.ts, src/pages/healthz.ts, src/pages/build.json.ts, src/pages/[...path].ts, scripts/generate-hosting.mjs, output/preview helpers, hosting tests and CI. deploy/nginx.conf is removed.
- Configuration: build SITE_URL, SITE_RELEASE and optional SITE_COMMIT; runtime HOST=0.0.0.0 and PORT=8080. Sessions are disabled. No CMS or storage.
- Working directory: repository root (/workspace/AI-Comment-Moderation in this session).
- Commands: npm ci; npm run check; npm run lint; npm run format:check; npm test; npm run test:fault; npm run build; npm run test:dom; npm run test:e2e. For runtime smoke, start `HOST=127.0.0.1 PORT=4535 npm start` in one terminal, then run `node scripts/smoke-host.mjs http://127.0.0.1:4535` in another terminal; stop the server afterward.
- Positive checks: existing guide/fixtures/assets/canonical policy, health response, build identity and hashed public bytes, runtime errors, browser interactions, nonroot Node container.
- Negative checks: missing pages/assets and dotfiles return 404, healthz.txt absent, missing release SHA and invalid origins fail, no nginx/TinaCMS/session store/collector, forbidden destinations remain rejected.
- Forbidden effects: content loss, new tracking/accounts/providers, main changes, deployment or DNS changes.
- Done criteria: all required source and real runtime checks pass; container and public deployment evidence remain distinct. See docs/verification.md for actual results.

The previous task records below are historical and do not select nginx for this branch.

> Current stack (8 October 2026): standalone Astro/Node on port 8080, with prerendered content in dist/client and runtime /healthz. The nginx references and older results below describe historical verification only. Current commands and hosting contracts are in docs/coolify.md, docs/routes.md and README.md. New verification is recorded in docs/verification.md.

# Bootstrap requirement tasks

These records instantiate the pinned setup-task template for each applicable requirement. Source/blob provenance is in docs/template-provenance.md. Requirement C/S/T/P identifiers belong to the bootstrap; P01-P05 in docs/testing-invariants.md are invariant names and are a separate namespace.

## Evidence and execution context

Published baseline: 702b2908800be6cce2d58a610195b2bfe334e38a in [open ready-for-review PR #1](https://github.com/Bonobo791/AI-Comment-Moderation/pull/1). [PR CI run 37539175975](https://github.com/Bonobo791/AI-Comment-Moderation/actions/runs/37539175975) succeeded on 6 October 2026. Local baseline 18e7f47692f3a6d9346610cfb8ae3228ac7d907e has the matching tree. Publication preparation checkpoint, 6 October 2026 at 23:24 UTC: new template/helper/marker changes were local/uncommitted and no alignment commit/push/merge/deployment had occurred. Final local checks below verify the alignment. New source publication requires its corresponding approval and a later dated exact-head CI record; prior review publication alone provides no new authority.

Every command below runs from /workspace/scratch/6341ae6d3411/aicommentmoderation-site with Node 24.19.0/npm 11.9.0. The command list is ordered left-to-right; clean install precedes checks, build precedes DOM/browser/HTTP checks. Commands requiring a real browser or Docker need a permitted installed runtime. For loopback HTTP smoke, start the isolated Nginx preview as documented in docs/coolify.md first. No record grants production/provider access.

Status distinguishes baseline observations, new local verification and future public production. Local implementer means the actor performing this authorized source work. Owner/authorized releaser means the person entitled to make the stated source-license/legal/host/release decision; no account assignee or legal contact is invented.

Common evidence E0: source 702b2908800be6cce2d58a610195b2bfe334e38a passed 40 normal unit/property, 4 DOM and 9 Chromium/axe tests plus real isolated image/Nginx/health/HTTP. E0 applies only to that baseline. E1: final local alignment clean install (612 packages), Astro 13 files/zero diagnostics, lint/format, 90/90 ordinary tests including four actual properties, both disposable faults, checked 13-file/133500-byte build and 4/4 DOM passed on 6 October 2026 at 23:17-23:18 UTC; focused 1000-run properties passed 4/4 at 23:26 UTC. Refreshed scoped mutation and final independent source review are recorded under T06 and docs/verification.md. E1 provides source/build/DOM evidence, not execution of every listed standalone/browser/container/host command. At preparation the implemented 10-test browser suite and new marker/pinned-image/container/artifact workflow had no alignment runtime/exact-head CI result. E2: actual public/operator/manual/recovery evidence pending. Each record cites the applicable evidence and keeps its remaining blocker. Common restrictions: no unauthorized external write, no fabricated pass, no generated-output repair hiding a source defect.

## Requirement C01: Inventory and repository policy

- Status: verified local inventory/repository policy
- Gate: local foundation
- Applies when: selected static guide
- Depends on: Approved static brief and bounded local template adoption
- Owner: Local implementer
- Blocker and independent work that can continue: No local inventory blocker; commit/push/merge/deploy authority remains separate under AGENTS. Permitted isolated source/tests can continue

### Required behavior

Intended source checkout/branch/pins/routes and current authority recorded. Forbidden effects: Commit/push/merge/deploy/DNS/provider access without corresponding authority.

### Exact files and changes

| Existing/new path                                                                                                   | Required exports/fields/configuration                                                                                                              | Generated/hand-authored rule                                                  |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| AGENTS.md; docs/project-specification.md; docs/bootstrap.md; docs/bootstrap-tasks.md; existing README.md (preserve) | build/template-alignment local branch; baseline 18e7f47692f3a6d9346610cfb8ae3228ac7d907e matches remote 702b290 tree; no new publication authority | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                          | Expected observable result                                                                                    | Actual result or pending                                                     |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| git status --short; git branch --show-current; git remote -v; git rev-parse HEAD | Inventory and profile match actual repository, all changed paths are intended and current boundaries recorded | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                             | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Intended source checkout/branch/pins/routes and current authority recorded                     | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Unrelated edits/main/owner README remain unchanged; reject actions outside current local scope | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                               | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Branch/head and intended alignment paths inspected; README SHA-256 preserved
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: No local inventory blocker; commit/push/merge/deploy authority remains separate under AGENTS
- Done criterion: Inventory and profile match actual repository, all changed paths are intended and current boundaries recorded

## Requirement C02: Pinned compatible toolchain

- Status: verified local pinned toolchain/clean install
- Gate: local foundation
- Applies when: selected static guide
- Depends on: C01
- Owner: Local implementer
- Blocker and independent work that can continue: Actual Windows and current pinned-image runtime were not tested; no additional provider/dependency selected. Permitted isolated source/tests can continue

### Required behavior

Locked clean install preserves lockfile and declared runtime/CI/container compatibility. Forbidden effects: Second lockfile, unsolicited provider dependency, copied credentials, ignored install failure.

### Exact files and changes

| Existing/new path                                                                                    | Required exports/fields/configuration                                                                                                                                                                                               | Generated/hand-authored rule                                                  |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| package.json; package-lock.json; .node-version; .gitignore; Dockerfile; .github/workflows/checks.yml | Node 24.19.0/npm 11.9.0/Astro 7.3.6; one npm lockfile; fast-check 4.10.2; tool/dev packages only; yaml@2.9.1 explicit dev-only structured CI-policy parser (same already-pinned transitive version); selected ignores from template | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                         | Expected observable result                                                                      | Actual result or pending                                                     |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| node --version; npm --version; sha256sum package-lock.json; npm ci; sha256sum package-lock.json | Clean locked install plus observed tool versions match metadata and lock hash remains unchanged | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                              | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Locked clean install preserves lockfile and declared runtime/CI/container compatibility         | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Missing required tools/native artifacts fail visibly; optional provider credentials unnecessary | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Clean npm ci installed 612 packages; Node/npm/Astro pins and unchanged lock hash recorded in verification.md
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Actual Windows and current pinned-image runtime were not tested; no additional provider/dependency selected
- Done criterion: Clean locked install plus observed tool versions match metadata and lock hash remains unchanged

## Requirement C03: Executable quality commands

- Status: verified local executable quality commands
- Gate: local foundation
- Applies when: selected static guide
- Depends on: C02
- Owner: Local implementer
- Blocker and independent work that can continue: Actual Windows runtime remains untested. Permitted isolated source/tests can continue

### Required behavior

Real tool commands pass corrected source in documented order. Forbidden effects: Empty success scripts, swallowed errors, shell argument evaluation.

### Exact files and changes

| Existing/new path                                                                                    | Required exports/fields/configuration                                                                                                  | Generated/hand-authored rule                                                  |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| package.json; scripts/astro.mjs; tsconfig.json; eslint.config.mjs; .prettierrc.json; .prettierignore | Implemented check/lint/format/test/build scripts; launcher disables telemetry, forwards literal args/interruption, stops failed stages | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting                  | Build/runtime + public/private | Safe default | Validation/bounds         | Missing/invalid behavior                        |
| ------------------------ | ------------------------------ | ------------ | ------------------------- | ----------------------------------------------- |
| ASTRO_TELEMETRY_DISABLED | Private build/dev tooling      | 1            | Fixed launcher/CI disable | Script supplies it; failed tooling stays failed |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                        | Expected observable result                                                                        | Actual result or pending                                                     |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| npm run check; npm run lint; npm run format:check; npm test; npm run test:fault; npm run build | Actual tools execute/fail as contracted, final checks pass and supported platform limits recorded | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                                                      | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Real tool commands pass corrected source in documented order                                                            | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Launcher invalid command/failing child/interruption and source defect regressions reject; tests/astro-launcher.test.mjs | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                                        | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final check/lint/format/ordinary/fault/build/DOM commands and Linux launcher subprocess cases passed
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Actual Windows runtime remains untested
- Done criterion: Actual tools execute/fail as contracted, final checks pass and supported platform limits recorded

## Requirement C04: Routes and environment contracts

- Status: verified local route/environment/output contracts
- Gate: local foundation
- Applies when: selected static guide
- Depends on: C01; C02; intended apex selected
- Owner: Local implementer
- Blocker and independent work that can continue: Actual host/proxy/error/cache observations remain separate runtime gates. Permitted isolated source/tests can continue

### Required behavior

Exact apex/trailing slash accepted; preview off; canonical strips query/hash; valid public commit emitted. Forbidden effects: Origin lookalike fallback, credential/build-host leakage, tracker activation.

### Exact files and changes

| Existing/new path                                                                                                                                                                         | Required exports/fields/configuration                                                                                                                 | Generated/hand-authored rule                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| astro.config.mjs; src/lib/site-config.mjs; .env.example; docs/routes.md; docs/environment.md; src/lib/build-provenance.mjs; scripts/generate-hosting.mjs; tests/build-provenance.test.mjs | SITE_URL exact approved HTTPS apex; SITE_RELEASE literal boolean; SITE_COMMIT full lower-case SHA with release requirement; no private runtime config | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting      | Build/runtime + public/private | Safe default                                | Validation/bounds                                                   | Missing/invalid behavior                          |
| ------------ | ------------------------------ | ------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| SITE_URL     | Public build                   | Exact apex in preview; explicit for release | Literal HTTPS apex, optional /; no port/credentials/path/query/hash | Invalid fails; release missing fails              |
| SITE_RELEASE | Public build                   | false                                       | Literal true/false                                                  | Missing false; invalid fails                      |
| SITE_COMMIT  | Public build                   | Unset/empty preview null                    | 40 lowercase hex; release required                                  | Malformed nonempty or missing/empty release fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                              | Expected observable result                                                                         | Actual result or pending                                                     |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| node --test tests/config.test.mjs tests/actual-contracts.pbt.test.mjs; npm run build | Actual configuration rejects invalid boundaries and complete route/env matrices match built output | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                                                                        | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Exact apex/trailing slash accepted; preview off; canonical strips query/hash; valid public commit emitted                                 | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Wrong host/port/credentials/path/query/nonliteral flags or invalid/missing release SHA fail; tests/config.test.mjs and marker regressions | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                                                          | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: P01/P02 fixed literal canonical and exact apex oracle
- Generator domain and per-run state reset: Unicode query/hash and hostile hostname generators; pure per-case state
- Concrete detectable fault: Raw-query canonical or suffix-origin acceptance
- Regression / actual replay seed-path: Known URL query/credentials/port/lookalike regressions; no fabricated seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final config/property/marker rejection cases and checked output passed; route/environment registry records actual selected settings
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Actual host/proxy/error/cache observations remain separate runtime gates
- Done criterion: Actual configuration rejects invalid boundaries and complete route/env matrices match built output

## Requirement C05: Honest build and failure boundaries

- Status: verified local honest build/failure contracts
- Gate: local foundation
- Applies when: selected static guide
- Depends on: C03; C04
- Owner: Local implementer
- Blocker and independent work that can continue: Current Nginx/HTTP runtime remains separate; no generated output was hand-repaired. Permitted isolated source/tests can continue

### Required behavior

Expected readable guide/fixture articles/assets/marker generated and checked. Forbidden effects: Report absent output/provider delivery as success, blanket home fallback, unsafe-inline.

### Exact files and changes

| Existing/new path                                                                                                         | Required exports/fields/configuration                                                                       | Generated/hand-authored rule                                                  |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| scripts/astro.mjs; scripts/check-output.mjs; scripts/generate-hosting.mjs; src/lib/hosting-headers.mjs; deploy/nginx.conf | Build stages share origin/indexing/commit values and stop on failure; real 404/no-store; exact artifact CSP | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting      | Build/runtime + public/private | Safe default                                | Validation/bounds                                                   | Missing/invalid behavior                          |
| ------------ | ------------------------------ | ------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| SITE_URL     | Public build                   | Exact apex in preview; explicit for release | Literal HTTPS apex, optional /; no port/credentials/path/query/hash | Invalid fails; release missing fails              |
| SITE_RELEASE | Public build                   | false                                       | Literal true/false                                                  | Missing false; invalid fails                      |
| SITE_COMMIT  | Public build                   | Unset/empty preview null                    | 40 lowercase hex; release required                                  | Malformed nonempty or missing/empty release fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                                                                          | Expected observable result                                                                                | Actual result or pending                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| node --test tests/astro-launcher.test.mjs tests/review-regressions.test.mjs tests/hosting.test.mjs tests/hosting-headers.test.mjs; npm run build | Malformed/missing required output visibly fails and corrected built artifact satisfies independent checks | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                                                      | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Expected readable guide/fixture articles/assets/marker generated and checked                                            | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Missing/corrupt fixture/build/marker/hash or failed stage rejects; distinct 404-script CSP and missing-path regressions | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                                        | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final launcher/output/CSP/resource-policy negative cases and corrected build passed
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current Nginx/HTTP runtime remains separate; no generated output was hand-repaired
- Done criterion: Malformed/missing required output visibly fails and corrected built artifact satisfies independent checks

## Requirement C06: Test foundation and normal discovery

- Status: verified local normal discovery/target properties
- Gate: local foundation
- Applies when: selected static guide
- Depends on: C02; C03
- Owner: Local implementer
- Blocker and independent work that can continue: New exact-head CI discovery remains pending at preparation; sampling is not exhaustive. Permitted isolated source/tests can continue

### Required behavior

Normal suite includes four named actual properties plus deterministic regressions. Forbidden effects: Toy demo presented as site coverage, filtered properties or silent no-tests success.

### Exact files and changes

| Existing/new path                                                                                                                                    | Required exports/fields/configuration                                                                                      | Generated/hand-authored rule                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| tests/*.test.mjs; tests/actual-contracts.pbt.test.mjs; tests/fixture-policy.mjs; tests/helpers/property-options.mjs; package.json; package-lock.json | Node test runner imports actual production modules; normal wildcard discovers properties; synthetic isolated fixtures only | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting     | Build/runtime + public/private | Safe default | Validation/bounds             | Missing/invalid behavior   |
| ----------- | ------------------------------ | ------------ | ----------------------------- | -------------------------- |
| FC_NUM_RUNS | Private test                   | 100          | Positive decimal safe integer | Invalid/empty fails        |
| FC_SEED     | Private test                   | Unset        | Decimal signed 32-bit         | Invalid/empty fails        |
| FC_PATH     | Private test                   | Unset        | Numeric-colon path plus seed  | Invalid/empty/orphan fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                         | Expected observable result                                                             | Actual result or pending                                                     |
| ------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| npm test; npm run test:property | Normal runner discovers substantive target properties and every discovered test passes | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | --------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Normal suite includes four named actual properties plus deterministic regressions | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Invalid controls and known wrong contracts fail; no production state/data used    | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                  | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: Fixed literal origin and independent 10x2 policy table
- Generator domain and per-run state reset: Unicode/foreign hosts/fixture-mode indexes/operation arrays; reset snapshots inside runs
- Concrete detectable fault: Query leak, prize-action-to-allow, foreign-origin/non-YouTube misrouting
- Regression / actual replay seed-path: Named fixture/control/review regressions; no claim of exhaustive sampling

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final npm test discovered 90 tests and four actual properties, all passed; focused 1000-run properties passed 4/4
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: New exact-head CI discovery remains pending at preparation; sampling is not exhaustive
- Done criterion: Normal runner discovers substantive target properties and every discovered test passes

## Requirement C07: Exact-source continuous integration

- Status: pending new exact-head CI; local CI-policy tests and historical baseline verified
- Gate: integration
- Applies when: selected static guide
- Depends on: C03; C06; authorized publication
- Owner: Local implementer
- Blocker and independent work that can continue: Alignment workflow/runtime had no new exact-head CI at preparation; actual branch protection remains unverified. Permitted isolated source/tests can continue

### Required behavior

Exact intended published source completes source/browser/container workflow. Forbidden effects: Production credential exposure, unauthorized push/deployment/re-run.

### Exact files and changes

| Existing/new path                                                                                   | Required exports/fields/configuration                                                                                                                                                                                                                                  | Generated/hand-authored rule                                                  |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| .github/workflows/checks.yml; scripts/ci-policy.mjs; tests/ci-policy.test.mjs; docs/verification.md | Read-only GitHub contents permission; push/PR normal checks plus separate isolated image job; exact checked-out SITE_COMMIT; no deployment secrets/registry push; structured YAML policy admits only approved SHA-pinned actions and bounded non-hidden artifact paths | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                                                            | Expected observable result                                                                            | Actual result or pending                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| npm run check; npm run lint; npm run format:check; npm test; npm run test:fault; npm run build; npm run test:dom; npm run test:e2e | Authorized alignment publication has successful exact-head runs and required-check policy is observed | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                                                                                                   | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Exact intended published source completes source/browser/container workflow                                                                                                          | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Unknown/unpinned/build-push actions, privileged triggers and unsafe artifact paths reject; blocked/failed/mismatched/stale head cannot complete gate; branch protection not inferred | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                                                                                                     | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final structured CI-policy and bounded artifact-path regressions passed locally
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Alignment workflow/runtime had no new exact-head CI at preparation; actual branch protection remains unverified
- Done criterion: Authorized alignment publication has successful exact-head runs and required-check policy is observed

## Requirement C08: Public reuse and license hygiene

- Status: local template notices adopted; no owner public-license gate applies (owner decision, 15 October 2026)
- Gate: release
- Applies when: selected static guide
- Depends on: C01; exact upstream template pin; owner source-license decision
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: Content review pending; dependency license audit not claimed. Permitted isolated source/tests can continue

### Required behavior

Exact source/blob/target map and original upstream notice retained; original assets/fixtures stay project-authored. Forbidden effects: Repository-wide MIT grant, copied client data, new public publication without approval.

### Exact files and changes

| Existing/new path                                                                                                                                    | Required exports/fields/configuration                                                                                             | Generated/hand-authored rule                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| THIRD_PARTY_NOTICES.md; docs/template-provenance.md; AGENTS.md; .env.example; .gitignore; tests/helpers/property-options.mjs; original source/assets | Pinned upstream MIT applies only adopted portions; package.json license stays UNLICENSED; omit unselected identities/IDs/settings | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting                 | Build/runtime + public/private | Safe default                                            | Validation/bounds                              | Missing/invalid behavior                    |
| ----------------------- | ------------------------------ | ------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| Owner/operator decision | Release/operator scope         | No unconfirmed identity/license/retention/release value | Explicit approved decision + observed evidence | Unknown remains pending; never invent value |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                   | Expected observable result                                                                                                         | Actual result or pending                                                                                          |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| git diff --check; git diff -- AGENTS.md docs THIRD_PARTY_NOTICES.md; npm run format:check | All copied/adapted assets attributed with actual blob SHAs and scoped notice; owner completes content review before public release | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                                 | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Exact source/blob/target map and original upstream notice retained; original assets/fixtures stay project-authored | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Review rejects copied brands/domains/recipients/secrets, generated private files or broad relicensing              | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                                   | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Scoped template/helper MIT attribution and actual blob mappings retained; original source remains UNLICENSED
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Content review pending; dependency license audit not claimed
- Done criterion: All copied/adapted assets attributed with actual blob SHAs and scoped notice; owner completes content review before public release

## Requirement C09: Developer handoff and separate gates

- Status: verified local developer handoff/status record
- Gate: local foundation
- Applies when: selected static guide
- Depends on: C01-C08; S01-S09; T01-T07
- Owner: Local implementer
- Blocker and independent work that can continue: Current browser/container/exact-head workflow, manual and owner/production gates remain explicit separate requirements. Permitted isolated source/tests can continue

### Required behavior

Fresh developer can follow locked-install/check/build/preview/limits without credentials. Forbidden effects: Describe CI/container/DOM as manual visual/public host/provider certification.

### Exact files and changes

| Existing/new path                                                                                                     | Required exports/fields/configuration                                                                                    | Generated/hand-authored rule                                                  |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| docs/development.md; bootstrap.md; bootstrap-tasks.md; routes.md; environment.md; verification.md; release-runbook.md | Actual commands and profile; original-source license/publication/host gates distinct; no owner/operator contact invented | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                 | Expected observable result                                                                | Actual result or pending                                                     |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| npm run format:check; git diff --check; npm run build; npm run test:dom | Complete truthful command/evidence handoff matches current source and pending owner gates | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                          | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Fresh developer can follow locked-install/check/build/preview/limits without credentials    | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Handoff identifies unrun/blocked/operator gates; stale evidence never claims new local pass | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                            | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final source/artifact hashes, command counts, scoped mutation and dated publication checkpoint recorded
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current browser/container/exact-head workflow, manual and owner/production gates remain explicit separate requirements
- Done criterion: Complete truthful command/evidence handoff matches current source and pending owner gates

## Requirement S01: Files-only Astro output

- Status: verified local files-only build; current served-output runtime pending
- Gate: local foundation
- Applies when: selected static guide
- Depends on: C02-C05
- Owner: Local implementer
- Blocker and independent work that can continue: Current served HTTP/container observations require permitted exact-source runtime; production remains pending. Permitted isolated source/tests can continue

### Required behavior

Root builds prerendered readable HTML/assets with correct origin. Forbidden effects: Claim static files execute private endpoint or consume host runtime secrets.

### Exact files and changes

| Existing/new path                                                                   | Required exports/fields/configuration                                                       | Generated/hand-authored rule                                                  |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| astro.config.mjs; src/lib/site-config.mjs; src/pages/index.astro; scripts/astro.mjs | output static; no adapter; directory format; trailingSlash always; exact intended canonical | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting      | Build/runtime + public/private | Safe default                                | Validation/bounds                                                   | Missing/invalid behavior                          |
| ------------ | ------------------------------ | ------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| SITE_URL     | Public build                   | Exact apex in preview; explicit for release | Literal HTTPS apex, optional /; no port/credentials/path/query/hash | Invalid fails; release missing fails              |
| SITE_RELEASE | Public build                   | false                                       | Literal true/false                                                  | Missing false; invalid fails                      |
| SITE_COMMIT  | Public build                   | Unset/empty preview null                    | 40 lowercase hex; release required                                  | Malformed nonempty or missing/empty release fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                      | Expected observable result                                         | Actual result or pending                                                     |
| ---------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| npm run check; npm run build | Clean static build and selected served-output checks match profile | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                      | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ----------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Root builds prerendered readable HTML/assets with correct origin        | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Invalid origin fails before output; runtime secrets/server route absent | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                        | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final Astro static build passed with 13 public files, 133500 bytes, no server adapter/application endpoint
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current served HTTP/container observations require permitted exact-source runtime; production remains pending
- Done criterion: Clean static build and selected served-output checks match profile

## Requirement S02: Semantic responsive interactions

- Status: pending current browser/manual UI evidence; local source/DOM verified
- Gate: local foundation
- Applies when: selected static guide
- Depends on: S01; S03; C06
- Owner: Local implementer
- Blocker and independent work that can continue: Current 10-test browser execution, screenshots, true 200% zoom, screen-reader announcements/AT remain pending. Permitted isolated source/tests can continue

### Required behavior

Preset/mode/reset/restored state, workflow and checklist update; keyboard/320-1280/reduced-motion/axe baseline pass. Forbidden effects: Hide essential content, fabricated screenshots/AT result, unexpected scrolling/action.

### Exact files and changes

| Existing/new path                                                                                                                                                                                              | Required exports/fields/configuration                                                                              | Generated/hand-authored rule                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| src/layouts/BaseLayout.astro; src/styles/site.css; src/components/ScenarioExplorer.astro inline enhancement; BaseLayout.astro inline navigation; tests/dom/interactions.test.mjs; tests/browser/guide.spec.mjs | Semantic layout, skip link/inward focus target, announced result, responsive local enhancement; no-JS core content | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                           | Expected observable result                                                                   | Actual result or pending                                                     |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| npm run build; npm run test:dom; npm run test:e2e | Automated current built behavior plus real mobile/desktop/focus/200% zoom/AT review evidence | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                                                  | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Preset/mode/reset/restored state, workflow and checklist update; keyboard/320-1280/reduced-motion/axe baseline pass | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | No-JS/failed-module preserves ten readable cases; no focus trap/overflow/external requests/storage                  | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                                    | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final source/UI regressions and 4/4 compiled-DOM checks passed
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current 10-test browser execution, screenshots, true 200% zoom, screen-reader announcements/AT remain pending
- Done criterion: Automated current built behavior plus real mobile/desktop/focus/200% zoom/AT review evidence

## Requirement S03: Original fictional content and policy

- Status: verified local fictional content/policy/output contracts
- Gate: local foundation
- Applies when: selected static guide
- Depends on: S01; approved guide/content brief
- Owner: Local implementer
- Blocker and independent work that can continue: No live AI/moderation-provider prediction or accuracy claim; owner content review remains a release gate. Permitted isolated source/tests can continue

### Required behavior

Each real article has text/context/both explanations; criticism/complaints allowed; missing context reviewed. Forbidden effects: Real comment data, fake proof/accuracy/model call, invented legal identity.

### Exact files and changes

| Existing/new path                                                                                                                                   | Required exports/fields/configuration                                                                            | Generated/hand-authored rule                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| src/data/scenarios.mjs; src/pages/index.astro; src/lib/scenario-rules.mjs; tests/fixture-policy.mjs; docs/content-evidence.md; src/content/page.mjs | Ten unique versioned synthetic cases; cautious/stricter; independent literal 10x2 oracle; render strings as text | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                                                   | Expected observable result                                                                          | Actual result or pending                                                     |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| node --test tests/scenarios.test.mjs tests/actual-contracts.pbt.test.mjs tests/review-regressions.test.mjs; npm run build | All intended content/policy fields render and independent outcome assertions detect wrong decisions | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                                           | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Each real article has text/context/both explanations; criticism/complaints allowed; missing context reviewed | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Unknown fixture/mode/inherited workflow keys and missing/misplaced/incomplete rendered fixture fail          | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                             | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: Independent literal policy table and YouTube-only product scope
- Generator domain and per-run state reset: Fixture/mode indexes and category operation arrays; snapshot/reset each case
- Concrete detectable fault: Prize fixture action becomes allow; social category recommends product
- Regression / actual replay seed-path: All 20 literal fixture outcomes; inherited-key and rendered-article regressions

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final ten-fixture output and unchanged independent 20 policy assertions passed; both deliberate wrong contracts detected
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: No live AI/moderation-provider prediction or accuracy claim; owner content review remains a release gate
- Done criterion: All intended content/policy fields render and independent outcome assertions detect wrong decisions

## Requirement S05: Original local media and fonts

- Status: pending manual/current media performance review; local output verified
- Gate: local foundation
- Applies when: selected static guide
- Depends on: S02; C08
- Owner: Local implementer
- Blocker and independent work that can continue: Current screenshots and realistic performance review pending. Permitted isolated source/tests can continue

### Required behavior

Built references resolve and original social pixels/readability inspected baseline. Forbidden effects: Unlicensed/copied brand imagery, hidden remote asset requests.

### Exact files and changes

| Existing/new path                                                                                                          | Required exports/fields/configuration                                                     | Generated/hand-authored rule                                                  |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| public/favicon.svg; public/social-card.svg; public/social-card.png; source SVG/CSS illustration; scripts/render-social.mjs | System fonts/local original assets only; social card 1200x630; sensible layout dimensions | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                         | Expected observable result                                                         | Actual result or pending                                                     |
| ------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| npm run build; npm run test:e2e | Actual output references plus current screenshots/size/layout/performance evidence | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                 | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ---------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Built references resolve and original social pixels/readability inspected baseline | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Missing referenced asset fails; no runtime remote fonts/logos                      | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                   | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final local output passed; original pixel/contrast inspection remains historical evidence
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current screenshots and realistic performance review pending
- Done criterion: Actual output references plus current screenshots/size/layout/performance evidence

## Requirement S06: Canonical search and sharing output

- Status: verified local canonical/search/sharing output
- Gate: local foundation
- Applies when: selected static guide
- Depends on: S01; S03; S05; C04
- Owner: Local implementer
- Blocker and independent work that can continue: Actual redirects/crawler/indexing/AI citation/public host evidence remains pending. Permitted isolated source/tests can continue

### Required behavior

Exact root canonical/social URLs and root-only sitemap with preview policy. Forbidden effects: Invented ratings/schema, duplicate indexable guide pages, noindex as access security.

### Exact files and changes

| Existing/new path                                                                                                              | Required exports/fields/configuration                                                                                                | Generated/hand-authored rule                                                  |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| src/layouts/BaseLayout.astro; src/pages/robots.txt.ts; src/pages/sitemap.xml.ts; src/pages/404.astro; scripts/check-output.mjs | One title/H1/canonical; truthful schema; preview noindex (robots.txt never disallows); authorized release root-only sitemap/indexing | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting      | Build/runtime + public/private | Safe default                                | Validation/bounds                                                   | Missing/invalid behavior                          |
| ------------ | ------------------------------ | ------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| SITE_URL     | Public build                   | Exact apex in preview; explicit for release | Literal HTTPS apex, optional /; no port/credentials/path/query/hash | Invalid fails; release missing fails              |
| SITE_RELEASE | Public build                   | false                                       | Literal true/false                                                  | Missing false; invalid fails                      |
| SITE_COMMIT  | Public build                   | Unset/empty preview null                    | 40 lowercase hex; release required                                  | Malformed nonempty or missing/empty release fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                              | Expected observable result                                              | Actual result or pending                                                     |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| node --test tests/config.test.mjs tests/actual-contracts.pbt.test.mjs; npm run build | Built metadata/sitemap/robots agree with known route/indexing inventory | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                             | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Exact root canonical/social URLs and root-only sitemap with preview policy                     | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Query/fragment/credential/private/operational marker paths excluded; 404 no homepage canonical | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                               | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: Canonical oracle is literal https://aicommentmoderation.com/
- Generator domain and per-run state reset: Unicode query/fragment, reset pure URL state
- Concrete detectable fault: Returning raw URL href leaks query/fragment
- Regression / actual replay seed-path: Known email/UTM/hash regression; disposable query-leak fault

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final exact-origin/canonical/robots/resource/fragment regressions and build passed; one canonical URL
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Actual redirects/crawler/indexing/AI citation/public host evidence remains pending
- Done criterion: Built metadata/sitemap/robots agree with known route/indexing inventory

## Requirement S07: Genuine errors and no migration

- Status: pending current HTTP/deployed-host evidence; local error source/output verified
- Gate: integration
- Applies when: selected static guide
- Depends on: S01; C04; C05
- Owner: Local implementer
- Blocker and independent work that can continue: Current marker/missing-asset HTTP smoke and actual public redirect/status/cache behavior pending. Permitted isolated source/tests can continue

### Required behavior

Existing root/assets return intended output; missing path helpful real 404. Forbidden effects: Blanket home redirect, open redirect, forwarded arbitrary personal query, invented migration.

### Exact files and changes

| Existing/new path                                                              | Required exports/fields/configuration                                                                            | Generated/hand-authored rule                                                  |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| src/pages/404.astro; deploy/nginx.conf; scripts/smoke-host.mjs; docs/routes.md | Real unknown-path 404/noindex/no-store; internal 404 file; no retired-domain migration; public redirects pending | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                            | Expected observable result                                              | Actual result or pending                                                                                          |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| npm run build; npm run test:e2e; node scripts/smoke-host.mjs http://127.0.0.1:8080 | Actual selected host statuses/error headers/cache match route inventory | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Existing root/assets return intended output; missing path helpful real 404                        | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Missing asset/dotfile/direct healthz.txt/404.html rejected; no home canonical/status-200 fallback | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                  | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final error/CSP/missing-resource source regressions passed; E0 real isolated/browser 404 remains historical
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current marker/missing-asset HTTP smoke and actual public redirect/status/cache behavior pending
- Done criterion: Actual selected host statuses/error headers/cache match route inventory

## Requirement S08: Built-output and browser verification

- Status: pending alignment browser/manual execution; local build/DOM verified
- Gate: integration
- Applies when: selected static guide
- Depends on: S01-S07; C06; T05
- Owner: Local implementer
- Blocker and independent work that can continue: Current 10-test browser suite remains unrun locally; manual and exact-head runtime CI pending at preparation. Permitted isolated source/tests can continue

### Required behavior

Metadata/assets/fixture/output plus actual compiled behavior/browser/no-JS/keyboard/network checks pass. Forbidden effects: DOM simulation labeled screenshot/visual/AT proof, unrelated artifact tested.

### Exact files and changes

| Existing/new path                                                                                                                      | Required exports/fields/configuration                                                                        | Generated/hand-authored rule                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| scripts/check-output.mjs; tests/dom/interactions.test.mjs; tests/browser/guide.spec.mjs; playwright.config.mjs; scripts/smoke-host.mjs | Test actual production dist; preview foreground --ignore-lock on loopback4531; original content/no collector | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                           | Expected observable result                                                              | Actual result or pending                                                                                          |
| ------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| npm run build; npm run test:dom; npm run test:e2e | Current artifact passes required built/DOM/browser contracts and manual limits recorded | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                      | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Metadata/assets/fixture/output plus actual compiled behavior/browser/no-JS/keyboard/network checks pass | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Wrong/missing built content fails; blocked browser startup explicitly unverified                        | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                        | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final checked 13-file artifact and 4/4 DOM passed
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current 10-test browser suite remains unrun locally; manual and exact-head runtime CI pending at preparation
- Done criterion: Current artifact passes required built/DOM/browser contracts and manual limits recorded

## Requirement S09: Static readiness and release boundary

- Status: pending runtime/manual/production gates; local automated source verified
- Gate: release
- Applies when: selected static guide
- Depends on: C09; S01-S08; T01-T07; applicable D gates
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: Current browser/container/exact-head CI, manual UI and operator release gates remain open. Permitted isolated source/tests can continue

### Required behavior

Reproducible meaningful foundation plus observed current built/browser behavior. Forbidden effects: Claim deployed/indexed/cited/converted/production-ready from CI or health.

### Exact files and changes

| Existing/new path                                                                 | Required exports/fields/configuration                                                           | Generated/hand-authored rule                                                  |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| docs/bootstrap.md; docs/verification.md; docs/release-runbook.md; docs/coolify.md | Local/source/browser/isolated host/actual provider/production each separate; no backend implied | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                                                                    | Expected observable result                                                                                       | Actual result or pending                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| npm ci; npm run check; npm run lint; npm run format:check; npm test; npm run test:fault; npm run build; npm run test:dom; npm run test:e2e | All selected local/integration evidence complete; actual public release only after separate D evidence/authority | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                              | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Reproducible meaningful foundation plus observed current built/browser behavior | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Any missing manual/deployed/source-license/identity gate stays pending          | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final source/property/fault/build/DOM checks and independent source review passed
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current browser/container/exact-head CI, manual UI and operator release gates remain open
- Done criterion: All selected local/integration evidence complete; actual public release only after separate D evidence/authority

## Requirement T01: Normal runner and property discovery

- Status: verified local normal/property discovery; exact-head CI pending at preparation
- Gate: local foundation
- Applies when: selected static guide
- Depends on: C02; C03; C06
- Owner: Local implementer
- Blocker and independent work that can continue: Fresh exact-head CI discovery remains separate from the local runner result. Permitted isolated source/tests can continue

### Required behavior

Named target properties and deterministic tests run from real modules. Forbidden effects: No-tests green, toy-only coverage, excluding properties to pass.

### Exact files and changes

| Existing/new path                                                                                            | Required exports/fields/configuration                                                                  | Generated/hand-authored rule                                                  |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| package.json test/property scripts; tests/*.test.mjs; tests/actual-contracts.pbt.test.mjs; package-lock.json | Node --test tests/*.test.mjs discovers four actual properties; focused script supplements normal suite | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting     | Build/runtime + public/private | Safe default | Validation/bounds             | Missing/invalid behavior   |
| ----------- | ------------------------------ | ------------ | ----------------------------- | -------------------------- |
| FC_NUM_RUNS | Private test                   | 100          | Positive decimal safe integer | Invalid/empty fails        |
| FC_SEED     | Private test                   | Unset        | Decimal signed 32-bit         | Invalid/empty fails        |
| FC_PATH     | Private test                   | Unset        | Numeric-colon path plus seed  | Invalid/empty/orphan fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                         | Expected observable result                                                                  | Actual result or pending                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| npm test; npm run test:property | Ordinary suite/CI discovery records actual named meaningful properties and fresh test count | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                                 | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Named target properties and deterministic tests run from real modules                              | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Invalid control and known wrong contract failures visible; generated/vendor/tmp artifacts excluded | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                   | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: P01-P04 actual canonical/origin/policy/workflow contracts
- Generator domain and per-run state reset: Defined bounded Unicode/host/fixture/sequence domains; no shared mutable run state
- Concrete detectable fault: Concrete query/policy/route wrong behavior
- Regression / actual replay seed-path: Independent oracle and deterministic tests, detailed in testing-invariants.md

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final normal runner discovered 90 tests including four meaningful properties; focused 1000-run properties passed 4/4
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Fresh exact-head CI discovery remains separate from the local runner result
- Done criterion: Ordinary suite/CI discovery records actual named meaningful properties and fresh test count

## Requirement T02: Independent invariant register

- Status: verified local invariant register/fault evidence
- Gate: local foundation
- Applies when: selected static guide
- Depends on: Approved guide/config/data/route contracts; T01
- Owner: Local implementer
- Blocker and independent work that can continue: Mutation/property sampling does not complete browser/manual/operator requirements. Permitted isolated source/tests can continue

### Required behavior

Fixed canonical and separate literal 10x2 policy oracle match intended guide behavior. Forbidden effects: Expected result computed only from tested implementation; invented required rule.

### Exact files and changes

| Existing/new path                                                                                          | Required exports/fields/configuration                                                                            | Generated/hand-authored rule                                                  |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| docs/testing-invariants.md; tests/fixture-policy.mjs; tests/config.test.mjs; actual-contracts.pbt.test.mjs | Document boundaries/oracle/generator/observations/fault/regression/evidence/limitations before claiming coverage | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                                            | Expected observable result                                                                             | Actual result or pending                                                     |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| node --test tests/config.test.mjs tests/scenarios.test.mjs tests/actual-contracts.pbt.test.mjs; npm run test:fault | Review independently specified invariants and observed relevant fault detection, including limitations | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                    | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Fixed canonical and separate literal 10x2 policy oracle match intended guide behavior | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Wrong prize outcome/raw query fail even when implementation remains self-consistent   | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                      | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: Literal approved root, independent policy table, documented YouTube-only scope
- Generator domain and per-run state reset: Unicode/host/case/mode/sequence bounds; fresh snapshots inside each predicate
- Concrete detectable fault: Raw URL canonical; prize action-to-allow
- Regression / actual replay seed-path: Literal prize and query regression; no recorded fabricated seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Independent canonical/origin/fixture/YouTube/hosting/marker contracts reviewed and relevant local regression/fault cases passed
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Mutation/property sampling does not complete browser/manual/operator requirements
- Done criterion: Review independently specified invariants and observed relevant fault detection, including limitations

## Requirement T03: Actual properties and per-run state

- Status: verified local actual properties/per-run state
- Gate: local foundation
- Applies when: selected static guide
- Depends on: T01; T02
- Owner: Local implementer
- Blocker and independent work that can continue: Sampling is bounded; no genuine shrunk failure replay recorded for this alignment. Permitted isolated source/tests can continue

### Required behavior

Four real properties verify output and absent fixture mutation. Forbidden effects: Shared mutated fixtures, properties return unasserted truth, hidden external effects.

### Exact files and changes

| Existing/new path                                                                                                | Required exports/fields/configuration                                                                | Generated/hand-authored rule                                                  |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| tests/actual-contracts.pbt.test.mjs; src/lib/site-config.mjs; src/lib/scenario-rules.mjs; src/data/scenarios.mjs | Block-bodied assertion predicates; production functions real; fixture before-state unchanged per run | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting     | Build/runtime + public/private | Safe default | Validation/bounds             | Missing/invalid behavior   |
| ----------- | ------------------------------ | ------------ | ----------------------------- | -------------------------- |
| FC_NUM_RUNS | Private test                   | 100          | Positive decimal safe integer | Invalid/empty fails        |
| FC_SEED     | Private test                   | Unset        | Decimal signed 32-bit         | Invalid/empty fails        |
| FC_PATH     | Private test                   | Unset        | Numeric-colon path plus seed  | Invalid/empty/orphan fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                          | Expected observable result                                                           | Actual result or pending                                                     |
| ------------------------------------------------ | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| npm test; FC_NUM_RUNS=1000 npm run test:property | Actual property suite passes independent invariants and leaves input state unchanged | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                          | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | --------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Four real properties verify output and absent fixture mutation              | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Hostile foreign hostname and operation sequences never alter approved scope | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                            | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: Fixed root/origin/policy/workflow contract
- Generator domain and per-run state reset: Unicode strings, host labels1-40, fixture indexes0-9/two modes, categories sequences1-30; reset per case
- Concrete detectable fault: Query leak, foreign origin, wrong policy, unsupported product recommendation
- Regression / actual replay seed-path: Existing literal policy/origin regressions; sampling is not exhaustive

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Four actual fast-check properties passed in final ordinary suite and focused 1000-run check; fixture mutation/policy regressions passed
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Sampling is bounded; no genuine shrunk failure replay recorded for this alignment
- Done criterion: Actual property suite passes independent invariants and leaves input state unchanged

## Requirement T04: Strict shared controls and replay

- Status: verified local strict helper/controls/focused properties
- Gate: local foundation
- Applies when: selected static guide
- Depends on: T01; pinned actual helper; compatible fast-check4.10.2
- Owner: Local implementer
- Blocker and independent work that can continue: No genuine shrunk failure seed/path for this alignment; any future failure requires named-property replay; sampling is not exhaustive. Permitted isolated source/tests can continue

### Required behavior

Default/options/boundary seeds accepted and actual property file imports shared helper. Forbidden effects: Fabricated replay values, silent coercion or masking failure by weakening domains.

### Exact files and changes

| Existing/new path                                                                                                                    | Required exports/fields/configuration                                                                                                              | Generated/hand-authored rule                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| tests/helpers/property-options.mjs; tests/actual-contracts.pbt.test.mjs; tests/property-options.test.mjs; docs/testing-invariants.md | FC_NUM_RUNS defaults100 decimal safe-positive; FC_SEED signed32; FC_PATH numeric colon path requires seed; helper copied from exact upstream asset | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting     | Build/runtime + public/private | Safe default | Validation/bounds             | Missing/invalid behavior   |
| ----------- | ------------------------------ | ------------ | ----------------------------- | -------------------------- |
| FC_NUM_RUNS | Private test                   | 100          | Positive decimal safe integer | Invalid/empty fails        |
| FC_SEED     | Private test                   | Unset        | Decimal signed 32-bit         | Invalid/empty fails        |
| FC_PATH     | Private test                   | Unset        | Numeric-colon path plus seed  | Invalid/empty/orphan fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                                                                                                                   | Expected observable result                                                                                                       | Actual result or pending                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| npm test; FC_NUM_RUNS=1000 npm run test:property; node --test --test-name-pattern="property: arbitrary query and fragment cannot leak into canonical" tests/actual-contracts.pbt.test.mjs | Fresh strict-helper regressions and ordinary/1000-run actual properties pass; any future failure replays only its named property | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                                   | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Default/options/boundary seeds accepted and actual property file imports shared helper               | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Empty/padded/signed/hex/exponent/zero/unsafe runs; seed overflow/empty; malformed/orphan path reject | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                     | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: Strict literal run/seed/path control contract independent of Number coercion
- Generator domain and per-run state reset: Control boundary matrix and four target property domains; env passed explicitly
- Concrete detectable fault: Accept exponent/hex/padding or path without seed
- Regression / actual replay seed-path: Subprocess regressions invoke the actual property suite, not helper alone

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final strict-helper/replay-control subprocess regressions passed; 23:26 UTC focused 1000-run properties passed 4/4
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: No genuine shrunk failure seed/path for this alignment; any future failure requires named-property replay; sampling is not exhaustive
- Done criterion: Fresh strict-helper regressions and ordinary/1000-run actual properties pass; any future failure replays only its named property

## Requirement T05: Layered verification of selected profile

- Status: pending browser/HTTP/manual layers; local source/build/DOM verified
- Gate: integration
- Applies when: selected static guide
- Depends on: T01-T04; S08; selected Docker preparation
- Owner: Local implementer
- Blocker and independent work that can continue: Current alignment browser/container/exact-head workflow and actual Coolify/AT remain pending. Permitted isolated source/tests can continue

### Required behavior

Each available layer observes its real target and named scope. Forbidden effects: Conflate mock/DOM/source file with real browser/HTTP/provider/public host.

### Exact files and changes

| Existing/new path                                                                                                                             | Required exports/fields/configuration                                                                                                         | Generated/hand-authored rule                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| scripts/check-output.mjs; tests/dom/interactions.test.mjs; tests/browser/guide.spec.mjs; scripts/smoke-host.mjs; .github/workflows/checks.yml | Pure/config/unit -> built files -> compiled DOM -> actual browser -> isolated Nginx -> future deployed host; no provider mocks as integration | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                              | Expected observable result                                                                                      | Actual result or pending                                                                                          |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| npm run build; npm run test:dom; npm run test:e2e; node scripts/smoke-host.mjs http://127.0.0.1:8080 | Fresh source/build/DOM/browser/selected HTTP results identify tested artifact and unresolved host/manual layers | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                        | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Each available layer observes its real target and named scope                                             | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Browser launch/container/host unavailability remains pending; injected missing/corrupt built output fails | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                          | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final source/property/fault/build/DOM layers passed; E0 browser/container results remain historical
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current alignment browser/container/exact-head workflow and actual Coolify/AT remain pending
- Done criterion: Fresh source/build/DOM/browser/selected HTTP results identify tested artifact and unresolved host/manual layers

## Requirement T06: Faults scoped mutation and review

- Status: verified local known faults/scoped mutation/survivor and source review
- Gate: local foundation
- Applies when: selected static guide
- Depends on: T02; meaningful src/lib domain logic; runner-compatible Stryker decision
- Owner: Local implementer
- Blocker and independent work that can continue: Scoped mutation verifies exact inputs and reported credit/coverage only; current browser/container/manual/public-host gates remain separate. Permitted isolated source/tests can continue

### Required behavior

Both deliberate disposable wrong contracts turn relevant tests red and correct source stays unchanged. Forbidden effects: Leave mutant in production, fabricate score, weaken tests or mark full T06 complete from two faults.

### Exact files and changes

| Existing/new path                                                                                                                                                              | Required exports/fields/configuration                                                                                                                                                                                                                                                        | Generated/hand-authored rule                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| scripts/verify-fault.mjs; tests/fixture-policy.mjs; actual-contracts.pbt.test.mjs; stryker.config.json; scripts/run-mutation.mjs; tests/mutation-config.test.mjs; package.json | Disposable known query/policy faults; full applicable Stryker --ignoreStatic run/accounting; preserve existing assertions/thresholds; ignoreStatic=true; concurrency=1; perTest coverage; no in-place/incremental; display high 80/low 60 and break:null; no universal mutation-score target | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting                  | Build/runtime + public/private | Safe default                      | Validation/bounds                                                                | Missing/invalid behavior                       |
| ------------------------ | ------------------------------ | --------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------- |
| FC_SEED / FC_NUM_RUNS    | Private mutation test          | 20261006 / 100                    | Shared strict helper bounds; valid explicit overrides                            | Invalid fails                                  |
| FC_PATH                  | Private mutation test          | Absent                            | Forbidden for authoritative full run                                             | Any supplied value fails                       |
| Mutation scope/isolation | Private test config            | Two actual modules; concurrency 1 | Actual properties + independent regressions; ignoreStatic; no thresholds relaxed | Unrun/failed dry/full/accounting stays pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                        | Expected observable result                                                                                                                                           | Actual result or pending                                                                                                                 |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| npm run test:fault; npm test; npm run test:mutation:dry; npm run test:mutation | Compatible scoped Stryker --ignoreStatic actually executes target modules; independent survivor/timeout/no-coverage and property-vs-example kill accounting reviewed | E1 final known faults/ordinary suite passed; refreshed 23:14 UTC scoped run exit 0, 154/156 killed and two reviewed equivalent survivors |

### Required tests

| Case                   | Input/state/action                                                                                                          | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Both deliberate disposable wrong contracts turn relevant tests red and correct source stays unchanged                       | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Inspect real scoped survivors/timeouts/no-coverage and properties participation before completion; no universal 100% target | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                                            | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: Independent query privacy/policy literal oracle
- Generator domain and per-run state reset: Actual relevant properties/regressions; disposable state/copies
- Concrete detectable fault: Canonical raw query and prize action-to-allow
- Regression / actual replay seed-path: Both known faults documented; genuine surviving gaps require regression evidence

### Completion evidence

- Actual commands, exit results and discovered names/counts: E1 final known faults and 90 ordinary tests passed; refreshed scoped run exit 0 at 23:14 UTC, 154/156 killed and two reviewed equivalent survivors; exact results/hash/credit in docs/verification.md
- Built output/browser/persistence/provider observations: Refreshed 23:14:04-23:14:31 UTC actual run passed: 154/156 killed, two equivalent survivors, all other states zero; properties covered 133/156 with zero credited first kills under TAP forceBail; final known faults detected and independent source review found no blocker
- Deliberate-fault/scoped mutation result: Refreshed full scoped run/review and final known faults verified; browser/container/manual/public-host gates separate
- Remaining integration/operator limitations: Scoped mutation verifies exact inputs and reported credit/coverage only; current browser/container/manual/public-host gates remain separate
- Done criterion: Compatible scoped Stryker --ignoreStatic actually executes target modules; independent survivor/timeout/no-coverage and property-vs-example kill accounting reviewed

## Requirement T07: Exact testing evidence and limits

- Status: verified local exact evidence/limits record
- Gate: local foundation
- Applies when: selected static guide
- Depends on: T01-T06; C07; S08
- Owner: Local implementer
- Blocker and independent work that can continue: Current browser/container/exact-head workflow/manual/public-host results still need their own evidence. Permitted isolated source/tests can continue

### Required behavior

Real counts/source identity and test scope recorded without replacing historical evidence. Forbidden effects: Fabricated test name/score/screenshot/provider success or artifact hash.

### Exact files and changes

| Existing/new path                                                             | Required exports/fields/configuration                                                                        | Generated/hand-authored rule                                                  |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| docs/verification.md; docs/bootstrap.md; docs/testing-invariants.md; CI links | Actual source state/versions/discovery/count/results/replay/fault/mutation/browser/provider/host distinction | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                         | Expected observable result                                                                                  | Actual result or pending                                                     |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| npm test; npm run test:fault; npm run build; npm run test:dom; git diff --check | Evidence record identifies actual current commands/counts/source/artifact and all selected unresolved gates | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                           | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Real counts/source identity and test scope recorded without replacing historical evidence    | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Blocked/unrun/currently unpublished checks stay pending; stale CI not reused as local result | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                             | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final command results/counts, local baseline/worktree state, lock/README/preview/report hashes and dated publication checkpoint recorded
- Deliberate-fault/scoped mutation result: Actual scoped T06 run/review recorded in docs/verification.md; broader current-source/manual/public-host checks remain separate
- Remaining integration/operator limitations: Current browser/container/exact-head workflow/manual/public-host results still need their own evidence
- Done criterion: Evidence record identifies actual current commands/counts/source/artifact and all selected unresolved gates

## Requirement L01: Actual host and local data lifecycle

- Status: pending actual host/operator lifecycle; local fictional source/DOM effects verified
- Gate: release
- Applies when: selected static guide
- Depends on: Static profile; selected host decision; D01/D05
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: Actual Coolify/proxy logs/retention/deletion remain pending. Permitted isolated source/tests can continue

### Required behavior

Local interactions send/store nothing; visible factual privacy matches actual client behavior. Forbidden effects: Invent legal operator/contact/jurisdiction/retention, submit real private data, delete host logs.

### Exact files and changes

| Existing/new path                                                                                        | Required exports/fields/configuration                                                                                                                         | Generated/hand-authored rule                                                  |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| docs/data-inventory.md; docs/data-lifecycle.md; src/pages/index.astro privacy section; deploy/nginx.conf | Synthetic preset/category/six booleans in current tab only; no storage/provider; access_log off in container; host/proxy error/log retention/operator unknown | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting                 | Build/runtime + public/private | Safe default                                            | Validation/bounds                              | Missing/invalid behavior                    |
| ----------------------- | ------------------------------ | ------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| Owner/operator decision | Release/operator scope         | No unconfirmed identity/license/retention/release value | Explicit approved decision + observed evidence | Unknown remains pending; never invent value |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                           | Expected observable result                                                                                                                    | Actual result or pending                                                                                          |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| npm run build; npm run test:dom; npm run test:e2e | Actual host log fields/purpose/access/retention/delete/owner/evidence inventory and truthful notice confirmed; local zero-effects checks pass | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                                  | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Local interactions send/store nothing; visible factual privacy matches actual client behavior                       | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Reader correction route warns against private comments/accounts; production privacy cannot promise no host metadata | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                                    | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final local fictional-content/source/DOM checks passed; no provider data store selected
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Actual Coolify/proxy logs/retention/deletion remain pending
- Done criterion: Actual host log fields/purpose/access/retention/delete/owner/evidence inventory and truthful notice confirmed; local zero-effects checks pass

## Requirement P01: Default-off collection and selected scope

- Status: verified local default-off output; current browser/network observation pending
- Gate: local foundation
- Applies when: selected static guide
- Depends on: No measurement selected; C04; S08
- Owner: Local implementer
- Blocker and independent work that can continue: Current actual browser/network zero-collection observation remains pending at preparation. Permitted isolated source/tests can continue

### Required behavior

Fresh/local/preview build has zero collector requests and no storage/inherited tracker. Forbidden effects: Add Umami/consent/autocapture/session replay/intent-conversion dispatch by default.

### Exact files and changes

| Existing/new path                                                                                                   | Required exports/fields/configuration                                                                                   | Generated/hand-authored rule                                                  |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| docs/environment.md; docs/routes.md; docs/data-inventory.md; scripts/check-output.mjs; tests/browser/guide.spec.mjs | No collector/script/event/config/ID integrated; all actual routes analytics-denied; omit upstream illustrative settings | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting               | Build/runtime + public/private                         | Safe default                     | Validation/bounds                                                | Missing/invalid behavior                               |
| --------------------- | ------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| No additional setting | Contract/source review; selected env scope in registry | No unselected provider/collector | Contract above; actual environment bounds in docs/environment.md | Missing selected prerequisite fails or remains pending |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                           | Expected observable result                                                                                    | Actual result or pending                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| npm run build; npm run test:dom; npm run test:e2e | Current actual output/network zero-collection contract observed; no configuration endpoint or tracker present | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate |

### Required tests

| Case                   | Input/state/action                                                                              | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Fresh/local/preview build has zero collector requests and no storage/inherited tracker          | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Unselected collector/provider IDs absent from output; wrong-origin URL cannot activate anything | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final output/privacy/resource destination and compiled-DOM contracts passed; no collection selected
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current actual browser/network zero-collection observation remains pending at preparation
- Done criterion: Current actual output/network zero-collection contract observed; no configuration endpoint or tracker present

## Requirement P05: Selected hosting operation evidence

- Status: pending actual hosting operation evidence
- Gate: release
- Applies when: selected static guide
- Depends on: L01; D05-D08; no scheduler/provider selected
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: Actual host operation and recovery remain pending; scheduler/database/provider recovery N/A. Permitted isolated source/tests can continue

### Required behavior

Isolated preview checks perform no production/provider writes. Forbidden effects: Production purge/deletion/deployment without authority, fabricated tick/alert/delivery/recovery.

### Exact files and changes

| Existing/new path                                                                      | Required exports/fields/configuration                                                                                            | Generated/hand-authored rule                                                  |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| docs/data-lifecycle.md; docs/release-runbook.md; docs/coolify.md; docs/verification.md | Use isolated checks; actual host/proxy/log/cache/recovery effects require operator evidence; no DRY_RUN for absent write feature | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting                 | Build/runtime + public/private | Safe default                                            | Validation/bounds                              | Missing/invalid behavior                    |
| ----------------------- | ------------------------------ | ------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| Owner/operator decision | Release/operator scope         | No unconfirmed identity/license/retention/release value | Explicit approved decision + observed evidence | Unknown remains pending; never invent value |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                          | Expected observable result                                                                              | Actual result or pending                                                                                          |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| node scripts/smoke-host.mjs http://127.0.0.1:8080; npm run build | Selected host operation/log/cache/rollback evidence recorded; absent provider/job checks explicitly N/A | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                      | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Isolated preview checks perform no production/provider writes                                           | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Health/CI cannot imply deployed identity/log retention/recovery; no retry/purge before verified release | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                        | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final local source/build checks passed; no scheduler/database/provider recovery selected
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Actual host operation and recovery remain pending; scheduler/database/provider recovery N/A
- Done criterion: Selected host operation/log/cache/rollback evidence recorded; absent provider/job checks explicitly N/A

## Requirement D01: Selected target and artifact contract

- Status: pending production; local artifact/source packaging verified
- Gate: release
- Applies when: selected static guide / Coolify preparation
- Depends on: Static Astro brief; Coolify preparation request; C09
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: Current pinned-image runtime and actual host resource/operator/authorization pending. Permitted isolated source/tests can continue

### Required behavior

Baseline isolated built image serves intended static artifact. Forbidden effects: Create/change Coolify resource, deploy, registry push or DNS without authority.

### Exact files and changes

| Existing/new path                                                                       | Required exports/fields/configuration                                                                         | Generated/hand-authored rule                                                  |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Dockerfile; deploy/nginx.conf; docs/coolify.md; docs/release-runbook.md; docs/routes.md | Coolify Dockerfile preparation, dist static artifact, nginx8080 nonroot; no server adapter/private env/volume | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting                  | Build/runtime + public/private | Safe default                             | Validation/bounds                                                                | Missing/invalid behavior                                      |
| ------------------------ | ------------------------------ | ---------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Nginx port / host policy | Public static delivery         | 8080 internalHTTP; prepared policy above | Actual publicTLS/proxy/cache/immutable images require observed operator evidence | Unknown public settings stay pending; bad image/runtime fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                                                                          | Expected observable result                                                         | Actual result or pending                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| npm run build; docker build --build-arg SITE_URL=https://aicommentmoderation.com --build-arg SITE_RELEASE=false -t aicommentmoderation:preview . | Actual authorized Coolify host/artifact/start/port/origin/access contract observed | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                 | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Baseline isolated built image serves intended static artifact                                      | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Coolify Static build pack would omit ignored dist; wrong profile/host/start contract fails release | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                   | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final source/build/artifact checks passed; E0 image packaging runtime remains historical
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current pinned-image runtime and actual host resource/operator/authorization pending
- Done criterion: Actual authorized Coolify host/artifact/start/port/origin/access contract observed

## Requirement D02: Environment and release configuration

- Status: pending production environment/CI; local build-only config verified
- Gate: release
- Applies when: selected static guide / Coolify preparation
- Depends on: C04; C07; D01; owner release decisions
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: New exact-head CI and actual operator-approved production settings remain pending at preparation. Permitted isolated source/tests can continue

### Required behavior

Preview safe-default artifact and valid public marker/config. Forbidden effects: Grant production credentials to PR verification, embed secret or inherit source provider ID.

### Exact files and changes

| Existing/new path                                                                                                       | Required exports/fields/configuration                                                                                                     | Generated/hand-authored rule                                                  |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| docs/environment.md; .env.example; Dockerfile; .github/workflows/checks.yml; src/lib/site-config.mjs; marker validation | Public build-only SITE_URL/SITE_RELEASE/SITE_COMMIT; no runtime secret; preview defaults false/null; release requires exact apex/full SHA | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting      | Build/runtime + public/private | Safe default                                | Validation/bounds                                                   | Missing/invalid behavior                          |
| ------------ | ------------------------------ | ------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| SITE_URL     | Public build                   | Exact apex in preview; explicit for release | Literal HTTPS apex, optional /; no port/credentials/path/query/hash | Invalid fails; release missing fails              |
| SITE_RELEASE | Public build                   | false                                       | Literal true/false                                                  | Missing false; invalid fails                      |
| SITE_COMMIT  | Public build                   | Unset/empty preview null                    | 40 lowercase hex; release required                                  | Malformed nonempty or missing/empty release fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                          | Expected observable result                                                                                    | Actual result or pending                                                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| node --test tests/config.test.mjs; npm run build | Actual approved release environment and exact source checks observed; build config rejects invalid boundaries | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                   | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Preview safe-default artifact and valid public marker/config                                         | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Invalid flag/origin/commit or absent release origin/SHA fails; no private values in client/image/log | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                     | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final alignment config/marker/release boundary tests and static preview build passed
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: New exact-head CI and actual operator-approved production settings remain pending at preparation
- Done criterion: Actual approved release environment and exact source checks observed; build config rejects invalid boundaries

## Requirement D03: Docker Nginx runtime packaging

- Status: pending current image/production runtime; local pinned-image source policy verified
- Gate: release
- Applies when: selected static guide / Coolify preparation
- Depends on: C02; C03; D01; permitted Docker runtime
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: Docker/Podman/nginx unavailable locally; current digest-pinned image runtime and production runtime pending. Permitted isolated source/tests can continue

### Required behavior

Real isolated image build/syntax/health/HTTP baseline passed CI. Forbidden effects: Private ARG/layer/log credentials, database service, production image registry push.

### Exact files and changes

| Existing/new path                                                                                       | Required exports/fields/configuration                                                                                                                                                                            | Generated/hand-authored rule                                                  |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Dockerfile; .dockerignore; deploy/nginx.conf; src/lib/hosting-headers.mjs; scripts/generate-hosting.mjs | Multi-stage locked checked build; static-only runtime as nginx user; port8080; /tmp PID/temp; no credentials/volumes; both FROM images digest-pinned; current image runtime/approved production identity pending | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting                  | Build/runtime + public/private | Safe default                             | Validation/bounds                                                                | Missing/invalid behavior                                      |
| ------------------------ | ------------------------------ | ---------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Nginx port / host policy | Public static delivery         | 8080 internalHTTP; prepared policy above | Actual publicTLS/proxy/cache/immutable images require observed operator evidence | Unknown public settings stay pending; bad image/runtime fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                                                                                                                              | Expected observable result                                                                                                              | Actual result or pending                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| docker build --build-arg SITE_URL=https://aicommentmoderation.com --build-arg SITE_RELEASE=false -t aicommentmoderation:preview .; docker run --rm --entrypoint nginx aicommentmoderation:preview -t | Current intended image build/run/shutdown/restart and immutable identity verified in permitted environment; production runtime observed | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                         | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Real isolated image build/syntax/health/HTTP baseline passed CI                            | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Environment/git/reports/secrets excluded from context/runtime; invalid checked build fails | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                           | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final Dockerfile digest-pin/context/source regressions passed; E0 CI image runtime remains historical
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Docker/Podman/nginx unavailable locally; current digest-pinned image runtime and production runtime pending
- Done criterion: Current intended image build/run/shutdown/restart and immutable identity verified in permitted environment; production runtime observed

## Requirement D04: Safe served source and artifact identity

- Status: pending served runtime/production identity; local marker implementation verified
- Gate: release
- Applies when: selected static guide / Coolify preparation
- Depends on: D01-D03; reviewed source SHA
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: Current isolated served-marker smoke and approved production full-SHA/artifact identity pending. Permitted isolated source/tests can continue

### Required behavior

Expected supplied SHA and actual root/asset hashes match built marker; missing dev SHA explicit null. Forbidden effects: Treat health200 as identity/provider proof or cache stale marker.

### Exact files and changes

| Existing/new path                                                                                                                                                           | Required exports/fields/configuration                                                                                                                                | Generated/hand-authored rule                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| scripts/generate-hosting.mjs; src/lib/build-provenance.mjs; tests/build-provenance.test.mjs; dist/build.json (generated/ignored); deploy/nginx.conf; scripts/smoke-host.mjs | Marker schemaVersion1/commit/release/files; SHA lower-case40hex or explicit preview null; file SHA-256 map; /build.json no-store/noindex; /healthz availability only | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting      | Build/runtime + public/private | Safe default                                | Validation/bounds                                                   | Missing/invalid behavior                          |
| ------------ | ------------------------------ | ------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| SITE_URL     | Public build                   | Exact apex in preview; explicit for release | Literal HTTPS apex, optional /; no port/credentials/path/query/hash | Invalid fails; release missing fails              |
| SITE_RELEASE | Public build                   | false                                       | Literal true/false                                                  | Missing false; invalid fails                      |
| SITE_COMMIT  | Public build                   | Unset/empty preview null                    | 40 lowercase hex; release required                                  | Malformed nonempty or missing/empty release fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                          | Expected observable result                                                                                        | Actual result or pending                                                                                          |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| npm run build; node scripts/smoke-host.mjs http://127.0.0.1:8080 | Actual authorized served marker full SHA and observed page/asset hashes match approved artifact with cache bypass | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                                               | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Expected supplied SHA and actual root/asset hashes match built marker; missing dev SHA explicit null                             | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Wrong/stale/invalid/null release SHA or wrong file hash rejects; no credentials/timestamps/account paths; missing health file503 | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                                                 | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final local marker/hash/schema/redaction/stale/corrupt regressions and preview artifact passed; preview commit:null
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current isolated served-marker smoke and approved production full-SHA/artifact identity pending
- Done criterion: Actual authorized served marker full SHA and observed page/asset hashes match approved artifact with cache bypass

## Requirement D05: Actual proxy cache and headers

- Status: pending current HTTP/production proxy/TLS/cache; local source policy verified
- Gate: release
- Applies when: selected static guide / Coolify preparation
- Depends on: D01; D02; D04; selected Coolify/proxy policy
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: Current marker/missing-asset runtime smoke plus actual Coolify/proxy/TLS/DNS/cache behavior pending. Permitted isolated source/tests can continue

### Required behavior

Baseline isolated actual CSP/MIME/404/cache/health HTTP observed. Forbidden effects: Disable CSRF/security, blanket fallback, unapproved CDN purge/credentials, HSTS before TLS policy verified.

### Exact files and changes

| Existing/new path                                                                         | Required exports/fields/configuration                                                                                                                                            | Generated/hand-authored rule                                                  |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| deploy/nginx.conf; generated CSP; scripts/smoke-host.mjs; docs/routes.md; docs/coolify.md | CSP artifact hashes/self-only/connect-none; nosniff/referrer/permissions; immutable existing hashes; documents revalidate/errors+marker+health no-store; publicTLS/proxy pending | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting                  | Build/runtime + public/private | Safe default                             | Validation/bounds                                                                | Missing/invalid behavior                                      |
| ------------------------ | ------------------------------ | ---------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Nginx port / host policy | Public static delivery         | 8080 internalHTTP; prepared policy above | Actual publicTLS/proxy/cache/immutable images require observed operator evidence | Unknown public settings stay pending; bad image/runtime fails |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                          | Expected observable result                                                                              | Actual result or pending                                                                                          |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| node scripts/smoke-host.mjs http://127.0.0.1:8080; npm run build | Actual selected public DNS/TLS/redirect/header/cache/trusted chain and served-SHA-before-purge evidence | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                                             | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Baseline isolated actual CSP/MIME/404/cache/health HTTP observed                                                               | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Missing assets must be404/no-store; direct hidden files404; public origin/redirect/proxy loop never inferred from internalHTTP | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                                               | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final local hosting/CSP/marker/missing-resource source/output checks passed; E0 isolated headers remain historical
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Current marker/missing-asset runtime smoke plus actual Coolify/proxy/TLS/DNS/cache behavior pending
- Done criterion: Actual selected public DNS/TLS/redirect/header/cache/trusted chain and served-SHA-before-purge evidence

## Requirement D06: Selected content and operator recovery

- Status: pending selected content/artifact recovery evidence
- Gate: release
- Applies when: selected static guide / Coolify preparation
- Depends on: D01; L01; known-good source/artifact/operator decision
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: No actual restore rehearsal/known-good released artifact; provider/database backup modules N/A. Permitted isolated source/tests can continue

### Required behavior

Rebuild approved known-good synthetic source into isolated output with correct marker/content. Forbidden effects: Invent database backup/PITR, restore to production, claim recovery from checkbox.

### Exact files and changes

| Existing/new path                                                               | Required exports/fields/configuration                                                                                                              | Generated/hand-authored rule                                                  |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| docs/release-runbook.md; docs/data-lifecycle.md; original Git content; npm lock | Git/static content recovery only; no CMS/media/provider/database selected; actual host log lifecycle separate; previous immutable artifact pending | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting                 | Build/runtime + public/private | Safe default                                            | Validation/bounds                              | Missing/invalid behavior                    |
| ----------------------- | ------------------------------ | ------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| Owner/operator decision | Release/operator scope         | No unconfirmed identity/license/retention/release value | Explicit approved decision + observed evidence | Unknown remains pending; never invent value |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                        | Expected observable result                                                                                                           | Actual result or pending                                                                                          |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| npm ci; npm run check; npm run lint; npm test; npm run build; npm run test:dom | Actual approved isolated content/artifact restore rehearsal and integrity/usability observations recorded; host lifecycle documented | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                            | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Rebuild approved known-good synthetic source into isolated output with correct marker/content | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Wrong restored source/hash/access/content fails; no sensitive exports in repository/context   | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                              | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final local quality checks passed; no actual content/artifact restore rehearsal performed
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: No actual restore rehearsal/known-good released artifact; provider/database backup modules N/A
- Done criterion: Actual approved isolated content/artifact restore rehearsal and integrity/usability observations recorded; host lifecycle documented

## Requirement D07: Authorized release and rollback record

- Status: pending actual release/rollback record
- Gate: release
- Applies when: selected static guide / Coolify preparation
- Depends on: D01-D06; manual gates; release authority
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: No production release/rollback/host-specific command or operator identity observed. Permitted isolated source/tests can continue

### Required behavior

Release record has actual approvals/exact-source checks/served identity and rollback operation. Forbidden effects: Merge/deploy/DNS/purge/provider change without corresponding authority.

### Exact files and changes

| Existing/new path                                              | Required exports/fields/configuration                                                                                                              | Generated/hand-authored rule                                                  |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| docs/release-runbook.md; docs/coolify.md; docs/verification.md | Exact reviewed SHA/artifact/host/check/actor and previous approved immutable artifact; no migration; actual host release/rollback commands pending | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting                 | Build/runtime + public/private | Safe default                                            | Validation/bounds                              | Missing/invalid behavior                    |
| ----------------------- | ------------------------------ | ------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| Owner/operator decision | Release/operator scope         | No unconfirmed identity/license/retention/release value | Explicit approved decision + observed evidence | Unknown remains pending; never invent value |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                                                      | Expected observable result                                                                 | Actual result or pending                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| npm run build:release (only with approved SITE_URL and SITE_COMMIT set); future host requests recorded in release-runbook.md | Authorized release and host-specific rollback sequence/evidence complete for actual target | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                                                     | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Release record has actual approvals/exact-source checks/served identity and rollback operation         | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | No guessed Coolify command or nonexistent previous release; rollback cache/identity must be reobserved | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                                                       | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Preparation commands/evidence recorded; no release/rollback action performed
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: No production release/rollback/host-specific command or operator identity observed
- Done criterion: Authorized release and host-specific rollback sequence/evidence complete for actual target

## Requirement D08: Production readiness

- Status: pending production readiness
- Gate: release
- Applies when: selected static guide / Coolify preparation
- Depends on: C08; S09; L01; P01; P05; D01-D07
- Owner: Local implementer; owner/authorized releaser for external/operator decisions
- Blocker and independent work that can continue: Manual accessibility/current exact-head runtime CI/host/TLS/DNS/identity/logging/rollback still pending. Permitted isolated source/tests can continue

### Required behavior

Exact approved public artifact/host behavior and manual review observed. Forbidden effects: Claim production/indexing/citation/compliance/certification from CI/template/health.

### Exact files and changes

| Existing/new path                                                | Required exports/fields/configuration                                                                                                 | Generated/hand-authored rule                                                  |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| docs/bootstrap.md; docs/verification.md; docs/release-runbook.md | All applicable current local/CI/manual/operator/served identity/cache/privacy/recovery gates complete; absent integrations remain N/A | Hand-authored/adapted source; generated dist/CSP/dependencies/reports ignored |

### Configuration contract

| Setting                 | Build/runtime + public/private | Safe default                                            | Validation/bounds                              | Missing/invalid behavior                    |
| ----------------------- | ------------------------------ | ------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| Owner/operator decision | Release/operator scope         | No unconfirmed identity/license/retention/release value | Explicit approved decision + observed evidence | Unknown remains pending; never invent value |

### Executable setup and verification

Working directory/runtime/order: Evidence and execution context above. Real browser/container commands require their actual permitted runtime; no production execution authorized.

| Command                                                                                                                                    | Expected observable result                                                                                           | Actual result or pending                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| npm ci; npm run check; npm run lint; npm run format:check; npm test; npm run test:fault; npm run build; npm run test:dom; npm run test:e2e | Actual authorized served artifact/host matches approved source and all applicable release/recovery evidence complete | E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending |

### Required tests

| Case                   | Input/state/action                                                      | Expected response/state/effect       | Forbidden effects            | Test/file                             |
| ---------------------- | ----------------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------------------------------- |
| Positive               | Exact approved public artifact/host behavior and manual review observed | Matches stated contract              | Effects forbidden above      | Actual paths/commands above           |
| Negative               | Any failed/unavailable/unauthorized gate leaves production pending      | Reject or preserve zero effect       | Effects forbidden above      | Actual regressions/observations above |
| Boundary/failure/retry | Invalid/missing selected config/artifact/runtime                        | Fail or record pending; scoped retry | No false pass/external write | Selected config/build/host cases      |

Property requirement:

- Independent invariant / oracle: N/A additional property; see actual P01-P06 invariants
- Generator domain and per-run state reset: N/A; selected source/output/browser/HTTP/manual cases
- Concrete detectable fault: Negative case above; disposable scope only
- Regression / actual replay seed-path: Existing tests above; no fabricated replay seed/path

### Completion evidence

- Actual commands, exit results and discovered names/counts: E0 baseline; E1 local source/build/DOM passed; listed runtime gates separate; E2 production/operator gate pending; exact links/results in docs/verification.md
- Built output/browser/persistence/provider observations: Final local source/build/DOM/fault/property/mutation gates passed; production gates remain separate
- Deliberate-fault/scoped mutation result: See T06; no task-specific mutation score claimed
- Remaining integration/operator limitations: Manual accessibility/current exact-head runtime CI/host/TLS/DNS/identity/logging/rollback still pending
- Done criterion: Actual authorized served artifact/host matches approved source and all applicable release/recovery evidence complete

## Not-applicable requirement exclusions

- S04: no CMS selected; content is hand-authored Astro/data. No schema/client/cloud editor generation/account
- H01-H07: no request-time Astro application adapter/contact/search/settings/private endpoint or input/body/origin/abuse/delivery backend. Nginx static health/marker serving does not activate these modules
- P02-P04: no analytics runtime projection/transport/payload/preferences/collector. P01 inspects actual no-collection; P05 covers only selected host operations
- Database/session/account/billing/queue/scheduler/migration/PITR/provider delivery: unselected. No infrastructure or fake test added
- Retired-domain migration: none. Actual apex/www/HTTP host policy remains D05 pending

## Current stopping point

D01-D08 remain production-pending. Final local clean install/source/lint/format, 90 ordinary tests, four focused 1000-run properties, both known faults, checked build, 4 DOM tests, scoped mutation/accounting and independent source review passed. At the dated preparation checkpoint, alignment browser/container/marker/pinned-image/artifact workflow runtime needed new approved publication/exact-head CI. Manual screenshots/200% zoom/AT, actual Coolify/proxy/TLS/DNS/served identity/recovery remain open. No owner license, legal or contact gate applies (owner decision, 15 October 2026). Local checks and historical baseline CI do not establish those gates.
