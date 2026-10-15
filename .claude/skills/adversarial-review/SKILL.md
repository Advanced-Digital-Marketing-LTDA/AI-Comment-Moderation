---
name: adversarial-review
description: Run before every push. Adversarially review the pending diff, plus pr-test-analyzer and silent-failure-hunter on every change.
---

# Adversarial review before push

Run this before every `git push`. Do not push while a confirmed finding is open.

1. Get the diff to be pushed: `git diff origin/main...HEAD` plus any uncommitted changes.
2. Run the `pr-review-toolkit:pr-test-analyzer` and `pr-review-toolkit:silent-failure-hunter` agents on that diff. Run both on every change.
3. Review the diff as an adversary. Try to break it: hostile inputs, error paths that swallow failures, tests that pass without exercising the change, and anything that weakens an existing check, threshold or assertion.
4. Reproduce each suspected defect against the current source before fixing it. When reproducing is not feasible in the available environment, a source trace to a real caller or input is enough. Drop findings you can neither reproduce nor trace.
5. Fix confirmed findings, changing only what the finding requires, then repeat from step 1 until a pass finds nothing new.
6. Run the repository checks listed in `AGENTS.md` and report the exact results.

For changes to auth, owner-scoping or tests, also run gstack `/cso` and `/test-audit`. Once a task carries a spec, also run Warp validate-changes-match-specs.
