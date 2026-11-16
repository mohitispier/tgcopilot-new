import type { IconName } from './services';

export interface NavLink { label: string; href: string; description?: string; icon?: IconName }
export interface NavGroup { label: string; href?: string; items?: NavLink[]; footer?: NavLink; secondary?: { title: string; items: NavLink[] } }

export const mainNav: NavGroup[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    items: [
      { label: 'Telegram Ads management', href: '/services/telegram-ads-management', description: 'Official Telegram Ads, run end to end', icon: 'target' },
      { label: 'Channel promotion', href: '/services/channel-promotion', description: 'Sponsored posts in matched channels', icon: 'megaphone' },
      { label: 'Targeted audience reach', href: '/services/targeted-audience-reach', description: 'Reach the right niche and region', icon: 'users' },
      { label: 'Ad creation & copywriting', href: '/services/ad-creation-copywriting', description: 'Ads written for Telegram formats', icon: 'pen' },
      { label: 'Channel research & selection', href: '/services/channel-research', description: 'Check channels before you pay', icon: 'search' },
      { label: 'Bulk ad posting', href: '/services/bulk-ad-posting', description: 'One brief, many channels', icon: 'layers' },
      { label: 'Optimisation & reporting', href: '/services/optimization-reporting', description: 'Weekly reports, better results', icon: 'chart' },
    ],
    secondary: {
      title: 'Platform tools',
      items: [
        { label: 'AI Ad Engine', href: '/ad-engine', description: 'Ad variations in seconds', icon: 'sparkles' },
        { label: 'Channel Marketplace', href: '/marketplace', description: 'Book verified channels', icon: 'store' },
        { label: 'Channel Discovery', href: '/discovery', description: 'Compare channel metrics', icon: 'radar' },
        { label: 'Pricing', href: '/pricing', description: 'Plans and managed quotes', icon: 'compass' },
      ],
    },
    footer: { label: 'View all services', href: '/services' },
  },
  { label: 'Chrome Extension', href: '/chrome-extension' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Resources',
    href: '/resources',
    items: [
      { label: 'Blog', href: '/blog', description: 'Telegram advertising articles' },
      { label: 'Guides & tutorials', href: '/blog?type=guide', description: 'Step-by-step how-tos' },
      { label: 'Case studies', href: '/case-studies', description: 'How campaigns performed' },
      { label: 'Help center', href: '/help', description: 'Answers to common questions' },
      { label: 'API documentation', href: '/docs/api', description: 'For developers and partners' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About us', href: '/about' },
      { label: 'Chrome extension', href: '/chrome-extension' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
      { label: 'Log in', href: '/login' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Telegram Ads management', href: '/services/telegram-ads-management' },
      { label: 'Channel promotion', href: '/services/channel-promotion' },
      { label: 'Targeted audience reach', href: '/services/targeted-audience-reach' },
      { label: 'Ad creation & copywriting', href: '/services/ad-creation-copywriting' },
      { label: 'Channel research & selection', href: '/services/channel-research' },
      { label: 'Bulk ad posting', href: '/services/bulk-ad-posting' },
      { label: 'Optimisation & reporting', href: '/services/optimization-reporting' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Case studies', href: '/case-studies' },
      { label: 'Help center', href: '/help' },
      { label: 'AI Ad Engine', href: '/ad-engine' },
      { label: 'Channel Marketplace', href: '/marketplace' },
      { label: 'List your channel', href: '/register?type=channel-owner' },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Refund policy', href: '/refund-policy' },
  { label: 'Cookie policy', href: '/cookie-policy' },
];
