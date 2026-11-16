import type { Metadata } from 'next';
import { Code2 } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';

export const metadata: Metadata = {
  title: 'API Documentation',
  description: 'The TG Copilot API for partners and developers: channels, bookings, campaigns and reports.',
  alternates: { canonical: '/docs/api' },
};

const planned = [
  { method: 'GET', path: '/api/v1/channels', text: 'Search marketplace channels with filters' },
  { method: 'GET', path: '/api/v1/channels/{username}', text: 'Channel details, pricing and metrics with sources' },
  { method: 'POST', path: '/api/v1/bookings', text: 'Request an ad slot on a channel' },
  { method: 'GET', path: '/api/v1/campaigns', text: 'List your campaigns and their status' },
  { method: 'GET', path: '/api/v1/reports/{id}', text: 'Download a campaign report' },
  { method: 'POST', path: '/api/v1/ai/ad-copy', text: 'Generate ad copy variations' },
];

export default function ApiDocsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Resources', href: '/resources' }, { label: 'API documentation', href: '/docs/api' }]} kicker="For developers" title="TG Copilot API" description="A REST API for partners and agencies to search channels, book placements and pull campaign reports. Access opens to partners first." actions={<ButtonLink href="/contact?topic=api" size="lg">Request API access</ButtonLink>} />
      <Section tone="white">
        <Container className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tg-soft text-brand"><Code2 className="h-5 w-5" aria-hidden="true" /></span>
            <h2 className="text-2xl font-bold">Planned endpoints</h2>
            <span className="rounded-full bg-warning-soft px-2.5 py-1 text-xs font-bold text-warning">In development</span>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-line">
            <table className="w-full min-w-[620px] text-left text-[15px]">
              <thead className="bg-mist text-sm text-muted"><tr><th scope="col" className="px-5 py-3 font-semibold">Method</th><th scope="col" className="px-5 py-3 font-semibold">Endpoint</th><th scope="col" className="px-5 py-3 font-semibold">Purpose</th></tr></thead>
              <tbody className="divide-y divide-line">
                {planned.map((e) => (
                  <tr key={e.path + e.method}>
                    <td className="px-5 py-3"><span className={e.method === 'GET' ? 'rounded-md bg-success-soft px-2 py-1 font-mono text-xs font-bold text-success' : 'rounded-md bg-tg-soft px-2 py-1 font-mono text-xs font-bold text-brand'}>{e.method}</span></td>
                    <td className="px-5 py-3 font-mono text-sm text-ink">{e.path}</td>
                    <td className="px-5 py-3 text-ink-2">{e.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted">Full reference documentation, authentication details and rate limits will be published here when the API opens.</p>
        </Container>
      </Section>
    </>
  );
}
