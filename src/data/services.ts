export type IconName =
  | 'target' | 'megaphone' | 'users' | 'pen' | 'search' | 'layers' | 'chart' | 'compass' | 'puzzle' | 'sparkles' | 'store' | 'radar';

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: IconName;
  deliverables: string[];
  bestFor: string[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  cta: string;
  featured?: boolean;
  homepage?: boolean;
}

export const services: Service[] = [
  {
    slug: 'telegram-ads-management',
    title: 'Telegram Ads campaign management',
    short: 'Official Telegram Ads campaigns run end to end: setup, targeting, bids, moderation and daily monitoring.',
    description:
      'We run your campaigns on the official Telegram Ads platform from start to finish. We set up the account, choose targeting by channel, topic or audience, write ads that pass moderation, manage bids and budgets, and watch performance every day.',
    icon: 'target',
    deliverables: ['Campaign strategy and budget split', 'Ad account setup and funding guidance', 'Channel, topic and audience targeting', 'Ads written to pass moderation', 'Daily bid and spend monitoring', 'Weekly report with next steps'],
    bestFor: ['Brands launching on Telegram for the first time', 'Teams that want official, policy-safe placements', 'Advertisers scaling an existing Telegram Ads account'],
    steps: [
      { title: 'Brief', text: 'We agree goals, audience, budget and the conversion you care about.' },
      { title: 'Build', text: 'Targeting sets, ad variations and tracking links are prepared for your approval.' },
      { title: 'Launch', text: 'Ads go to moderation and live; we monitor the first days closely.' },
      { title: 'Optimise', text: 'Budget moves to the targets and ads that perform, every week.' },
    ],
    faqs: [
      { q: 'Do I need my own Telegram Ads account?', a: 'Not necessarily. We can work in your account or advise on the best option for your budget and region during the consultation.' },
      { q: 'What can be advertised?', a: 'Anything allowed by Telegram’s ad policies. We review your offer first and tell you upfront if something is unlikely to pass moderation.' },
    ],
    cta: 'Plan my Telegram Ads campaign',
    featured: true,
    homepage: true,
  },
  {
    slug: 'channel-promotion',
    title: 'Telegram channel promotion',
    short: 'Sponsored and pinned posts in established channels, negotiated, scheduled and verified for you.',
    description:
      'We place your ad as a native post in Telegram channels your customers already read. We shortlist channels, negotiate prices, agree posting times and send you proof of every published post.',
    icon: 'megaphone',
    deliverables: ['Channel shortlist with prices', 'Negotiation and booking', 'Posting schedule', 'Proof of every post', 'Views and clicks per channel'],
    bestFor: ['Growing your own Telegram channel or bot', 'Launches that need reach in a niche fast', 'Testing several audiences at once'],
    steps: [
      { title: 'Shortlist', text: 'We pick channels that match your audience and budget.' },
      { title: 'Book', text: 'Prices and dates are agreed with each channel owner.' },
      { title: 'Publish', text: 'Your post goes live; we collect links and screenshots.' },
      { title: 'Review', text: 'You see results per channel and where to rebook.' },
    ],
    faqs: [
      { q: 'How do you choose channels?', a: 'We look at real view counts, posting history, audience fit and price per view, not subscriber numbers alone.' },
      { q: 'Can I approve each channel?', a: 'Yes. Nothing is booked until you approve the shortlist and the quote.' },
    ],
    cta: 'Discuss channel promotion',
    homepage: true,
  },
  {
    slug: 'targeted-audience-reach',
    title: 'Targeted audience reach',
    short: 'We map who your buyers are on Telegram and where they read, then spend only there.',
    description:
      'Good Telegram advertising starts with the audience, not the price list. We research the niches, languages and regions your buyers belong to, build separate audience segments and test them side by side.',
    icon: 'users',
    deliverables: ['Audience and niche research', 'Country and language targeting', 'Separate test segments', 'Audience report with recommendations'],
    bestFor: ['Products with a specific buyer profile', 'Multi-country or multi-language campaigns', 'Advertisers whose previous ads reached the wrong people'],
    steps: [
      { title: 'Research', text: 'We study your buyers and the Telegram communities they use.' },
      { title: 'Segment', text: 'Audiences are split by niche, language and region.' },
      { title: 'Test', text: 'Each segment runs separately so results are clear.' },
      { title: 'Focus', text: 'Budget moves to the segments that convert.' },
    ],
    faqs: [
      { q: 'Which targeting options does Telegram offer?', a: 'Official Telegram Ads can target by channel, by topic and, depending on account type, by audience characteristics. Channel promotions target through channel choice.' },
      { q: 'Can you target India only, or specific languages?', a: 'Yes. Language and region are part of every plan we prepare.' },
    ],
    cta: 'Discuss audience targeting',
    homepage: true,
  },
  {
    slug: 'ad-creation-copywriting',
    title: 'Ad creation and copywriting',
    short: 'Clear, short ads written for Telegram, including 160-character sponsored messages.',
    description:
      'Telegram ads are short and text-first, so every word counts. We write several angles for each campaign, adapt them to each format and make sure they meet Telegram’s ad policies before they go to moderation.',
    icon: 'pen',
    deliverables: ['Several message angles to test', '160-character sponsored message copy', 'Channel post copy and visuals', 'Call-to-action and link setup', 'Policy check before submission'],
    bestFor: ['Advertisers without an in-house copywriter', 'Campaigns with rejected ads', 'Teams testing new messaging'],
    steps: [
      { title: 'Understand', text: 'We learn your offer, audience and tone of voice.' },
      { title: 'Write', text: 'You get several angles, each in every format you need.' },
      { title: 'Refine', text: 'One round of edits based on your feedback.' },
      { title: 'Test', text: 'Variations run side by side to find the winner.' },
    ],
    faqs: [
      { q: 'Do you also make images?', a: 'Yes, for channel posts we prepare a visual or adapt your brand assets. Sponsored messages on Telegram Ads are text-first.' },
      { q: 'Can I use the AI Ad Engine instead?', a: 'Yes. The Ad Engine drafts variations instantly; our copywriters can then review and polish them.' },
    ],
    cta: 'Discuss ad copywriting',
    homepage: true,
  },
  {
    slug: 'channel-research',
    title: 'Channel research and selection',
    short: 'Before you pay for a post, we check the channel: real reach, posting history and audience fit.',
    description:
      'Many Telegram channels look big but deliver little. We check views against subscribers, posting rhythm, signs of bought followers, past advertisers and fair prices, then give you a clear shortlist.',
    icon: 'search',
    deliverables: ['Views versus subscribers check', 'Signs of bought followers', 'Posting rhythm and ad load', 'Fair price per slot', 'Ranked shortlist'],
    bestFor: ['Advertisers buying posts directly', 'Agencies vetting channels for clients', 'Anyone who has paid for posts that got no clicks'],
    steps: [
      { title: 'Collect', text: 'You send channels, or we find candidates in your niche.' },
      { title: 'Check', text: 'Each channel is reviewed against the same criteria.' },
      { title: 'Rank', text: 'You get a shortlist with notes and fair prices.' },
      { title: 'Book', text: 'Optionally, we book the best channels for you.' },
    ],
    faqs: [
      { q: 'How many channels can you check?', a: 'From a handful to hundreds. Larger audits are quoted per batch.' },
      { q: 'Is there a tool for this?', a: 'Yes. Our free Chrome extension and the Channel Discovery tool help you check channels yourself.' },
    ],
    cta: 'Request channel research',
    homepage: true,
  },
  {
    slug: 'bulk-ad-posting',
    title: 'Bulk ad posting',
    short: 'One brief, many channels. We coordinate posting across dozens of channels at once and keep it organised.',
    description:
      'When a campaign needs reach across many channels, coordination becomes the hard part. We manage bookings, ad variations, tracked links and posting times across all of them, and give you one sheet with every placement.',
    icon: 'layers',
    deliverables: ['Ad variations per channel', 'Tracked link for every post', 'Coordinated posting calendar', 'One sheet with every placement', 'Proof and results per post'],
    bestFor: ['Big launches and announcements', 'Affiliate and performance campaigns', 'Agencies running several clients'],
    steps: [
      { title: 'Plan', text: 'Channels, budget per channel and timing are agreed.' },
      { title: 'Prepare', text: 'Variations and tracked links are created for each channel.' },
      { title: 'Post', text: 'Posts go live on schedule across all channels.' },
      { title: 'Report', text: 'You see every placement and its result in one place.' },
    ],
    faqs: [
      { q: 'How many channels can one campaign include?', a: 'There is no fixed limit; it depends on your budget and niche. We recommend starting with a test batch.' },
      { q: 'Can different channels get different ads?', a: 'Yes, and we recommend it so results can be compared fairly.' },
    ],
    cta: 'Discuss bulk posting',
    homepage: true,
  },
  {
    slug: 'optimization-reporting',
    title: 'Campaign optimisation and reporting',
    short: 'We move budget to what works, pause what doesn’t, and explain why in plain language.',
    description:
      'Every campaign gets a weekly report showing spend next to results: impressions, clicks, joins and cost per result. We explain what changed, what we are doing about it and what we recommend next.',
    icon: 'chart',
    deliverables: ['Weekly performance report', 'Cost per click and per join', 'Budget reallocation', 'Ad and audience tests', 'Clear next-step recommendations'],
    bestFor: ['Running campaigns that have plateaued', 'Teams who need reporting for stakeholders', 'Anyone unsure where their Telegram budget goes'],
    steps: [
      { title: 'Audit', text: 'We review current campaigns and tracking.' },
      { title: 'Fix', text: 'Quick wins are applied with your approval.' },
      { title: 'Test', text: 'New audiences and ads are tested each cycle.' },
      { title: 'Report', text: 'You get a clear weekly summary and recommendations.' },
    ],
    faqs: [
      { q: 'Can you optimise campaigns someone else set up?', a: 'Yes. We start with an audit of the existing campaigns and tracking.' },
      { q: 'What does a report include?', a: 'Spend, impressions, clicks, joins or conversions, cost per result, and what we changed and why.' },
    ],
    cta: 'Discuss optimisation',
    homepage: true,
  },
  {
    slug: 'campaign-strategy',
    title: 'Campaign strategy and consultation',
    short: 'A one-off session to plan your Telegram advertising: channels, formats, budget and expected costs.',
    description:
      'Not ready to hand over a campaign? Book a strategy consultation. We review your product and goals and give you a written plan you can run yourself or with us.',
    icon: 'compass',
    deliverables: ['60-minute consultation', 'Written campaign plan', 'Channel and format recommendations', 'Budget and cost expectations'],
    bestFor: ['Teams with their own media buyers', 'Founders validating Telegram as a channel', 'Agencies adding Telegram to their offer'],
    steps: [
      { title: 'Book', text: 'Choose a time and share a short brief.' },
      { title: 'Meet', text: 'We discuss goals, audience and options.' },
      { title: 'Plan', text: 'You receive a written plan within days.' },
      { title: 'Decide', text: 'Run it yourself or ask us to manage it.' },
    ],
    faqs: [
      { q: 'Is the first consultation free?', a: 'A short introductory call is free. Detailed strategy work is quoted upfront.' },
      { q: 'Will the plan work without your team?', a: 'Yes. It is written so your team can follow it.' },
    ],
    cta: 'Book a consultation',
  },
  {
    slug: 'custom-solutions',
    title: 'Custom advertising solutions',
    short: 'Bigger or unusual needs: multi-market launches, white-label work for agencies, ongoing retainers.',
    description:
      'If your campaign does not fit a standard package, we design one around it: multi-country launches, white-label Telegram advertising for agencies, or a dedicated monthly retainer.',
    icon: 'puzzle',
    deliverables: ['Tailored scope and pricing', 'Dedicated account manager', 'Custom reporting', 'White-label options for agencies'],
    bestFor: ['Agencies and resellers', 'Large or multi-market brands', 'Long-term growth programmes'],
    steps: [
      { title: 'Scope', text: 'We understand the full requirement.' },
      { title: 'Propose', text: 'You get a written proposal and quote.' },
      { title: 'Deliver', text: 'A dedicated team runs the work.' },
      { title: 'Review', text: 'Regular reviews keep it on track.' },
    ],
    faqs: [
      { q: 'Do you work with agencies?', a: 'Yes, including white-label delivery under your brand.' },
      { q: 'Is there a minimum contract?', a: 'This depends on scope and is agreed in the proposal.' },
    ],
    cta: 'Request a proposal',
  },
];

export const homepageServices = services.filter((s) => s.homepage);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
