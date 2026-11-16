import { ClipboardList, Compass, Rocket, LineChart, Check } from 'lucide-react';
import { Container } from '@/components/ui/layout';
import { InView, Reveal } from '@/components/motion/reveal';

const steps = [
  {
    icon: ClipboardList, title: 'Share your requirements',
    text: 'Tell us about your product, audience, goals and budget in a free consultation or through our contact form.',
    chip: <span className="flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success"><Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />Brief received</span>,
  },
  {
    icon: Compass, title: 'Choose your advertising strategy',
    text: 'We recommend the right mix of official Telegram Ads and channel placements, with a fixed quote you approve.',
    chip: <span className="flex gap-1.5"><span className="rounded-full bg-tg-soft px-2.5 py-1 text-xs font-semibold text-brand">Telegram Ads</span><span className="rounded-full bg-violet-soft px-2.5 py-1 text-xs font-semibold text-violet">Channels</span></span>,
  },
  {
    icon: Rocket, title: 'Launch your campaign',
    text: 'Ads are written, approved and published on schedule. You receive proof of every placement as it goes live.',
    chip: <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink shadow-sm"><span className="relative flex h-2 w-2"><span className="ping-soft absolute inset-0 rounded-full bg-mint" /><span className="relative h-2 w-2 rounded-full bg-mint" /></span>Campaign live</span>,
  },
  {
    icon: LineChart, title: 'Track your results',
    text: 'Weekly reports show spend next to clicks, joins and conversions, and budget moves to what performs best.',
    chip: (
      <svg viewBox="0 0 90 26" className="h-6 w-24" aria-hidden="true"><path className="draw-path" style={{ ['--len' as string]: 120 } as React.CSSProperties} d="M2 22 L18 17 L32 19 L48 11 L62 13 L78 5 L88 3" fill="none" stroke="#1673c4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      <Container className="flex flex-col gap-16">
        <Reveal className="mx-auto flex max-w-[720px] flex-col items-center gap-4 text-center">
          <p className="text-[15px] font-semibold text-brand">How it works</p>
          <h2 className="text-[34px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[46px] lg:text-[54px]">From brief to results in <span className="text-gradient">four simple steps</span></h2>
          <p className="text-lg text-muted">A transparent process. You always know what happens next and what it costs.</p>
        </Reveal>

        <InView className="relative">
          {/* connecting flight path (desktop) */}
          <svg className="pointer-events-none absolute left-0 right-0 top-10 hidden h-24 w-full lg:block" viewBox="0 0 1200 100" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="hiw-line" x1="0" x2="1"><stop offset="0" stopColor="#2aabee" /><stop offset="1" stopColor="#6e56f7" /></linearGradient></defs>
            <path d="M150 40 C 300 -10, 340 90, 450 40 S 650 -10, 750 40 S 950 90, 1050 40" fill="none" stroke="url(#hiw-line)" strokeWidth="2.5" strokeDasharray="2 10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.12} className="group relative flex flex-col items-start gap-4 rounded-[28px] border border-line bg-white/90 p-6 backdrop-blur transition-shadow hover:shadow-[var(--shadow-float)] lg:items-center lg:border-transparent lg:bg-transparent lg:text-center lg:hover:border-line lg:hover:bg-white">
                <span className="relative flex h-20 w-20 items-center justify-center rounded-[26px] bg-gradient-to-br from-tg to-brand text-white shadow-[0_18px_40px_-14px_rgb(22_115_196/0.8)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-4deg]">
                  <s.icon className="h-9 w-9" aria-hidden="true" />
                  <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-violet font-display text-sm font-bold">{i + 1}</span>
                </span>
                <h3 className="text-[21px] font-bold">{s.title}</h3>
                <p className="text-[15px] text-muted">{s.text}</p>
                <div className="mt-auto pt-1">{s.chip}</div>
              </Reveal>
            ))}
          </ol>
        </InView>
      </Container>
    </section>
  );
}
