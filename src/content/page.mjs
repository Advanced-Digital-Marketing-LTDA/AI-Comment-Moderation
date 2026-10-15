export const page = {
  title: 'AI Comment Moderation Tool Reviews: Workflows, Examples and Review Choices',
  description:
    'I review AI comment moderation tools. Choose a workflow, explore my fictional review examples, compare native controls and plan human review. Includes my YouTube-only Moderaty review.',
  heading: 'My reviews of AI comment moderation tools',
  reviewed: '6 October 2026',
};

export const questions = [
  {
    question: 'What is AI comment moderation?',
    answer:
      'It uses a model to classify comment content against safety categories or a community policy. You still need rules for the action, a platform integration and a way for people to review uncertain decisions.',
  },
  {
    question: 'Does this site analyze my comments?',
    answer:
      'No. My explorer uses ten fictional presets and fixed local rules. It does not run a live model, accept pasted comments, connect an account or change your channel.',
  },
  {
    question: 'Does YouTube already use AI?',
    answer:
      'Yes. YouTube says its Basic and Strict settings use AI to identify comments to hold. These settings can make mistakes, and you can review held comments in Studio.',
    source: 'https://support.google.com/youtube/answer/9483359?hl=en',
    sourceLabel: 'YouTube’s comment settings',
  },
  {
    question: 'Which platforms does Moderaty support?',
    answer:
      'Moderaty documents top-level YouTube comments. Replies, YouTube live chat, Instagram, Facebook, TikTok, website comments and a general-purpose API are outside that documented scope.',
    source:
      'https://github.com/Bonobo791/Moderaty/blob/89ffd992497ad2d3cf879cde6daf42931e6cb656/PRODUCT.md',
    sourceLabel: 'Moderaty’s documented scope',
  },
  {
    question: 'Can I undo every moderation action?',
    answer:
      'Check the real tool and action before enabling automation. Moderaty says deleted comments cannot be restored and author bans cannot be lifted through Moderaty. An audit record does not guarantee an undo.',
    source: 'https://moderaty.com/pricing',
    sourceLabel: 'Moderaty’s action limitations',
  },
  {
    question: 'What should I do when context is missing?',
    answer:
      'Put the comment in human review. Look at the thread, topic and relevant pattern of behavior. A model score or a stricter setting cannot establish context that you do not have.',
  },
  {
    question: 'Why do I cover Moderaty?',
    answer:
      'I review AI comment moderation tools, and Moderaty is one of them. My product section explains where that YouTube-only tool may fit. Native tools and other workflow categories remain valid choices.',
  },
];

export const checklist = [
  'Write the behavior your policy allows and forbids',
  'Choose the exact platform and comment surface',
  'Test criticism, quotation and harmless keyword uses',
  'Assign a person to review uncertain cases',
  'Check permissions, data handling and action reversibility',
  'Review a sample, record mistakes and revise the rule',
];
