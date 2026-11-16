import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, MessagesSquare } from 'lucide-react';
import { homepageServices } from '@/data/services';
import { Icon } from '@/components/ui/icon';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/layout';
import { InView, Reveal } from '@/components/motion/reveal';
import { Tilt } from '@/components/motion/tilt';
import { CampaignDashboardArt, ServiceArt } from '@/components/illustrations/service-art';

const tints: Record<string, string> = {
  'channel-promotion': 'from-[#e3f3fc] to-[#cfe9fa]',
  'targeted-audience-reach': 'from-[#efecff] to-[#e2dcff]',
  'ad-creation-copywriting': 'from-[#e6f7f1] to-[#d3f1e6]',
  'channel-research': 'from-[#e8f1fb] to-[#dbe8f7]',
  'bulk-ad-posting': 'from-[#e3f6fb] to-[#cdeef8]',
  'optimization-reporting': 'from-[#f0ecff] to-[#e3f3fc]',
};

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function ServicesShowcase() {
  const [lead, ...rest] = homepageServices;
  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-white via-mist to-white py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" aria-hidden="true" />
      <Container className="relative flex flex-col gap-14">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div className="flex max-w-[700px] flex-col gap-4">
            <p className="text-[15px] font-semibold text-brand">Our services</p>
            <h2 className="text-[34px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[46px] lg:text-[54px]">
              Everything your Telegram campaign needs, <span className="text-gradient">under one roof</span>
            </h2>
            <p className="text-lg text-muted">Take one service or hand us the whole campaign. Every engagement starts with a free consultation, so you know the plan and the cost before anything goes live.</p>
          </div>
          <ButtonLink href="/services" variant="secondary" className="group">All services<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></ButtonLink>
        </Reveal>

        {/* Featured: Telegram Ads campaign management */}
        <Reveal variant="scale">
          <InView as="article" className="relative grid gap-10 overflow-hidden rounded-[32px] bg-[linear-gradient(125deg,#1e8fd6_0%,#1673c4_48%,#5b4ce0_100%)] p-7 text-white shadow-[0_40px_80px_-40px_rgb(22_115_196/0.8)] sm:p-11 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border-[40px] border-white/10" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan/30 blur-3xl" aria-hidden="true" />
            <div className="relative flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand shadow-lg"><Icon name={lead.icon} className="h-7 w-7" /></span>
                <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-semibold backdrop-blur">Flagship service</span>
              </div>
              <h3 className="text-[30px] font-bold leading-tight text-white sm:text-[40px]">{titleCase(lead.title)}</h3>
              <p className="max-w-[38em] text-[17px] text-white/90">{lead.description}</p>
              <ul className="grid gap-x-6 gap-y-2.5 text-[15px] sm:grid-cols-2">
                {lead.deliverables.map((d) => (
                  <li key={d} className="flex gap-2.5"><span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/20"><Check className="h-3 w-3" strokeWidth={3.5} aria-hidden="true" /></span>{d}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-1">
                <ButtonLink href={`/contact?service=${lead.slug}`} variant="white" className="group">{lead.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></ButtonLink>
                <ButtonLink href={`/services/${lead.slug}`} variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Learn more</ButtonLink>
              </div>
            </div>
            <div className="relative"><CampaignDashboardArt /></div>
          </InView>
        </Reveal>

        {/* Six services */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <Tilt as="article" className="group relative h-full rounded-[28px] border border-line bg-white shadow-[0_1px_2px_rgb(12_27_51/0.04)] hover:shadow-[var(--shadow-float)]">
                <InView className={`relative h-44 overflow-hidden rounded-t-[27px] bg-gradient-to-br ${tints[s.slug] ?? 'from-sky to-tg-soft'}`}>
                  <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
                  <ServiceArt slug={s.slug} />
                </InView>
                <div className="flex flex-col gap-3 p-7">
                  <span className="relative z-10 -mt-14 mb-1 flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-white bg-brand text-white shadow-md transition-colors group-hover:bg-violet">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-[21px] font-bold leading-snug">{titleCase(s.title)}</h3>
                  <p className="text-[15px] text-muted">{s.short}</p>
                  <Link href={`/services/${s.slug}`} className="mt-2 flex items-center gap-1.5 text-[15px] font-semibold text-brand after:absolute after:inset-0 after:rounded-[28px]">
                    Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-line bg-white/80 p-5 backdrop-blur sm:flex-row sm:px-7">
          <p className="flex items-center gap-3 text-[16px] font-medium text-ink-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-soft text-violet"><MessagesSquare className="h-5 w-5" aria-hidden="true" /></span>
            Not sure which service fits? Get a free strategy call and a recommended plan.
          </p>
          <ButtonLink href="/contact" size="sm">Talk to an expert</ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
