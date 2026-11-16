import type { Metadata } from 'next';
import { BadgeCheck, CalendarCheck, CreditCard, FileCheck2, Send } from 'lucide-react';
import { MarketplaceBrowser } from '@/components/marketplace/marketplace-browser';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeader } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';
import { ChannelOwners } from '@/components/home/channel-owners';

export const metadata: Metadata = {
  title: 'Telegram Channel Marketplace: Buy Ads on Verified Channels',
  description: 'Browse Telegram channels by niche, country, language, audience size and price. Verified owners, metrics with sources, and bookings with proof of publication.',
  alternates: { canonical: '/marketplace' },
};

const steps = [
  { icon: Send, title: 'Request a slot', text: 'Choose a channel, ad format and date, and send your creative.' },
  { icon: CalendarCheck, title: 'Owner confirms', text: 'The channel owner accepts the date or suggests another.' },
  { icon: CreditCard, title: 'Pay securely', text: 'Payment is held until your post is published.' },
  { icon: FileCheck2, title: 'Get proof', text: 'You receive the post link and a performance summary.' },
];

export default function MarketplacePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Channel Marketplace', href: '/marketplace' }]}
        kicker="Channel Marketplace"
        title="Buy ads on verified Telegram channels"
        description="Find channels that match your audience, compare real metrics and prices, and book ad slots in a few clicks."
        actions={<>
          <ButtonLink href="#browse" size="lg">Browse channels</ButtonLink>
          <ButtonLink href="/register?type=channel-owner" variant="secondary" size="lg">List your channel</ButtonLink>
        </>}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-ink-2">
          {['Ownership-verified channels', 'Metrics with source and date', 'Payment released after publication'].map((t) => (
            <li key={t} className="flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-brand" aria-hidden="true" />{t}</li>
          ))}
        </ul>
      </PageHero>

      <Section id="browse" tone="white" className="pt-12 sm:pt-14">
        <Container><MarketplaceBrowser /></Container>
      </Section>

      <Section tone="mist">
        <Container className="flex flex-col gap-12">
          <SectionHeader align="center" kicker="How booking works" title="From request to proof of publication" />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3 rounded-3xl border border-line bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-tg-soft text-brand"><s.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="font-display text-3xl font-bold text-sky-2">{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="text-[15px] text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <div className="bg-white pt-24"><ChannelOwners /></div>
      <CtaBand title="Own a Telegram channel?" text="List it on the marketplace, set your prices and approve every ad before it is published." primary={{ label: 'List your channel', href: '/register?type=channel-owner' }} secondary={{ label: 'Learn how it works', href: '/help#channel-owners' }} />
    </>
  );
}
