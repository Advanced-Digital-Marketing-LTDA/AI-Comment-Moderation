export const reviewedOn = '15 October 2026';

export const reviewMethod = [
  'I read each vendor’s own pages and recent independent write-ups. I did not run any of these tools on a real channel.',
  'I only use sources published or updated in the last six months, and I name the source and date next to each claim that depends on one.',
  'Accuracy figures are the reviewers’ own tests or vendor claims. I treat them as unverified.',
  'Prices change. Check the vendor’s page before you decide.',
];

/**
 * Each review is built only from the listed sources. `sources[].date` is the
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
      'Detects spam, scams and hate, adds intent-based classification on Plus and above, scores sentiment, and can auto-delete or hold comments.',
    pricing:
      'Free (15 actions), Plus $9.99, Pro $19.99, Premium $49.99, plus a custom plan. Pricing is labelled April 2026 in the review I used.',
    bestFor: 'A solo creator who wants a low-cost start and can live with monthly action caps.',
    limits: [
      'Action caps run from 15 to 3,000 a month.',
      'Paid plans sync about every 30 minutes.',
      'One channel per account.',
      'No like, heart or pin, because of a YouTube API limit.',
    ],
    sources: [
      {
        label: 'ReviewNexa CommentShark review',
        url: 'https://reviewnexa.com/commentshark-review/',
        date: '16 Jul 2026',
      },
      {
        label: 'Spikerz YouTube moderation roundup',
        url: 'https://www.spikerz.com/blog/youtube-comment-moderation-tools',
        date: '23 Jun 2026, updated 13 Oct 2026',
      },
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
    limits: [
      'It deletes, because YouTube has no single-comment hide, and there is no undo.',
      'Only your own channel’s videos.',
      'Plan limits are not published.',
    ],
    sources: [
      {
        label: 'replient.ai for YouTube comments',
        url: 'https://replient.ai/en/platform/ai-for-youtube-comments',
        date: '7 Mar 2026, updated 2 Oct 2026',
      },
      {
        label: 'replient.ai moderation tool comparison',
        url: 'https://replient.ai/en/comparison/comment-moderation-tools',
        date: 'updated 14 Oct 2026',
      },
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
    limits: ['No public pricing, so you cannot compare cost before a sales call.'],
    sources: [
      {
        label: 'Spikerz YouTube moderation roundup',
        url: 'https://www.spikerz.com/blog/youtube-comment-moderation-tools',
        date: '23 Jun 2026, updated 13 Oct 2026',
      },
    ],
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
    pricing: 'From EUR 39/mo, AI replies from EUR 178/mo, custom plans from EUR 599/mo.',
    bestFor: 'A team that wants one inbox for many channels and treats moderation as a feature.',
    limits: ['Moderation is one part of a broader suite, not the main product.'],
    sources: [
      {
        label: 'replient.ai moderation tool comparison',
        url: 'https://replient.ai/en/comparison/comment-moderation-tools',
        date: 'updated 14 Oct 2026',
      },
      {
        label: 'Spikerz YouTube moderation roundup',
        url: 'https://www.spikerz.com/blog/youtube-comment-moderation-tools',
        date: '23 Jun 2026, updated 13 Oct 2026',
      },
    ],
    caveat:
      'Both sources are written by competitors, and I did not check Swat.io’s own pricing page.',
  },
  {
    slug: 'conversario',
    name: 'Conversario',
    tagline: 'Enterprise moderation with a sensitivity setting that changes by time of day.',
    youtube: 'Yes',
    approach: 'AI classification and auto-hide, adjustable by time of day, with an audit timeline.',
    pricing: 'On request.',
    bestFor: 'A large organization that wants to buy through sales.',
    limits: ['Enterprise only, with no self-serve plan.', 'No AI reply suggestions.'],
    sources: [
      {
        label: 'replient.ai moderation tool comparison',
        url: 'https://replient.ai/en/comparison/comment-moderation-tools',
        date: 'updated 14 Oct 2026',
      },
    ],
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
    limits: [
      'No public pricing.',
      'Built for scale, so it may be more than a single channel needs.',
    ],
    sources: [
      {
        label: 'Alto roundup of comment moderation tools',
        url: 'https://meetalto.ai/blog/best-social-media-comment-moderation-tools',
        date: '27 Apr 2026, updated 5 Aug 2026',
      },
    ],
    caveat: 'My only source is a vendor-written roundup, so treat every detail as unconfirmed.',
  },
];

/** @param {string} slug */
export function reviewBySlug(slug) {
  return reviews.find((review) => review.slug === slug);
}
