/** Prices carried over from the current tgcopilot.com where they existed; others are placeholders. */
export interface Plan {
  key: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  cta: { label: string; href: string };
  highlighted?: boolean;
  features: string[];
}

export const plans: Plan[] = [
  {
    key: 'starter',
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'Try the tools and browse the marketplace.',
    cta: { label: 'Create free account', href: '/register' },
    features: ['Browse the channel marketplace', 'AI Ad Engine at $0.50 per ad', 'Free Chrome extension', 'Save up to 20 channels', 'Email support'],
  },
  {
    key: 'pro',
    name: 'Marketplace Pro',
    price: '$99',
    period: 'per month',
    description: 'For marketers buying Telegram ads every month.',
    cta: { label: 'Start with Pro', href: '/register?plan=pro' },
    highlighted: true,
    features: ['Book verified channels directly', 'AI Ad Engine included, no per-ad fee', 'Channel Discovery analytics', 'Unlimited saved channels and lists', 'Extension Pro features', 'Priority support'],
  },
  {
    key: 'agency',
    name: 'Agency',
    price: 'Custom',
    description: 'For agencies running Telegram ads for many clients.',
    cta: { label: 'Talk to sales', href: '/contact?topic=agency' },
    features: ['Everything in Pro', 'Client workspaces', 'Team members and roles', 'White-label reports', 'Dedicated account manager'],
  },
];

export const comparison: { feature: string; values: [string | boolean, string | boolean, string | boolean] }[] = [
  { feature: 'Channel marketplace', values: ['Browse', 'Browse & book', 'Browse & book'] },
  { feature: 'AI Ad Engine', values: ['$0.50 per ad', 'Included', 'Included'] },
  { feature: 'Channel Discovery analytics', values: [false, true, true] },
  { feature: 'Saved channel lists', values: ['20 channels', 'Unlimited', 'Unlimited'] },
  { feature: 'Chrome extension', values: ['Free features', 'Pro features', 'Pro features'] },
  { feature: 'Client workspaces', values: [false, false, true] },
  { feature: 'White-label reports', values: [false, false, true] },
  { feature: 'Support', values: ['Email', 'Priority', 'Dedicated manager'] },
];

export const managedPricing = {
  title: 'Managed campaigns',
  text: 'Prefer us to run everything? Managed campaigns are quoted per project after a free consultation, based on budget, channels and scope.',
  from: '[YOUR PRICE]',
};
