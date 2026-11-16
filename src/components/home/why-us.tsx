import { Award, BadgeCheck, ChartColumn, Headphones, Link2, Target, Zap } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/layout';
import { InView, Reveal } from '@/components/motion/reveal';

const reasons = [
  { icon: Award, title: 'Telegram advertising expertise', text: 'Telegram is all we do. We know the formats, the policies and which channels deliver real readers.', tone: 'from-tg to-brand' },
  { icon: Target, title: 'Relevant channel targeting', text: 'We start from your buyer and place ads only where that audience reads, by niche, language and region.', tone: 'from-violet to-[#8f7bff]' },
  { icon: Zap, title: 'Efficient campaign management', text: 'Setup, bookings, creatives and moderation handled for you, with budgets watched every day.', tone: 'from-cyan to-tg' },
  { icon: ChartColumn, title: 'Transparent reporting', text: 'Every placement listed with proof, and spend shown next to clicks, joins and conversions.', tone: 'from-mint to-[#0f8a63]' },
  { icon: Headphones, title: 'Dedicated support', text: 'A named campaign manager on Telegram and email, replying within one working day.', tone: 'from-[#f59e0b] to-[#e07a00]' },
];

function ReportCard() {
  const rows = [
    { ch: 'Market Brief', fmt: 'Sponsored post', ok: true },
    { ch: 'Startup Desk', fmt: '24h top post', ok: true },
    { ch: 'Telegram Ads, set A', fmt: 'Sponsored message', ok: true },
  ];
  return (
    <InView className="relative rounded-[28px] border border-line bg-white p-6 shadow-[var(--shadow-float)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-lg font-bold text-ink">Weekly campaign report</p>
          <p className="text-sm text-muted">What every client receives</p>
        </div>
        <span className="rounded-md bg-warning-soft px-2 py-0.5 text-xs font-bold text-warning">Sample</span>
      </div>
      <div className="mt-5 rounded-2xl bg-mist p-4">
        <div className="flex items-center justify-between text-xs font-semibold text-muted"><span>Spend vs results</span><span className="flex items-center gap-3"><span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand" />Spend</span><span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-violet" />Joins</span></span></div>
        <div className="grow-bars mt-3 flex h-28 items-end gap-2">
          {[[40, 30], [52, 44], [48, 50], [60, 62], [58, 70], [66, 82], [64, 88]].map(([a, b], i) => (
            <div key={i} className="flex h-full flex-1 items-end gap-1" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="flex-1 rounded-t bg-brand/80" style={{ height: `${a}%` }} />
              <span className="flex-1 rounded-t bg-violet/80" style={{ height: `${b}%` }} />
            </div>
          ))}
        </div>
      </div>
      <ul className="mt-4 divide-y divide-line">
        {rows.map((r) => (
          <li key={r.ch} className="flex items-center justify-between gap-3 py-3 text-sm">
            <span className="flex items-center gap-2.5"><BadgeCheck className="h-4 w-4 text-success" aria-hidden="true" /><span className="font-semibold text-ink">{r.ch}</span><span className="hidden text-muted sm:inline">{r.fmt}</span></span>
            <span className="flex items-center gap-1 font-semibold text-brand"><Link2 className="h-3.5 w-3.5" aria-hidden="true" />Proof</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-line p-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-tg to-violet font-display text-sm font-bold text-white">PM</span>
        <span className="flex flex-col leading-tight"><span className="text-sm font-bold text-ink">Your campaign manager</span><span className="text-xs text-muted">Available on Telegram and email</span></span>
        <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-success"><span className="h-2 w-2 rounded-full bg-mint" />Online</span>
      </div>
    </InView>
  );
}

export function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgb(42_171_238/0.14),transparent_65%)]" aria-hidden="true" />
      <Container className="relative grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <Reveal className="flex flex-col gap-4">
            <p className="text-[15px] font-semibold text-brand">Why choose TG Copilot</p>
            <h2 className="text-[34px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[46px] lg:text-[52px]">A partner that knows Telegram <span className="text-gradient">inside out</span></h2>
            <p className="text-lg text-muted">Telegram advertising rewards people who know the channels. Here is what you can expect on every campaign.</p>
          </Reveal>
          <Reveal variant="scale" delay={0.1}><ReportCard /></Reveal>
        </div>
        <ul className="flex flex-col gap-4">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.06}>
              <div className="group flex gap-5 rounded-[26px] border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[var(--shadow-float)] sm:p-7">
                <span className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br ${r.tone} text-white shadow-md transition-transform duration-300 group-hover:scale-105`}><r.icon className="h-6 w-6" aria-hidden="true" /></span>
                <span className="flex flex-col gap-1.5">
                  <span className="font-display text-xl font-bold text-ink">{r.title}</span>
                  <span className="text-[15px] text-muted">{r.text}</span>
                </span>
              </div>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.3}>
            <ButtonLink href="/about" variant="secondary" className="mt-2">More about our team</ButtonLink>
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}
