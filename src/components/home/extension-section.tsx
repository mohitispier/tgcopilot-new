'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { BadgeCheck, Bookmark, Download, ExternalLink, Eye, MessageSquareQuote, MousePointer2, Pin, Puzzle, ShieldCheck } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/layout';
import { Reveal } from '@/components/motion/reveal';
import { site } from '@/data/site';
import { formatNumber } from '@/lib/utils';
import { sampleChannels, engagement } from '@/data/channels';

const features = [
  { icon: Eye, title: 'Instant channel insights', text: 'Subscribers, category and details on any public t.me page.' },
  { icon: Bookmark, title: 'Save to shortlists', text: 'Build channel lists that sync with your account.' },
  { icon: MessageSquareQuote, title: 'One-click quotes', text: 'Ask for an ad price without leaving the page.' },
  { icon: ShieldCheck, title: 'Private by design', text: 'Reads only the channel page you open. Never your chats.' },
];

const steps = [
  { icon: Download, title: 'Install', text: 'Add it to Chrome for free' },
  { icon: Pin, title: 'Pin it', text: 'Keep it in your toolbar' },
  { icon: MousePointer2, title: 'Open a channel', text: 'Click the icon on any t.me page' },
];

export function BrowserScene() {
  const ref = useRef<HTMLDivElement>(null);
  const c = sampleChannels[0];
  function onMove(e: React.PointerEvent) {
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    if (ref.current) ref.current.style.transform = `rotateY(${-10 + x * 10}deg) rotateX(${6 - y * 8}deg)`;
  }
  return (
    <div className="relative [perspective:1600px]" onPointerMove={onMove} onPointerLeave={() => ref.current && (ref.current.style.transform = '')} role="img" aria-label="Illustration: the TG Copilot extension popup showing channel details over a Telegram channel page">
      <div ref={ref} className="relative transition-transform duration-500 ease-out [transform-style:preserve-3d] [transform:rotateY(-10deg)_rotateX(6deg)]">
        {/* browser window */}
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_50px_100px_-40px_rgb(15_35_71/0.45)]">
          <div className="flex h-11 items-center gap-2 border-b border-line bg-mist px-4">
            <span className="h-3 w-3 rounded-full bg-[#f2b8b5]" /><span className="h-3 w-3 rounded-full bg-[#f5d9a8]" /><span className="h-3 w-3 rounded-full bg-[#b9e3c8]" />
            <span className="ml-3 flex h-7 flex-1 items-center gap-2 rounded-lg border border-line bg-white px-3 text-xs text-muted"><ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden="true" />t.me/s/{c.username}</span>
            <span className="relative ml-2 flex h-7 w-7 items-center justify-center rounded-lg bg-tg text-white shadow-md">
              <Puzzle className="h-4 w-4" aria-hidden="true" />
              <span className="ping-soft absolute inset-0 rounded-lg bg-tg/40" aria-hidden="true" />
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-6 p-6 [background-image:radial-gradient(rgb(22_115_196/0.07)_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="h-12 w-12 rounded-full" style={{ background: c.color }} />
                <div className="flex flex-col gap-1.5"><span className="h-2.5 w-32 rounded-full bg-[#cfdceb]" /><span className="h-2 w-20 rounded-full bg-[#e2eaf3]" /></div>
              </div>
              {[90, 76, 84, 66].map((w, i) => <span key={i} className="block h-16 rounded-2xl rounded-bl-md bg-white shadow-sm" style={{ width: `${w}%` }} />)}
            </div>
            <span className="w-24" />
          </div>
        </div>
        {/* extension popup floats in front */}
        <div className="absolute -right-3 top-14 w-[270px] rounded-2xl border border-line bg-white p-4 shadow-[0_40px_80px_-30px_rgb(15_35_71/0.55)] [transform:translateZ(80px)] sm:-right-8">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-ink"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-tg text-white"><Puzzle className="h-3.5 w-3.5" aria-hidden="true" /></span>TG Copilot</span>
            <span className="rounded-md bg-warning-soft px-1.5 py-0.5 text-[10px] font-bold text-warning">Sample</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: c.color }}>{c.initials}</span>
            <span className="flex flex-col leading-tight"><span className="flex items-center gap-1 font-bold text-ink">{c.title}<BadgeCheck className="h-4 w-4 text-brand" aria-hidden="true" /></span><span className="text-xs text-muted">@{c.username}</span></span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[['Subscribers', formatNumber(c.subscribers)], ['Avg. views', formatNumber(c.avgViews)], ['Engagement', `${engagement(c)}%`], ['Category', c.category]].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-mist px-3 py-2"><p className="text-[10.5px] text-muted">{k}</p><p className="text-[15px] font-bold text-ink">{v}</p></div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[13px] font-semibold">
            <span className="rounded-xl bg-brand py-2 text-center text-white">Save</span>
            <span className="rounded-xl border border-line-2 py-2 text-center text-ink">Get a quote</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExtensionSection() {
  const hasStore = !!site.chromeStoreUrl;
  return (
    <section id="extension" className="relative overflow-hidden bg-[linear-gradient(180deg,#eef7fd_0%,#f6f3ff_100%)] py-24 sm:py-28 lg:py-32">
      <div className="aurora pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="-left-32 top-10 h-[420px] w-[420px] bg-tg/25" />
        <span className="right-0 top-1/2 h-[380px] w-[380px] bg-violet/20" />
        <span className="bottom-0 left-1/2 h-[300px] w-[300px] bg-cyan/20" />
      </div>
      <Container className="relative flex flex-col gap-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="flex flex-col gap-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand shadow-sm"><Puzzle className="h-4 w-4" aria-hidden="true" />Free Chrome extension</p>
            <h2 className="text-[34px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[46px] lg:text-[52px]">Check any Telegram channel <span className="text-gradient">before you buy an ad</span></h2>
            <p className="text-lg text-muted">The TG Copilot extension shows what matters for advertising right on the channel page, so you can shortlist the right channels and skip the inactive ones.</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f.title} className="flex gap-3 rounded-2xl border border-white bg-white/70 p-4 backdrop-blur">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-tg to-brand text-white"><f.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span><span className="block font-bold text-ink">{f.title}</span><span className="text-sm text-muted">{f.text}</span></span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              {hasStore ? (
                <ButtonLink href={site.chromeStoreUrl} size="lg"><Download className="h-5 w-5" aria-hidden="true" />Download extension</ButtonLink>
              ) : (
                <ButtonLink href="/chrome-extension#install" size="lg" data-integration="chrome-web-store-link" title="Chrome Web Store link will be added once the extension is published"><Download className="h-5 w-5" aria-hidden="true" />Download extension</ButtonLink>
              )}
              <ButtonLink href="/chrome-extension" variant="secondary" size="lg">See all features<ExternalLink className="h-4 w-4" aria-hidden="true" /></ButtonLink>
            </div>
            {!hasStore && <p className="text-sm text-muted">Chrome Web Store listing coming soon. <Link href="/contact?topic=extension" className="font-semibold text-brand hover:underline">Get notified at launch</Link></p>}
          </Reveal>
          <Reveal variant="right" delay={0.1}><BrowserScene /></Reveal>
        </div>

        <Reveal className="rounded-[28px] border border-white bg-white/80 p-6 shadow-[var(--shadow-card)] backdrop-blur sm:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr]">
            <p className="font-display text-xl font-bold text-ink lg:max-w-[180px]">Get started in under a minute</p>
            <ol className="grid gap-4 sm:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title} className="flex items-center gap-4">
                  <span className="relative flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-tg-soft text-brand">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">{i + 1}</span>
                  </span>
                  <span><span className="block font-bold text-ink">{s.title}</span><span className="text-sm text-muted">{s.text}</span></span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
