export const reviewedIso = '2026-10-27';

/** @param {string} detail */
const unconfirmedPlans = (detail) => [{ name: 'Unconfirmed', price: 'Not confirmed', detail }];

/**
 * Per-tool detail for the review pages. Every fact comes from the sources listed for the tool in
 * `reviews.mjs`. `alternatives` holds two or three other review slugs.
 */
/**
 * @typedef {{ name: string, price: string, detail: string }} Plan
 * @typedef {{
 *   verdict: string,
 *   skipIf: string,
 *   plans: Plan[],
 *   features: string[],
 *   notCovered: string[],
 *   alternatives: string[],
 * }} ReviewDetail
 */

/** @type {Record<string, ReviewDetail>} */
export const reviewDetails = {
  moderaty: {
    verdict:
      'Moderaty suits a small YouTube channel that wants clear rules and a review queue before AI makes any call. Rules run first, uncertain comments go to a human queue, and self-hosting is free if you bring an OpenAI key. It covers top-level comments only, so skip it if you need replies, live chat or other platforms.',
    skipIf: 'You need reply threads, live chat, automated replies or platforms beyond YouTube.',
    plans: [
      {
        name: 'Self-hosted',
        price: '$0',
        detail:
          'PolyForm Shield licence. You supply hosting and your own OpenAI key, and those providers charge you separately.',
      },
      {
        name: 'Hosted',
        price: '$5/mo',
        detail:
          '100 AI classifications a month, shared between scoring and digests. Extra bundles: 500 credits for $20.40, 2,000 for $64.65. Full refund within 7 days.',
      },
      {
        name: 'Lifetime',
        price: '$49 once',
        detail:
          'Limited to 1,000 places, with hosted access. You bring your own OpenAI key. Full refund within 7 days.',
      },
    ],
    features: [
      'Keyword, pattern and user rules that can hold, reject, delete or ban a comment.',
      'AI scoring across 13 categories, with your thresholds, for comments no rule resolves.',
      'Low-confidence results and scoring failures go to a review queue with team roles.',
      'An audit log of held, rejected, deleted and banned comments.',
      'Protected handles skip both the rules and the AI scoring.',
      'An optional feedback digest that groups recurring questions and criticism. It posts no replies.',
      'Hosted plans connect with one-click YouTube sign-in, which you can revoke in Google account settings.',
    ],
    notCovered: [
      'Reply threads.',
      'Live chat.',
      'YouTube’s own held-for-review and spam queues.',
      'Replies or any engagement.',
    ],
    alternatives: ['commentshark', 'replient'],
  },
  commentshark: {
    verdict:
      'CommentShark is a low-cost way for a solo creator to automate YouTube comment rules, with a free plan to start. Checks run on a schedule, not instantly, and monthly action caps apply. Skip it if you need instant removal, several channels on one account or live chat support.',
    skipIf: 'You need instant removal, live chat support or several channels on one account.',
    plans: [
      { name: 'Free', price: '$0', detail: '3 rules and 20 actions a month.' },
      { name: 'Starter', price: '$19/mo', detail: '10 rules and 500 actions a month.' },
      { name: 'Creator', price: '$49/mo', detail: '25 rules and 1,500 actions a month.' },
      { name: 'Pro', price: '$139/mo', detail: '50 rules and 5,000 actions a month.' },
      { name: 'Custom', price: 'On request', detail: 'Seven-day refund on paid plans.' },
    ],
    features: [
      'A comment inbox with search, sort and filters.',
      'A rule builder with match type, per-video scope, and actions to reply, delete or moderate, either automatic or after your approval.',
      'A test-all-rules option, and replay of rules on older comments.',
      'Sentiment analysis and AI comment tagging.',
      'Team roles: Admin, Editor and Viewer.',
      'Works on long-form videos and Shorts, through the official YouTube API.',
    ],
    notCovered: [
      'Active live chat.',
      'Like, heart or pin actions, because of a YouTube API limit.',
      'Platforms other than YouTube.',
      'Instant checks. Comments wait for the next sync.',
    ],
    alternatives: ['moderaty', 'replient'],
  },
  replient: {
    verdict:
      'replient.ai suits a brand that wants spam removal and reply drafting in one inbox. Replies default to suggestions you approve, and the tool covers eight channels. On YouTube it deletes rather than hides, and there is no undo. Skip it if you want a reversible hold or a permanent free plan.',
    skipIf: 'You want to hide comments instead of deleting them, or need a permanent free plan.',
    plans: [
      {
        name: 'Lite',
        price: '€39/mo',
        detail: '1,000 credits and 1 brand. A 14-day free trial is offered.',
      },
      { name: 'Pro', price: '€129/mo', detail: '4,000 credits and 4 brands.' },
      { name: 'Business', price: '€249/mo', detail: '10,000 credits and 10 brands.' },
    ],
    features: [
      'Sign-in with Google through the official YouTube Data API. It reads past comments up to two years back.',
      'Sentiment (positive, neutral, negative) and AI tags such as spam, complaint, buying interest and pricing.',
      'Rules can match AI tags, sentiment, keywords, language, video or username.',
      'Replies draw on your past replies, website and uploaded documents, in each comment’s language.',
      'Every AI reply is a suggestion you approve by default. Automatic replies can go out instantly, after a delay or in business hours.',
      'Eight channels in one dashboard, including Facebook, Instagram, TikTok and LinkedIn.',
    ],
    notCovered: [
      'Hiding a single YouTube comment. It deletes instead.',
      'Undoing a deletion.',
      'Videos outside your connected channel.',
    ],
    alternatives: ['napoleoncat', 'moderaty'],
  },
  spikerz: {
    verdict:
      'Spikerz fits a team that wants to talk to sales and write moderation rules in plain language across several social platforms. On YouTube its Help Center lists Hide only, scanned every 1.5 hours. There is no public pricing, so skip it if you need real-time YouTube removal or a price you can compare today.',
    skipIf: 'You need real-time YouTube moderation, deletion on YouTube or published prices.',
    plans: [
      {
        name: 'Custom',
        price: 'No public pricing',
        detail: 'You talk to sales to get a price.',
      },
    ],
    features: [
      'Alerts for phishing, scams, hate speech, spam and custom keywords.',
      'AI topics you can configure and filter by. The AI learns from your remove-or-keep decisions.',
      'On YouTube the listed action is Hide, with scans every 1.5 hours.',
      'On Instagram and Facebook Pages it lists Hide and Delete in real time.',
      'Hidden comments can be unhidden. Mark as Resolved archives an alert.',
      'An Excel export of moderation actions by account and date range.',
    ],
    notCovered: [
      'Delete on YouTube. Only Hide is listed.',
      'Real-time YouTube scans.',
      'Public pricing.',
    ],
    alternatives: ['commentshark', 'moderaty'],
  },
  respondology: {
    verdict:
      'Respondology is brand-grade moderation priced for large budgets, from $999 a month billed annually. It combines keyword and business rules, adjustable AI categories and, on higher plans, more agents and languages. Skip it if you run a single creator channel, since Basic covers up to 10,000 comments a year.',
    skipIf: 'You are a solo creator or small channel without a brand-sized budget.',
    plans: [
      {
        name: 'Basic',
        price: '$999/mo',
        detail: 'Up to 10,000 comments a year and one asset per platform. No support listed.',
      },
      {
        name: 'Standard',
        price: 'From $2,599/mo',
        detail: 'Up to 500,000 comments a year, with email support.',
      },
      {
        name: 'Premium',
        price: 'From $4,499/mo',
        detail: 'Up to 750,000 comments a year and up to 5 profiles per platform.',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        detail: 'Unlimited comments, SSO, API access and a dedicated customer success manager.',
      },
    ],
    features: [
      'Keyphrases and business rules, adjustable AI moderation categories and custom AI moderation rules.',
      'Image and GIF auto-removal, real-time reporting and a 30-day data export on Basic.',
      'Standard adds sentiment analysis, real-time alerts, generative AI summaries and response drafting.',
      'Premium adds a 90-day data export and more response agents.',
      'Add-ons: Additional Comments from $999/mo for 500,000 more a year, and Influencer Intelligence from $5,999/mo.',
    ],
    notCovered: [
      'A free plan. All prices are billed annually in USD.',
      'Details of human moderator staffing. The pricing page does not describe them.',
      'Support on Basic.',
    ],
    alternatives: ['bodyguard-ai', 'napoleoncat'],
  },
  napoleoncat: {
    verdict:
      'NapoleonCat is a multi-channel social inbox where auto-moderation arrives on the Expert plan, from $139 a month or $119 billed annually. Rules use keywords, links, repeated phrases and sentiment to hide, delete, reply or assign. Skip it if you only need YouTube moderation, since cheaper plans have no auto-moderation.',
    skipIf: 'You only need YouTube moderation and do not want to pay for a full social inbox.',
    plans: [
      {
        name: 'Standard',
        price: 'From $89/mo',
        detail: 'Publishing and analytics, without the inbox.',
      },
      {
        name: 'Pro',
        price: 'From $109/mo',
        detail: 'The Social Inbox and manual moderation.',
      },
      {
        name: 'Expert',
        price: 'From $139/mo',
        detail:
          '$119/mo billed annually. Includes 2 users, 5 profiles, automatic hiding, deleting and replies. A 14-day free trial is offered on every plan.',
      },
    ],
    features: [
      'A social inbox for comments, DMs and reviews, with thread assignment and internal comments.',
      'Auto-moderation triggers: keywords, links, repeated phrases, user tags, spam tags and sentiment.',
      'Actions: hide, delete, reply or assign to a moderator, scoped to profiles, posts, ad campaigns or hours.',
      'An AI Assistant that tags spam, hate speech and sentiment, and suggests replies from your past replies and help articles.',
      'Moderation reports by channel and team member.',
    ],
    notCovered: [
      'Auto-moderation on the Standard and Pro plans.',
      'YouTube ad moderation. The page names only Meta and TikTok ads.',
    ],
    alternatives: ['swat-io', 'replient'],
  },
  'swat-io': {
    verdict:
      'Swat.io is a shared social inbox for teams that treat moderation as one feature among many. Keyword automations and AI suggestions can hide or reply. I could not check Swat.io’s own pages, so these details come from competitor write-ups. Skip it if you need first-party details before you decide.',
    skipIf: 'You need moderation as the core product, or first-party pricing confirmed today.',
    plans: [
      {
        name: 'Publisher Small',
        price: '€39/mo',
        detail: 'Add the Inbox for the same price again.',
      },
      { name: 'Publisher Medium', price: '€89/mo', detail: 'The Inbox add-on costs the same.' },
      { name: 'Publisher Large', price: '€199/mo', detail: 'The Inbox add-on costs the same.' },
    ],
    features: [
      'A shared inbox across channels, YouTube included.',
      'Keyword automations.',
      'AI suggestions to hide or reply.',
    ],
    notCovered: [
      'Moderation as the main product. It is one part of a broader suite.',
      'Swat.io’s own pricing page, which I did not check.',
    ],
    alternatives: ['napoleoncat', 'replient'],
  },
  conversario: {
    verdict:
      'I cannot recommend or rule out Conversario for YouTube yet. Its current overview describes community management across digital channels but does not name YouTube, and I could not confirm features or pricing from a first-party source. Check with Conversario directly before you consider it.',
    skipIf: 'You need confirmed YouTube support or published pricing.',
    plans: unconfirmedPlans('Current first-party pricing could not be verified.'),
    features: [
      'Community management across digital channels, per its current overview. YouTube is not named.',
    ],
    notCovered: ['Confirmed YouTube support.', 'Confirmed pricing.', 'A confirmed feature list.'],
    alternatives: ['moderaty', 'commentshark'],
  },
  'bodyguard-ai': {
    verdict:
      'Bodyguard is built for platforms and publishers with very large comment volumes. Its help center confirms top-level comments on YouTube videos and Shorts, plus Lives from organic posts, with removal from the Dashboard. Pricing is demo-only, so skip it if you run a single small channel or want to compare costs.',
    skipIf: 'You run a single small channel, or want published prices before a demo.',
    plans: [{ name: 'Custom', price: 'By demo only', detail: 'No public pricing.' }],
    features: [
      'Moderates top-level comments on videos and Shorts, and on YouTube Lives.',
      'Covers organic posts and partnership posts labeled “Paid promotion”.',
      'Comments are removed automatically or from the Dashboard.',
      'Authors can be banned permanently, or muted for good or for a set time.',
      'Removed comments can be restored manually, except those removed during Lives.',
      'Moderates comments up to 1,000 characters by default. The limit can change on request.',
    ],
    notCovered: [
      'Replies. Only top-level comments are listed.',
      'Restoring comments removed during Lives.',
      'Live chat. It is not documented.',
      'A language list. The help center page does not give one.',
    ],
    alternatives: ['respondology', 'napoleoncat'],
  },
  commentmod: {
    verdict:
      'I could not confirm CommentMod’s YouTube support, features or pricing from a current first-party source on 27 October 2026, so I am not describing it beyond that. Competitor roundups mention it, but that is not enough. Check CommentMod directly before you rely on it.',
    skipIf: 'You need confirmed YouTube support or published pricing.',
    plans: unconfirmedPlans('Current pricing could not be verified.'),
    features: ['No current first-party feature list could be verified.'],
    notCovered: ['Confirmed YouTube support.', 'Confirmed pricing.', 'A confirmed feature list.'],
    alternatives: ['moderaty', 'commentshark'],
  },
};
