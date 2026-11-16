'use client';

import { useState } from 'react';
import { Layers, Megaphone, Pin, ShieldCheck } from 'lucide-react';
import { PhoneMockup, type PhoneVariant } from '@/components/illustrations/phone';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeader } from '@/components/ui/layout';
import { cn } from '@/lib/utils';

const formats: {
  key: PhoneVariant; label: string; source: string; icon: typeof Megaphone; summary: string;
  specs: { k: string; v: string }[]; href: string; cta: string;
}[] = [
  {
    key: 'sponsored', label: 'Sponsored message', source: 'Official Telegram Ads', icon: ShieldCheck,
    summary: 'Telegram’s own ad format: a short message shown under posts in large public channels.',
    specs: [
      { k: 'Placement', v: 'Public channels, below the latest posts' },
      { k: 'Creative', v: 'Up to 160 characters plus a button' },
      { k: 'Targeting', v: 'By channel, topic or audience' },
      { k: 'Pricing', v: 'CPM bid, per 1,000 views' },
    ],
    href: '/services/telegram-ads-management', cta: 'Telegram Ads management',
  },
  {
    key: 'post', label: 'Channel post', source: 'Channel marketplace', icon: Megaphone,
    summary: 'Your ad published as a native post by a channel your audience already trusts.',
    specs: [
      { k: 'Placement', v: 'In the channel feed, like a normal post' },
      { k: 'Creative', v: 'Text, image or video with links' },
      { k: 'Targeting', v: 'Through the channels you choose' },
      { k: 'Pricing', v: 'Fixed price per post' },
    ],
    href: '/services/channel-promotion', cta: 'Channel promotion',
  },
  {
    key: 'pinned', label: 'Pinned post', source: 'Channel marketplace', icon: Pin,
    summary: 'Your post stays pinned at the top of the channel for an agreed period.',
    specs: [
      { k: 'Placement', v: 'Top of the channel, always visible' },
      { k: 'Creative', v: 'Text, image or video with links' },
      { k: 'Duration', v: '24 hours to several days' },
      { k: 'Pricing', v: 'Fixed price per period' },
    ],
    href: '/marketplace', cta: 'Browse channels',
  },
  {
    key: 'bulk', label: 'Bulk campaign', source: 'Managed service', icon: Layers,
    summary: 'One brief published across many channels at once, with a variation and tracked link for each.',
    specs: [
      { k: 'Placement', v: 'Dozens of matched channels' },
      { k: 'Creative', v: 'Several variations to compare' },
      { k: 'Tracking', v: 'A tracked link per channel' },
      { k: 'Pricing', v: 'Package quote' },
    ],
    href: '/services/bulk-ad-posting', cta: 'Bulk ad posting',
  },
];

export function AdFormats() {
  const [active, setActive] = useState(0);
  const f = formats[active];
  return (
    <Section id="formats" tone="mist">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          align="center"
          kicker="Ad formats"
          title="Every way to advertise on Telegram, in one place"
          description="Pick a format to see how it appears inside Telegram. We help you choose the right mix for your goal and budget."
        />
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_320px_1fr] lg:gap-12">
          <div role="tablist" aria-label="Ad formats" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {formats.map((x, i) => (
              <button
                key={x.key}
                role="tab"
                id={`format-tab-${x.key}`}
                aria-selected={i === active}
                aria-controls="format-panel"
                onClick={() => setActive(i)}
                className={cn(
                  'flex min-w-[220px] flex-none items-center gap-3.5 rounded-2xl border p-4 text-left transition-all lg:min-w-0',
                  i === active ? 'border-brand bg-white shadow-[var(--shadow-card)]' : 'border-transparent hover:bg-white/70',
                )}
              >
                <span className={cn('flex h-11 w-11 flex-none items-center justify-center rounded-xl', i === active ? 'bg-brand text-white' : 'bg-white text-brand')}>
                  <x.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-bold text-ink">{x.label}</span>
                  <span className="text-sm text-muted">{x.source}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <PhoneMockup key={f.key} variant={f.key} animate className="scale-[0.95]" />
          </div>

          <div id="format-panel" role="tabpanel" aria-labelledby={`format-tab-${f.key}`} className="rounded-3xl border border-line bg-white p-7 shadow-[var(--shadow-card)]">
            <p className="text-sm font-semibold text-brand">{f.source}</p>
            <h3 className="mt-1 text-2xl font-bold">{f.label}</h3>
            <p className="mt-3 text-[15px] text-muted">{f.summary}</p>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {f.specs.map((s) => (
                <div key={s.k} className="flex justify-between gap-4 py-3 text-[15px]">
                  <dt className="text-muted">{s.k}</dt>
                  <dd className="text-right font-semibold text-ink">{s.v}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink href={f.href} className="mt-6 w-full">{f.cta}</ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
