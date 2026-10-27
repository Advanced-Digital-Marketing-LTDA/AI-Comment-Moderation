export const reviewedOn = '27 October 2026';

export const reviewMethod = [
  'I checked vendor pages where I could and recent write-ups by others. A competitor roundup alone does not confirm a tool’s YouTube support.',
  'I prioritize sources published or updated in the last six months. I label undated or older sources and keep claims unconfirmed when first-party evidence is missing.',
  'I did not test these tools on a real channel. Accuracy figures remain the reviewers’ tests or vendor claims.',
  'Prices change. Check the vendor’s page before you decide.',
];

const spikerzRoundup = {
  label: 'Spikerz YouTube moderation roundup',
  url: 'https://www.spikerz.com/blog/youtube-comment-moderation-tools',
  date: '23 Jun 2026, updated 13 Oct 2026',
};

const spikerzCommentCleanerGuide = {
  label: 'Spikerz Help Center: How to use the comment cleaner',
  url: 'https://help.spikerz.com/en/articles/11542409-how-to-use-the-comment-cleaner',
  date: 'updated over 2 weeks ago (accessed 27 Oct 2026)',
};

const bodyguardHelpCenter = {
  label: 'Bodyguard Help Center: How Bodyguard works on each social media',
  url: 'https://help.bodyguard.ai/social-networks-integration-and-moderation',
  date: 'undated (copyright © 2025)',
};

const replientComparison = {
  label: 'replient.ai moderation tool comparison',
  url: 'https://replient.ai/en/comparison/comment-moderation-tools',
  date: 'updated 14 Oct 2026',
};

const unconfirmedBuyingDetails = {
  priceFrom: 'Unconfirmed',
  freeOption: 'Unconfirmed',
  buying: 'Unconfirmed',
};

/**
 * `priceFrom`, `freeOption` and `buying` summarize `pricing` for the homepage comparison table.
 * `sources[].date` is the date shown on the source page, or "undated" when it shows none.
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
    tagline: 'A YouTube comment moderator with a free plan and scheduled checks.',
    youtube: 'Yes, for video comments and Shorts; active live chat is unsupported.',
    approach:
      'Detects spam, scams and hate with AI comment classification, scores sentiment, and can auto-delete or hold comments. Actions run after comments sync.',
    pricing:
      'Free (3 rules, 20 actions a month), Starter $19 (10 rules, 500 actions), Creator $49 (25 rules, 1,500 actions), Pro $139 (50 rules, 5,000 actions), and a custom plan on request. Seven-day refund.',
    bestFor: 'A solo creator who wants a low-cost start and can live with monthly action caps.',
    priceFrom: 'Free',
    freeOption: 'Yes, a free plan',
    buying: 'Published plans',
    limits: [
      'Action caps run from 20 to 5,000 a month on the plans above.',
      'Checks are scheduled, not instant: CommentShark says paid plans sync every 30 minutes and Free every 2 hours. Automated actions wait until after sync, so comments can wait for the next check.',
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
    tagline: 'YouTube comment cleaning with Hide checks listed every 1.5 hours.',
    youtube: 'Yes; the Help Center lists Hide scans every 1.5 hours.',
    approach:
      'Its Help Center lists a 1.5-hour scan interval for YouTube Hide. It does not confirm real-time YouTube moderation or 25+ language support for YouTube.',
    pricing: 'Custom. No public pricing.',
    bestFor: 'A team that wants to talk to sales and write rules in plain language.',
    priceFrom: 'Custom',
    freeOption: 'None stated',
    buying: 'Sales call',
    limits: ['No public pricing, so you cannot compare cost before a sales call.'],
    sources: [spikerzCommentCleanerGuide, spikerzRoundup],
    caveat:
      'Spikerz’s own roundup also ranks competitors; its real-time and language claims are not used here to describe YouTube support.',
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
    tagline: 'Community moderation; YouTube support is unconfirmed.',
    youtube: 'Unconfirmed; the current overview does not name YouTube.',
    approach:
      'Conversario describes community management across digital channels. I could not confirm the listed YouTube features from a first-party source.',
    pricing: 'Unconfirmed from current first-party information.',
    ...unconfirmedBuyingDetails,
    bestFor: 'Not assessed for YouTube moderation.',
    limits: ['YouTube compatibility, features, and pricing need confirmation from Conversario.'],
    sources: [replientComparison],
    caveat:
      'The comparison page is written by a competitor. Conversario’s current product overview does not confirm YouTube support or the listed feature claims.',
  },
  {
    slug: 'bodyguard-ai',
    name: 'Bodyguard.ai',
    tagline:
      'Bodyguard lists top-level YouTube video and Shorts comments and comments on organic YouTube Live posts.',
    youtube:
      'Yes, for top-level video and Shorts comments and comments on organic YouTube Live posts; live chat is not documented.',
    approach:
      'Contextual AI that handles irony and slang, with hybrid AI and human review in 45+ languages.',
    pricing: 'Custom, by demo only.',
    bestFor: 'A platform or publisher with very large comment volume.',
    priceFrom: 'Custom',
    freeOption: 'None stated',
    buying: 'Demo first',
    limits: [
      'Bodyguard lists YouTube Lives from organic posts, but its help center does not identify this as live-chat support. It says comments from live sessions cannot be restored through the dashboard.',
      'Built for scale, so it may be more than a single channel needs.',
    ],
    sources: [
      {
        label: 'Alto roundup of comment moderation tools',
        url: 'https://meetalto.ai/blog/best-social-media-comment-moderation-tools',
        date: '27 Apr 2026, updated 5 Aug 2026',
      },
      bodyguardHelpCenter,
    ],
    caveat:
      'The contextual AI and human-review description comes from a vendor-written roundup. The YouTube comment surfaces and action limits above come from Bodyguard’s help center.',
  },
  {
    slug: 'commentmod',
    name: 'CommentMod',
    tagline: 'Current product details and YouTube support are unconfirmed.',
    youtube: 'Unconfirmed; current first-party product information was unavailable.',
    approach:
      'Feature claims from an earlier competitor roundup are held until current first-party details can be checked.',
    pricing: 'Unconfirmed; current pricing could not be verified.',
    ...unconfirmedBuyingDetails,
    bestFor: 'Not assessed.',
    limits: [
      'I could not verify YouTube compatibility, features, or pricing from current first-party pages on 27 October 2026.',
    ],
    sources: [spikerzRoundup],
    caveat:
      'A competitor’s roundup is not enough to confirm the disputed claims. I am holding them pending current first-party evidence.',
  },
];

/** @param {string} slug */
export function reviewBySlug(slug) {
  return reviews.find((review) => review.slug === slug);
}
