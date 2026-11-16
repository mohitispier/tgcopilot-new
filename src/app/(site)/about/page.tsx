import type { Metadata } from 'next';
import { ArrowRight, Eye, Handshake, Target, Users } from 'lucide-react';
import { services } from '@/data/services';
import { Icon } from '@/components/ui/icon';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';
import { FeatureGrid, SectionTitle } from '@/components/site/feature-grid';
import { OrbitVisual } from '@/components/illustrations/orbit-visual';
import { HowItWorks } from '@/components/home/how-it-works';
import { Reveal } from '@/components/motion/reveal';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'TG Copilot is a Telegram advertising agency and platform helping businesses, marketers and agencies reach customers on Telegram.',
  alternates: { canonical: '/about' },
};

const values = [
  { icon: Target, title: 'Results over reach', text: 'We optimise for the result you care about, not for impressive-looking numbers.' },
  { icon: Eye, title: 'Radical transparency', text: 'You see every placement, every price and every result. No hidden margins on channel prices.' },
  { icon: Handshake, title: 'Fair to channel owners', text: 'Owners approve every ad and get paid reliably. Good partners make better placements.' },
  { icon: Users, title: 'Specialists, not generalists', text: 'Telegram is all we do, so we know its formats, policies and communities in depth.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about' }]}
        kicker="About TG Copilot"
        title="We help businesses grow on Telegram"
        description={`TG Copilot is a Telegram advertising agency and platform based in ${site.location}. We combine a hands-on team with tools that make Telegram advertising clear, measurable and easy to scale.`}
        actions={<>
          <ButtonLink href="/contact" size="lg" className="group">Work with us<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></ButtonLink>
          <ButtonLink href="/services" variant="secondary" size="lg">Our services</ButtonLink>
        </>}
        aside={<OrbitVisual />}
      />

      <section className="bg-white py-24 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex flex-col gap-5">
            <p className="text-[15px] font-semibold text-brand">Our story</p>
            <h2 className="text-[32px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[44px]">Telegram advertising, <span className="text-gradient">done properly</span></h2>
            <p className="text-lg text-ink-2">Telegram is where many communities read, discuss and buy, yet advertising there has been hard to do well. Channels are scattered, metrics are easy to fake and official Telegram Ads have their own rules.</p>
            <p className="text-lg text-ink-2">We started TG Copilot to fix that: an experienced team that plans and runs campaigns, plus a platform that brings channel discovery, verified listings, AI ad writing and reporting into one place.</p>
            <p className="rounded-2xl border border-dashed border-line-2 bg-mist p-4 text-sm text-muted">[Add founding year, founder names and team size here.]</p>
          </Reveal>
          <Reveal variant="right" delay={0.1} className="flex flex-col gap-5">
            <p className="text-[15px] font-semibold text-brand">What we do</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <a href={`/services/${s.slug}`} className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-white p-3.5 text-[15px] font-semibold text-ink-2 transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-[var(--shadow-card)]">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-tg to-brand text-white transition-transform group-hover:scale-105"><Icon name={s.icon} className="h-[18px] w-[18px]" /></span>
                    {s.title.charAt(0).toUpperCase() + s.title.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="bg-gradient-to-b from-mist to-white py-24 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionTitle align="center" kicker="Our values" title="How we" highlight="work" description="The principles behind every campaign we run." />
          <FeatureGrid items={values} cols={4} />
        </Container>
      </section>

      <HowItWorks />
      <CtaBand title="Let’s work together" />
    </>
  );
}
