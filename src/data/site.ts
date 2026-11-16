/**
 * Central site configuration. Edit company details here — every page reads from this file.
 * Values in [BRACKETS] are placeholders to replace with real company information.
 */
export const site = {
  name: 'TG Copilot',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tgcopilot.com').replace(/\/$/, ''),
  tagline: 'Telegram advertising, planned and run for you',
  description:
    'TG Copilot is a Telegram advertising agency and platform. We plan, write, place and optimise Telegram Ads campaigns and channel promotions, with transparent reporting.',
  email: 'hello@tgcopilot.com', // [CONFIRM] public contact email
  supportEmail: 'support@tgcopilot.com', // [CONFIRM]
  telegram: 'tgcopilot_support', // [CONFIRM] Telegram username without @
  location: '[CITY], India',
  responseTime: 'within one working day',
  chromeStoreUrl: process.env.NEXT_PUBLIC_CHROME_STORE_URL ?? '',
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '',
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? '',
  social: {
    telegram: 'https://t.me/tgcopilot_support', // [CONFIRM]
    linkedin: '', // add when available
    youtube: '',
    x: '',
  },
} as const;

export const telegramUrl = `https://t.me/${site.telegram}`;
