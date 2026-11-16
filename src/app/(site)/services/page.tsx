import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { services } from '@/data/services';
import { Icon } from '@/components/ui/icon';
import { ServiceArt } from '@/components/illustrations/service-art';
import { InView, Reveal } from '@/components/motion/reveal';
import { Tilt } from '@/components/motion/tilt';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeader } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { HowItWorks } from '@/components/home/how-it-works';
import { AdFormats } from '@/components/home/ad-formats';
import { FaqList } from '@/components/site/faq-list';
import { CtaBand } from '@/components/site/cta-band';
import { generalFaqs } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Telegram Advertising Services',
  description: 'Telegram Ads campaign management, channel promotion, audience targeting, ad copywriting, channel research, bulk posting and reporting, delivered by Telegram specialists.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services', href: '/services' }]}
        kicker="Advertising services"
        title="Telegram advertising, handled by specialists"
        description="From one sponsored post to a multi-channel launch, we plan, create, place and report on your Telegram advertising. Pick a service or let us recommend the right mix."
        actions={<>
          <ButtonLink href="/contact" size="lg">Book a free consultation</ButtonLink>
          <ButtonLink href="#all-services" variant="secondary" size="lg">Browse services</ButtonLink>
        </>}
      />

      <Section id="all-services" tone="white">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const art = ServiceArt({ slug: s.slug });
              return (
                <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                  <Tilt as="article" className={s.featured ? 'group relative flex h-full flex-col rounded-[28px] border-2 border-brand bg-white shadow-[var(--shadow-card)]' : 'group relative flex h-full flex-col rounded-[28px] border border-line bg-white hover:shadow-[var(--shadow-float)]'}>
                    <InView className="relative h-40 overflow-hidden rounded-t-[26px] bg-gradient-to-br from-sky via-tg-soft to-violet-soft">
                      <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
                      {art ?? (
                        <div className="flex h-full items-center justify-center" aria-hidden="true">
                          <span className="float-slow flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-tg to-violet text-white shadow-xl"><Icon name={s.icon} className="h-9 w-9" /></span>
                        </div>
                      )}
                    </InView>
                    <div className="flex flex-1 flex-col gap-3 p-7">
                      <div className="flex items-start justify-between">
                        <span className="relative z-10 -mt-14 flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-white bg-brand text-white shadow-md transition-colors group-hover:bg-violet"><Icon name={s.icon} className="h-5 w-5" /></span>
                        {s.featured && <span className="rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-white">Most requested</span>}
                      </div>
                      <h2 className="text-[22px] font-bold leading-snug">{s.title.charAt(0).toUpperCase() + s.title.slice(1)}</h2>
                      <p className="text-[15px] text-muted">{s.short}</p>
                      <ul className="flex flex-col gap-1.5 text-sm text-ink-2">
                        {s.deliverables.slice(0, 3).map((d) => <li key={d} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 flex-none text-tg" strokeWidth={3} aria-hidden="true" />{d}</li>)}
                      </ul>
                      <Link href={`/services/${s.slug}`} className="mt-auto flex items-center gap-1.5 pt-3 text-[15px] font-semibold text-brand after:absolute after:inset-0 after:rounded-[28px]">
                        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <AdFormats />
      <HowItWorks />

      <Section tone="mist">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <SectionHeader kicker="FAQ" title="Before you start" description="Common questions about working with us." />
          <FaqList items={generalFaqs} />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
