import type { Metadata } from 'next';
import { Activity, Download, GitCompare, LineChart, Lock, ShieldAlert } from 'lucide-react';
import { DiscoveryTable } from '@/components/tools/discovery-table';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeader } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';
import { FeatureGrid, SectionTitle } from '@/components/site/feature-grid';

export const metadata: Metadata = {
  title: 'Channel Discovery: Analyse and Compare Telegram Channels',
  description: 'Search Telegram channels, compare engagement, views and cost per 1,000 views side by side, and export shortlists. Every metric shows its source and date.',
  alternates: { canonical: '/discovery' },
};

const features = [
  { icon: Activity, title: 'Engagement, not vanity', text: 'Views compared with subscribers show who really reads each channel.' },
  { icon: LineChart, title: 'Growth over time', text: 'Subscriber and view history to spot sudden, unnatural jumps.' },
  { icon: GitCompare, title: 'Side-by-side comparison', text: 'Compare up to five channels on the metrics that matter.' },
  { icon: Download, title: 'Export shortlists', text: 'Download your shortlist as CSV to share with your team or client.' },
  { icon: ShieldAlert, title: 'Quality signals', text: 'Flags for irregular views, heavy ad load and inactive audiences.' },
  { icon: Lock, title: 'Source on every number', text: 'Each metric says where it came from and when it was captured.' },
];

export default function DiscoveryPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Channel Discovery', href: '/discovery' }]}
        kicker="Channel Discovery Engine"
        title="Find the Telegram channels worth paying for"
        description="Search, analyse and compare channels before you spend. Stop paying for subscribers who never read."
        actions={<>
          <ButtonLink href="#explore" size="lg">Explore channels</ButtonLink>
          <ButtonLink href="/pricing" variant="secondary" size="lg">Unlock full analytics</ButtonLink>
        </>}
      />
      <Section id="explore" tone="white" className="pt-12 sm:pt-14">
        <Container><DiscoveryTable /></Container>
      </Section>
      <section className="bg-gradient-to-b from-mist to-white py-24 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionTitle align="center" kicker="Included with Marketplace Pro" title="Analytics built for" highlight="advertisers" description="Discovery shows basic metrics for free. Pro adds history, quality signals and unlimited comparisons." />
          <FeatureGrid items={features} />
        </Container>
      </section>
      <CtaBand title="Rather have experts pick the channels?" text="Our channel research service delivers a vetted, ranked shortlist with fair prices." primary={{ label: 'Request channel research', href: '/services/channel-research' }} secondary={{ label: 'Start with Pro', href: '/register?plan=pro' }} />
    </>
  );
}
