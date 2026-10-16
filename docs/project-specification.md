# AICommentModeration.com build specification

## Purpose and approved local scope

Build a useful English-language guide to choosing an AI-assisted comment moderation workflow. The visitor should understand the category, explore fictional decisions, compare native/manual/tool/API options and leave with a practical review checklist. The guide must remain useful without the Moderaty CTA.

The target repository is Bonobo791/AI-Comment-Moderation. It was reported empty and public before this local build; an AGENTS read returned not found. The owner later authorized review-branch source publication and PR #1 (originally draft; now open and ready for review). Current actual-template adoption is bounded local work only. Subsequent fixes require appropriate publication approval and exact-head verification. Merge, deployment, DNS, spending, credentials and provider changes require separate authorization.

## Identity and layout

- Title: AI Comment Moderation Tool Reviews: Workflows, Examples and Review Choices
- H1: My reviews of AI comment moderation tools
- Publisher relationship: my reviews of AI comment moderation tools, written in first person
- First scope statement: I look at how rules, AI and human review work together. My Moderaty review covers YouTube comments only.
- Intended canonical: https://aicommentmoderation.com/
- One main guide URL with section anchors; assets, crawler files and a real 404 are operational exceptions
- Distinct calm editorial design, responsive layouts, visible focus, semantic HTML and minimal local JavaScript
- No copied platform trade dress, invented legal identity, proof, stats, testimonials or unsupported compatibility

## Sections and intent mapping

1. what-this-covers: definition, scope and category identification
2. try-the-examples: ten fictional comments, cautious/stricter policies, reasoning and missing context
3. choose-a-workflow: native controls, human review, compatible tools and engineering/API paths
4. native-settings: current YouTube worked example acknowledging native AI
5. review-tradeoffs: false positives, missed violations, criticism and quotation
6. rules-and-review: repeatable policy, exceptions and local checklist
7. moderaty: disclosed related product with top-level YouTube-only scope
8. questions: useful reader questions and action limitations
9. privacy-and-ownership: actual local data behavior and unresolved release details
10. other-platforms: honest category exits without unsupported Moderaty routing

Anchors are sections of one document, not separate indexable pages. No blog, extra SEO landing pages, domain redirects or local-business profiles are part of the build. No ranking or AI-citation promise is made.

## Fictional interaction contract

Ten versioned, synthetic fixtures cover constructive criticism, repeated promotion, a prize-fee invitation, reported insult, friendly teasing, heated disagreement, a harmless blocked word, ambiguous hostility, repeated praise and a product complaint. Each has an ID, text, context, policy dimension, two decisions, reasoning and a missing-context note.

The literal decision policy lives independently in tests/fixture-policy.mjs. Criticism and complaints remain allowed in both modes; quotation and missing-context cases require review. The interface says “Illustrative rules, not a live AI prediction.” It accepts no free text, has no numerical toxicity score and performs no platform action or model call.

Selection and policy changes update text and an announced outcome without unexpected scrolling. Reset restores the first example and cautious mode. Initial and browser-restored states reconcile with the output. All ten cases and both explanations remain in pre-rendered HTML if JavaScript fails.

The workflow chooser may foreground a Moderaty option only for YouTube. Other selections lead to category guidance. The checklist uses current-tab memory, with no persistent storage; its count/reset stay hidden without enhancement.

## Evidence and content boundaries

Use primary YouTube documentation and current first-party product descriptions. Basic and Strict already use AI. Moderaty documents top-level YouTube comments only; replies, live chat and other platforms are outside scope. Link current pricing instead of repeating volatile prices. Deletion is irreversible; do not promise universal undo. Describe the license as source-available under PolyForm Shield.

External links are informational exits, not tested endorsements. Do not copy accuracy, compliance, growth or time-saved marketing claims. Show the Drupal security-advisory caveat. Do not copy disputed product legal/privacy promises onto this guide.

## Technical contract

Astro prerenders content and uses @astrojs/node in standalone mode for delivery, matching the current Site-Bootstrap-ADM template. Runtime /healthz checks Node availability. No nginx, TinaCMS, account, form, tracker, API key or external inference. Default builds are noindex previews. Explicit release configuration requires the exact HTTPS apex and rejects old/corrected-away, localhost, preview and lookalike hosts. Canonicals omit queries/fragments. Sitemap contains the root only; 404 has no homepage canonical.

Use original CSS/SVG assets and system fonts. External destinations must use HTTPS and exact approved hosts. Render fixture strings as text. No browser storage, tracking cookies or runtime third-party requests. Hosting logs, retention, legal operator, contact details, training preferences and security/header delivery need actual release decisions.

## Verification and separate gates

Run locked install, type/lint/format checks, deterministic/property tests, deliberate faults, build-output validation and built-DOM interaction tests. Properties use independent policy/origin contracts and support seed/path replay.

Real browser evidence must cover 320/375/768/1280 widths, keyboard-only interaction, visible focus/live announcements, no-JS and failed-module fallback, repeated/reset/restored flows, reduced motion and 200% zoom. DOM simulation does not establish visual or assistive-technology behavior.

Local implementation, browser verification, selected-provider integration, CI and public release are separate statuses. Do not claim deployed, indexed, cited, converted or production-ready without direct evidence.

## Actual template adoption and artifact identity

The current local alignment instantiates the real Site-Bootstrap-ADM document/operational assets at pinned commit 916df29d7410b4a9a5048ed69819b5da448a2ecf, with scoped MIT attribution. The existing original Astro source/content/assets retain their ownership and UNLICENSED status. The upstream reference collection is not a runnable site scaffold, and no application-clone ancestry is claimed.

The public /build.json operational marker contains only schemaVersion, validated source commit (or null for unidentified preview), release boolean and relative-public-file SHA-256 map. SITE_COMMIT is optional/empty-safe for previews and required for releases. Actual served SHA and page/asset hashes must match the approved artifact; health alone proves availability. New exact-source tests/CI and publication approval are separate from template adoption. T06 now has actual scoped evidence; current full-source checks, manual screenshots/200% zoom/AT and actual host/operator/release gates remain pending.
