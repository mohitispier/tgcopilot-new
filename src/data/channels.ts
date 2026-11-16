/**
 * SAMPLE DATA — fictional channels used to lay out the marketplace and discovery pages.
 * Replace with real listings when the backend is connected. Never present these numbers as real.
 */
export type AdFormat = 'Sponsored post' | 'Pinned post' | '24h top post' | 'Custom package';

export interface SampleChannel {
  username: string;
  title: string;
  initials: string;
  color: string;
  category: string;
  country: string;
  language: string;
  subscribers: number;
  avgViews: number;
  priceFromMinor: number;
  formats: AdFormat[];
  verified: boolean;
  managedBy: 'TG Copilot' | 'Channel owner';
  description: string;
  updated: string; // ISO date the sample metrics were "captured"
  metricsSource: 'Owner reported' | 'Verified by TG Copilot';
}

export const categories = ['Business', 'Crypto & Finance', 'Technology', 'Marketing', 'Education', 'News', 'Earning Online', 'Lifestyle', 'Gaming'] as const;

export const sampleChannels: SampleChannel[] = [
  { username: 'marketbrief_sample', title: 'Market Brief', initials: 'MB', color: '#1673C4', category: 'Business', country: 'IN', language: 'English', subscribers: 48200, avgViews: 11800, priceFromMinor: 9000, formats: ['Sponsored post', 'Pinned post'], verified: true, managedBy: 'TG Copilot', description: 'Daily business and markets digest for Indian professionals.', updated: '2026-11-10', metricsSource: 'Verified by TG Copilot' },
  { username: 'startupdesk_sample', title: 'Startup Desk', initials: 'SD', color: '#0F8A63', category: 'Business', country: 'IN', language: 'English', subscribers: 21600, avgViews: 6900, priceFromMinor: 4500, formats: ['Sponsored post', '24h top post'], verified: true, managedBy: 'Channel owner', description: 'Funding news, founder stories and tools for early-stage startups.', updated: '2026-11-08', metricsSource: 'Verified by TG Copilot' },
  { username: 'chainwatch_sample', title: 'Chain Watch', initials: 'CW', color: '#7A4DD8', category: 'Crypto & Finance', country: 'AE', language: 'English', subscribers: 132000, avgViews: 24500, priceFromMinor: 26000, formats: ['Sponsored post', 'Pinned post', 'Custom package'], verified: true, managedBy: 'Channel owner', description: 'Crypto market updates, on-chain data and project analysis.', updated: '2026-11-11', metricsSource: 'Verified by TG Copilot' },
  { username: 'devtools_sample', title: 'Dev Tools Weekly', initials: 'DT', color: '#0B7285', category: 'Technology', country: 'US', language: 'English', subscribers: 35400, avgViews: 9200, priceFromMinor: 12000, formats: ['Sponsored post'], verified: true, managedBy: 'Channel owner', description: 'New developer tools, open-source releases and engineering tips.', updated: '2026-11-05', metricsSource: 'Owner reported' },
  { username: 'growthhacks_sample', title: 'Growth Hacks Hindi', initials: 'GH', color: '#C2410C', category: 'Marketing', country: 'IN', language: 'Hindi', subscribers: 89500, avgViews: 15300, priceFromMinor: 7500, formats: ['Sponsored post', '24h top post'], verified: false, managedBy: 'Channel owner', description: 'Digital marketing and social media growth tips in Hindi.', updated: '2026-11-02', metricsSource: 'Owner reported' },
  { username: 'examprep_sample', title: 'Exam Prep Daily', initials: 'EP', color: '#1D4ED8', category: 'Education', country: 'IN', language: 'Hindi', subscribers: 210000, avgViews: 38000, priceFromMinor: 15000, formats: ['Sponsored post', 'Pinned post'], verified: true, managedBy: 'TG Copilot', description: 'Daily quizzes, notes and updates for competitive exam students.', updated: '2026-11-09', metricsSource: 'Verified by TG Copilot' },
  { username: 'worldwire_sample', title: 'World Wire', initials: 'WW', color: '#334155', category: 'News', country: 'GB', language: 'English', subscribers: 76300, avgViews: 21400, priceFromMinor: 18000, formats: ['Sponsored post'], verified: true, managedBy: 'Channel owner', description: 'Short, neutral summaries of the day’s global news.', updated: '2026-11-12', metricsSource: 'Verified by TG Copilot' },
  { username: 'sidehustle_sample', title: 'Side Hustle Club', initials: 'SH', color: '#B45309', category: 'Earning Online', country: 'IN', language: 'English', subscribers: 54800, avgViews: 8700, priceFromMinor: 5000, formats: ['Sponsored post', '24h top post', 'Custom package'], verified: false, managedBy: 'Channel owner', description: 'Freelancing, remote jobs and online income ideas.', updated: '2026-10-30', metricsSource: 'Owner reported' },
  { username: 'fitfeed_sample', title: 'Fit Feed', initials: 'FF', color: '#BE185D', category: 'Lifestyle', country: 'IN', language: 'English', subscribers: 18900, avgViews: 5400, priceFromMinor: 3000, formats: ['Sponsored post'], verified: true, managedBy: 'Channel owner', description: 'Workouts, healthy recipes and fitness challenges.', updated: '2026-11-07', metricsSource: 'Verified by TG Copilot' },
  { username: 'gamezone_sample', title: 'Game Zone', initials: 'GZ', color: '#4338CA', category: 'Gaming', country: 'RU', language: 'Russian', subscribers: 97000, avgViews: 19800, priceFromMinor: 11000, formats: ['Sponsored post', 'Pinned post'], verified: true, managedBy: 'Channel owner', description: 'Game releases, esports news and gaming deals.', updated: '2026-11-06', metricsSource: 'Verified by TG Copilot' },
  { username: 'fintechin_sample', title: 'Fintech India', initials: 'FI', color: '#047857', category: 'Crypto & Finance', country: 'IN', language: 'English', subscribers: 41200, avgViews: 10100, priceFromMinor: 9500, formats: ['Sponsored post', 'Custom package'], verified: true, managedBy: 'TG Copilot', description: 'Payments, banking and fintech product news from India.', updated: '2026-11-10', metricsSource: 'Verified by TG Copilot' },
  { username: 'aitools_sample', title: 'AI Tools Daily', initials: 'AI', color: '#0E7490', category: 'Technology', country: 'US', language: 'English', subscribers: 158000, avgViews: 33600, priceFromMinor: 24000, formats: ['Sponsored post', 'Pinned post', '24h top post'], verified: true, managedBy: 'Channel owner', description: 'The most useful new AI tools, tested and summarised every day.', updated: '2026-11-12', metricsSource: 'Verified by TG Copilot' },
];

export const countryNames: Record<string, string> = { IN: 'India', AE: 'UAE', US: 'United States', GB: 'United Kingdom', RU: 'Russia' };

export function engagement(c: Pick<SampleChannel, 'avgViews' | 'subscribers'>) {
  return c.subscribers ? Math.round((c.avgViews / c.subscribers) * 1000) / 10 : 0;
}

export const getChannel = (username: string) => sampleChannels.find((c) => c.username === username);
