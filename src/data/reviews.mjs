export const reviewedOn = '15 October 2026';

export const reviewMethod = [
  'I read the vendor’s own pages where I could and recent write-ups by others. For Swat.io, Conversario, Bodyguard.ai and CommentMod my only sources are competitor or vendor-written roundups, and each of those pages says so. I did not run any of these tools on a real channel.',
  'I only use sources published or updated in the last six months.',
  'Accuracy figures are the reviewers’ own tests or vendor claims. I treat them as unverified.',
  'Prices change. Check the vendor’s page before you decide.',
];

const spikerzRoundup = {
  label: 'Spikerz YouTube moderation roundup',
  url: 'https://www.spikerz.com/blog/youtube-comment-moderation-tools',
  date: '23 Jun 2026, updated 13 Oct 2026',
};

const replientComparison = {
  label: 'replient.ai moderation tool comparison',
  url: 'https://replient.ai/en/comparison/comment-moderation-tools',
  date: 'updated 14 Oct 2026',
};

/**
 * Each review is built only from the listed sources. `priceFrom`, `freeOption` and
 * `buying` summarize `pricing` for the homepage comparison table. `sources[].date` is the
 * date shown on the source page, or "undated" when it shows none.
 */
export const reviews = [
  {
    slug: 'moderaty',
    name: 'Moderaty',
    tagline: 'Rules first, then AI scoring and a human review queue, for YouTube comments.',
    youtube: 'Yes, top-level comments only',
    approach:
      'Creator rules run first, then AI scoring, then a human review queue. It keeps an audit log and has an optional feedback digest that posts no replies.',
    pricing:
      'Self-hosted $0 (you bring an OpenAI key). Hosted $5/mo including 100 AI classifications. Lifetime $49 once for 1,000 spots (you bring an OpenAI key).',
    bestFor: 'A small YouTube channel that wants a review queue and clear rules before AI.',
    priceFrom: '$5/mo hosted, or $0 self-hosted',
    freeOption: 'Yes, self-hosted is free',
    buying: 'Published plans',
    limits: [
      'No replies, live chat or other platforms.',
      'Classification credits do not roll over.',
      'Deleted comments cannot be restored through Moderaty.',
    ],
    disclosure:
      'I review Moderaty as one tool among others, from its public pages only, the same way as every other tool here.',
    sources: [
      {
        label: 'Moderaty pricing page',
        url: 'https://moderaty.com/pricing',
        date: 'undated, read 15 Oct 2026',
      },
      {
        label: 'Moderaty product information',
        url: 'https://moderaty.com/',
        date: 'undated, read 15 Oct 2026',
      },
    ],
  },
  {
    slug: 'commentshark',
    name: 'CommentShark',
    tagline: 'A YouTube-only moderator with spam, scam and hate detection and a free tier.',
    youtube: 'Yes, YouTube only, long-form and Shorts',
    approach:
      'Detects spam, scams and hate with AI comment classification, scores sentiment, and can auto-delete or hold comments.',
    pricing:
      'Free (3 rules, 20 actions a month), Starter $19 (10 rules, 500 actions), Creator $49 (25 rules, 1,500 actions), Pro $139 (50 rules, 5,000 actions), and a custom plan on request. Seven-day refund.',
    bestFor: 'A solo creator who wants a low-cost start and can live with monthly action caps.',
    priceFrom: 'Free',
    freeOption: 'Yes, a free plan',
    buying: 'Published plans',
    limits: [
      'Action caps run from 20 to 5,000 a month on the plans above.',
      'Free channels are checked every 2 hours.',
      'One channel per account.',
      'No like, heart or pin, because of a YouTube API limit.',
    ],
    sources: [
      {
        label: 'ReviewNexa CommentShark review',
        url: 'https://reviewnexa.com/commentshark-review/',
        date: '16 Jul 2026',
      },
      spikerzRoundup,
    ],
    caveat:
      'The accuracy figures in the ReviewNexa piece (94% spam, 88% intent, 91% sentiment) come from that reviewer’s own tests. The Spikerz roundup is written by a competitor.',
  },
  {
    slug: 'replient',
    name: 'replient.ai',
    tagline: 'Auto-deletes spam and hate and drafts replies in a brand voice.',
    youtube: 'Yes, on your own channel’s videos',
    approach:
      'Auto-deletes spam, hate and scam comments, tags sentiment, and writes AI replies in a brand voice.',
    pricing: 'From EUR 39/mo with a 14-day free trial.',
    bestFor: 'A brand that wants moderation and reply drafting in one tool.',
    priceFrom: '€39/mo',
    freeOption: '14-day free trial',
    buying: 'Published plans',
    limits: [
      'It deletes, because YouTube has no single-comment hide, and there is no undo.',
      'Only your own channel’s videos.',
      'Credits: a comment costs 0.1 credit, or 1 with an AI reply draft. Lite €39 (1,000 credits, 1 brand), Pro €129 (4,000, 4 brands), Business €249 (10,000, 10 brands).',
    ],
    sources: [
      {
        label: 'replient.ai for YouTube comments',
        url: 'https://replient.ai/en/platform/ai-for-youtube-comments',
        date: '7 Mar 2026, updated 2 Oct 2026',
      },
      replientComparison,
    ],
    caveat: 'Both sources are the vendor’s own marketing.',
  },
  {
    slug: 'spikerz',
    name: 'Spikerz',
    tagline: 'Real-time moderation with plain-language rules in 25+ languages.',
    youtube: 'Yes, in real time through the API',
    approach:
      'Reads intent, takes custom rules written in plain language, and covers 25+ languages.',
    pricing: 'Custom. No public pricing.',
    bestFor: 'A team that wants to talk to sales and write rules in plain language.',
    priceFrom: 'Custom',
    freeOption: 'None stated',
    buying: 'Sales call',
    limits: ['No public pricing, so you cannot compare cost before a sales call.'],
    sources: [spikerzRoundup],
    caveat: 'This is Spikerz’s own blog, which also ranks its competitors.',
  },
  {
    slug: 'respondology',
    name: 'Respondology',
    tagline: 'Brand-grade moderation that mixes rules, generative AI and human moderators.',
    youtube: 'Yes',
    approach:
      'Keyword and business rules plus generative AI, with human moderators, in 100+ languages on higher plans.',
    pricing:
      'Per Respondology’s pricing page (modified 7 Oct 2026, USD, billed annually): Basic $999/mo, Standard from $2,599/mo, Premium from $4,499/mo, Enterprise custom.',
    bestFor: 'A large brand with a big comment volume and a budget to match.',
    priceFrom: '$999/mo',
    freeOption: 'None stated',
    buying: 'Published plans',
    limits: [
      'Basic covers up to 10,000 comments a year and one profile.',
      'The page lists 100+ languages on every plan but describes Standard as English-only, and does not resolve that.',
      'An earlier roundup quoted $1,500/mo, which does not match the vendor’s page.',
    ],
    sources: [
      {
        label: 'Respondology pricing',
        url: 'https://respondology.com/pricing/',
        date: 'modified 7 Oct 2026',
      },
      {
        label: 'Beyond Comments YouTube comment bot guide',
        url: 'https://beyondcomments.io/blog/best-youtube-comment-bot',
        date: '13 Jul 2026, updated 11 Oct 2026',
      },
    ],
  },
  {
    slug: 'napoleoncat',
    name: 'NapoleonCat',
    tagline: 'A social inbox with auto-moderation on its Expert plan.',
    youtube: 'Yes, as one of several channels',
    approach:
      'Keyword, tag and sentiment rules, with automatic replies, hiding and deleting on the Expert plan, and an AI assistant for context and slang.',
    pricing:
      'Per NapoleonCat’s own articles (Aug to Oct 2026, USD): Standard from $89/mo, Pro from $109/mo, Expert from $139/mo or $119/mo billed annually. Its pricing page loads the plan cards dynamically, so I could not read them there.',
    bestFor: 'A team that already needs a multi-channel inbox and wants moderation inside it.',
    priceFrom: '$139/mo for Expert, or $119/mo yearly',
    freeOption: 'None stated',
    buying: 'Published plans',
    limits: [
      'Auto-moderation is part of Expert, not the cheaper plans.',
      'Classification is keyword-led.',
      'The same pages disagree slightly, with a “from $79” figure in one table and $89 in the text.',
    ],
    sources: [
      {
        label: 'NapoleonCat social media moderation tool',
        url: 'https://napoleoncat.com/uses/social-media-moderation-tool/',
        date: '25 Jun 2026, updated 5 Oct 2026',
      },
      {
        label: 'NapoleonCat Hootsuite pricing article',
        url: 'https://napoleoncat.com/blog/hootsuite-pricing/',
        date: '18 Aug 2026, updated 1 Oct 2026',
      },
      {
        label: 'NapoleonCat pricing page',
        url: 'https://napoleoncat.com/pricing/',
        date: 'undated, read 15 Oct 2026',
      },
    ],
    caveat:
      'Earlier roundups quoted EUR prices and a $27 entry plan. Neither matches NapoleonCat’s own current pages.',
  },
  {
    slug: 'swat-io',
    name: 'Swat.io',
    tagline: 'A shared social inbox where moderation is one part of a bigger suite.',
    youtube: 'Yes, in a shared inbox',
    approach: 'Keyword automations plus AI suggestions to hide or reply.',
    pricing:
      'Publisher Small €39/mo, Medium €89/mo, Large €199/mo, with the Inbox add-on at the same prices. Small with Inbox is €78/mo.',
    bestFor: 'A team that wants one inbox for many channels and treats moderation as a feature.',
    priceFrom: '€78/mo with the Inbox add-on',
    freeOption: 'None stated',
    buying: 'Published plans',
    limits: ['Moderation is one part of a broader suite, not the main product.'],
    sources: [replientComparison, spikerzRoundup],
    caveat:
      'Both sources are written by competitors, and I did not check Swat.io’s own pricing page.',
  },
  {
    slug: 'conversario',
    name: 'Conversario',
    tagline: 'Enterprise moderation with a sensitivity setting that changes by time of day.',
    youtube: 'Yes',
    approach: 'AI classification and auto-hide, adjustable by time of day, with an audit timeline.',
    pricing: 'Not published. A 30-day free trial is available on request.',
    bestFor: 'A large organization that wants to buy through sales.',
    priceFrom: 'Not published',
    freeOption: '30-day trial on request',
    buying: 'Sales call',
    limits: ['Enterprise only, with no self-serve plan.', 'No AI reply suggestions.'],
    sources: [replientComparison],
    caveat:
      'My only source is a competitor’s comparison page, so treat every detail as unconfirmed.',
  },
  {
    slug: 'bodyguard-ai',
    name: 'Bodyguard.ai',
    tagline: 'Contextual AI with human review, built for platform-scale volume.',
    youtube: 'Yes',
    approach:
      'Contextual AI that handles irony and slang, with hybrid AI and human review in 45+ languages.',
    pricing: 'Custom, by demo only.',
    bestFor: 'A platform or publisher with very large comment volume.',
    priceFrom: 'Custom',
    freeOption: 'None stated',
    buying: 'Demo first',
    limits: ['Built for scale, so it may be more than a single channel needs.'],
    sources: [
      {
        label: 'Alto roundup of comment moderation tools',
        url: 'https://meetalto.ai/blog/best-social-media-comment-moderation-tools',
        date: '27 Apr 2026, updated 5 Aug 2026',
      },
    ],
    caveat: 'My only source is a vendor-written roundup, so treat every detail as unconfirmed.',
  },
  {
    slug: 'commentmod',
    name: 'CommentMod',
    tagline: 'Comment analytics for YouTube first, with batch delete and report.',
    youtube: 'Yes, analyzes comments and can delete or report them in bulk',
    approach:
      'Labels comments by sentiment (positive, neutral or negative), reads intent and engagement patterns, and deletes or reports large batches of comments.',
    pricing: 'Custom, based on usage, channels and features, with a free trial.',
    bestFor: 'A creator who wants audience insight from comments and occasional bulk clean-up.',
    priceFrom: 'Custom',
    freeOption: 'Free trial',
    buying: 'Custom quote',
    limits: [
      'It is more of an insight tool than a moderator, with limited workflow features for teams.',
      'No public prices, comment volumes or channel caps.',
    ],
    sources: [spikerzRoundup],
    caveat:
      'My only source is a competitor’s blog, which also ranks its rivals, so treat every detail as unconfirmed.',
  },
];

/** @param {string} slug */
export function reviewBySlug(slug) {
  return reviews.find((review) => review.slug === slug);
}
