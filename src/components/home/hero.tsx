import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container, HeaderSpacer } from '@/components/ui/layout';
import { HeroVisual } from './hero-visual';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* background: aurora + grid */}
      <div className="aurora pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <span className="-right-32 -top-40 h-[620px] w-[620px] bg-tg/40" />
        <span className="right-1/3 top-1/3 h-[420px] w-[420px] bg-violet/25" />
        <span className="-left-40 bottom-0 h-[460px] w-[460px] bg-cyan/25" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b" aria-hidden="true" />
      <HeaderSpacer />

      <Container className="grid items-center gap-6 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.02fr_1fr] lg:gap-4 lg:pb-24">
        <div className="anim-fade flex flex-col gap-7">
          <Link href="/chrome-extension" className="group inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white/80 py-1 pl-1 pr-3 text-sm font-medium text-ink-2 shadow-sm backdrop-blur hover:border-brand">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand to-violet px-2.5 py-0.5 text-xs font-bold text-white"><Sparkles className="h-3 w-3" aria-hidden="true" />New</span>
            Free Chrome extension for channel research
            <ArrowRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          <h1 className="text-[44px] font-bold leading-[0.98] tracking-[-0.045em] sm:text-[62px] lg:text-[72px]">
            Scale your brand with Telegram ads <span className="text-gradient">that convert</span>
          </h1>

          <p className="max-w-[33em] text-lg text-muted sm:text-xl">
            We plan, create and manage Telegram Ads campaigns and channel promotions that reach your real buyers, with reporting that shows every result.
          </p>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg" className="group">Get started<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></ButtonLink>
            <ButtonLink href="#services" variant="secondary" size="lg">Explore services</ButtonLink>
          </div>

          <dl className="mt-2 grid max-w-[560px] grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-white/70 backdrop-blur">
            <div className="px-4 py-3.5">
              <dt className="text-xs text-muted" title="Telegram, March 2025">Monthly Telegram users</dt>
              <dd className="font-display text-lg font-bold text-ink sm:text-2xl">1B+</dd>
            </div>
            <div className="px-4 py-3.5">
              <dt className="text-xs text-muted">Ad formats we run</dt>
              <dd className="font-display text-lg font-bold text-ink sm:text-2xl">Ads + posts</dd>
            </div>
            <div className="px-4 py-3.5">
              <dt className="text-xs text-muted">Results reporting</dt>
              <dd className="font-display text-lg font-bold text-ink sm:text-2xl">Weekly</dd>
            </div>
          </dl>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2">
            {['Free consultation', 'Fixed quote before launch', 'Proof of every placement'].map((p) => (
              <li key={p} className="flex items-center gap-1.5"><Check className="h-4 w-4 text-mint" strokeWidth={3} aria-hidden="true" />{p}</li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
