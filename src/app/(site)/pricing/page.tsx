import type { Metadata } from 'next';
import { Check, Minus } from 'lucide-react';
import { comparison, managedPricing, plans } from '@/data/pricing';
import { PricingCards } from '@/components/site/pricing-cards';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeader } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { FaqList } from '@/components/site/faq-list';
import { CtaBand } from '@/components/site/cta-band';
import { WorkModels } from '@/components/home/work-models';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Free tools, Marketplace Pro at $99 per month, Agency plans and managed Telegram ad campaigns quoted per project.',
  alternates: { canonical: '/pricing' },
};

const faqs = [
  { q: 'Do plan prices include ad spend?', a: 'No. Plans cover the platform. Ad spend on Telegram Ads and channel booking prices are paid separately and shown before you pay.' },
  { q: 'Can I cancel any time?', a: 'Yes. Subscriptions can be cancelled any time and stay active until the end of the paid period.' },
  { q: 'Which payment methods do you accept?', a: '[CONFIRM] Cards, UPI, bank transfer and USDT. Available methods are shown at checkout.' },
  { q: 'How are managed campaigns priced?', a: 'After a free consultation we send a fixed quote based on budget, channels and scope. You approve it before any work starts.' },
];

const Cell = ({ v }: { v: string | boolean }) =>
  typeof v === 'boolean' ? (v ? <Check className="mx-auto h-5 w-5 text-success" aria-label="Included" /> : <Minus className="mx-auto h-5 w-5 text-line-2" aria-label="Not included" />) : <span className="text-[15px] font-medium text-ink-2">{v}</span>;

export default function PricingPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Pricing', href: '/pricing' }]} kicker="Pricing" title="Pricing that scales with your campaigns" description="Start free with the tools. Upgrade when you book channels every month, or let us run everything with a managed campaign." />
      <Section tone="white" className="pt-16">
        <Container className="flex flex-col gap-16">
          <PricingCards />
          <div className="grid items-center gap-6 rounded-3xl border border-line bg-mist p-8 sm:p-10 lg:grid-cols-[1.4fr_auto]">
            <div className="flex flex-col gap-2">
              <h2 className="text-[26px] font-bold">{managedPricing.title}</h2>
              <p className="text-muted">{managedPricing.text}</p>
              <p className="text-sm text-muted">Typical starting point: {managedPricing.from} per month</p>
            </div>
            <ButtonLink href="/contact?type=managed" size="lg">Get a quote</ButtonLink>
          </div>
        </Container>
      </Section>
      <WorkModels />
      <Section tone="white">
        <Container className="flex flex-col gap-10">
          <SectionHeader align="center" title="Compare plans" />
          <div className="overflow-x-auto rounded-3xl border border-line bg-white">
            <table className="w-full min-w-[640px] text-left">
              <thead className="border-b border-line">
                <tr>
                  <th scope="col" className="px-6 py-5 text-sm font-medium text-muted">Feature</th>
                  {plans.map((p) => <th key={p.key} scope="col" className="px-6 py-5 text-center font-display text-lg font-bold">{p.name}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {comparison.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row" className="px-6 py-4 text-[15px] font-medium text-ink">{row.feature}</th>
                    {row.values.map((v, i) => <td key={i} className="px-6 py-4 text-center"><Cell v={v} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <SectionHeader kicker="FAQ" title="Billing questions" />
          <FaqList items={faqs} />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
