import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BadgeCheck, Clock, ExternalLink, Info, MessageSquare } from 'lucide-react';
import { countryNames, engagement, getChannel, sampleChannels } from '@/data/channels';
import { formatNumber, formatPrice } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/button';
import { Container, SampleTag, Section, HeaderSpacer } from '@/components/ui/layout';
import { Breadcrumbs } from '@/components/site/page-hero';
import { ChannelAvatar, ChannelCard } from '@/components/marketplace/channel-card';

export function generateStaticParams() {
  return sampleChannels.map((c) => ({ username: c.username }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const c = getChannel((await params).username);
  if (!c) return {};
  // Sample listings must not be indexed as real channels.
  return { title: `${c.title}: advertise on this Telegram channel`, description: c.description, robots: { index: false } };
}

const formatPriceMultiplier: Record<string, number> = { 'Sponsored post': 1, 'Pinned post': 1.8, '24h top post': 1.4, 'Custom package': 3 };
const formatNote: Record<string, string> = {
  'Sponsored post': 'One post in the feed, stays published',
  'Pinned post': 'Pinned at the top for 24 hours',
  '24h top post': 'No other posts for 1 hour, then stays 24 hours',
  'Custom package': 'Series of posts agreed with the owner',
};

export default async function ChannelPage({ params }: { params: Promise<{ username: string }> }) {
  const c = getChannel((await params).username);
  if (!c) notFound();
  const similar = sampleChannels.filter((x) => x.category === c.category && x.username !== c.username).concat(sampleChannels.filter((x) => x.category !== c.category)).slice(0, 3);
  const metrics = [
    { k: 'Subscribers', v: formatNumber(c.subscribers) },
    { k: 'Average views per post', v: formatNumber(c.avgViews) },
    { k: 'Engagement rate', v: `${engagement(c)}%` },
    { k: 'Audience country', v: countryNames[c.country] ?? c.country },
  ];

  return (
    <>
      <section className="border-b border-line bg-mist">
        <HeaderSpacer />
        <Container className="flex flex-col gap-8 py-10 sm:py-14">
          <Breadcrumbs items={[{ label: 'Marketplace', href: '/marketplace' }, { label: c.title, href: `/marketplace/${c.username}` }]} />
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <ChannelAvatar c={c} size={80} />
              <div className="flex flex-col gap-1.5">
                <h1 className="flex flex-wrap items-center gap-2 text-[32px] font-bold leading-tight sm:text-[40px]">
                  {c.title}
                  {c.verified && <span className="inline-flex items-center gap-1 rounded-full bg-tg-soft px-2.5 py-1 font-sans text-sm font-semibold text-brand"><BadgeCheck className="h-4 w-4" aria-hidden="true" />Verified owner</span>}
                </h1>
                <p className="text-muted">@{c.username}, {c.category}, {c.language}</p>
                <SampleTag className="w-fit" label="Sample listing for layout preview" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`/register?next=/marketplace/${c.username}`} size="lg">Request a booking</ButtonLink>
              {/* Sample listings have fictional usernames, so the Telegram link stays disabled until real channels are connected. */}
              <span aria-disabled="true" title="Available for real listings" className="inline-flex h-14 cursor-not-allowed items-center gap-2 rounded-[14px] border border-line-2 bg-white px-7 text-[17px] font-semibold text-muted"><ExternalLink className="h-4 w-4" aria-hidden="true" />Open in Telegram</span>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="white" className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-8">
            <div className="rounded-3xl border border-line p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold">Channel metrics</h2>
                <p className="flex items-center gap-1.5 text-sm text-muted"><Clock className="h-4 w-4" aria-hidden="true" />{c.metricsSource}, updated {new Date(c.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {metrics.map((m) => (
                  <div key={m.k} className="rounded-2xl bg-mist p-4">
                    <dt className="text-sm text-muted">{m.k}</dt>
                    <dd className="mt-1 font-display text-2xl font-bold text-ink">{m.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex items-start gap-2 text-sm text-muted"><Info className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />Every metric shows where it came from and when it was last checked. Owner-reported numbers are labelled until we verify them.</p>
            </div>

            <div className="rounded-3xl border border-line p-6 sm:p-7">
              <h2 className="text-xl font-bold">About this channel</h2>
              <p className="mt-3 text-ink-2">{c.description}</p>
              <p className="mt-3 text-sm text-muted">Managed by: {c.managedBy}</p>
            </div>

            <div className="rounded-3xl border border-line p-6 sm:p-7">
              <h2 className="text-xl font-bold">Reviews from advertisers</h2>
              <div className="mt-4 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line-2 bg-mist p-8 text-center">
                <MessageSquare className="h-6 w-6 text-muted" aria-hidden="true" />
                <p className="font-semibold">No reviews yet</p>
                <p className="text-sm text-muted">Only advertisers with a completed booking can leave a review.</p>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-xl font-bold">Ad formats and prices</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {c.formats.map((fm) => (
                  <li key={fm} className="flex items-start justify-between gap-4 rounded-2xl border border-line p-4">
                    <span>
                      <span className="block font-semibold text-ink">{fm}</span>
                      <span className="text-sm text-muted">{formatNote[fm]}</span>
                    </span>
                    <span className="font-display text-lg font-bold text-ink">{formatPrice(Math.round(c.priceFromMinor * formatPriceMultiplier[fm]))}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink href={`/register?next=/marketplace/${c.username}`} className="mt-5 w-full" size="lg">Request a booking</ButtonLink>
              <p className="mt-3 text-center text-sm text-muted">Not sure? <Link href={`/contact?channel=${c.username}`} className="font-semibold text-brand hover:underline">Ask our team</Link></p>
            </div>
          </aside>
        </Container>
      </Section>

      <Section tone="mist" className="py-16 sm:py-20">
        <Container className="flex flex-col gap-8">
          <h2 className="text-[28px] font-bold">Similar channels</h2>
          <div className="grid gap-5 md:grid-cols-3">{similar.map((s) => <ChannelCard key={s.username} c={s} />)}</div>
        </Container>
      </Section>
    </>
  );
}
