import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, UserRound } from 'lucide-react';
import { getService, services } from '@/data/services';
import { site } from '@/data/site';
import { Icon } from '@/components/ui/icon';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeader } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { FaqList, faqJsonLd } from '@/components/site/faq-list';
import { CtaBand } from '@/components/site/cta-band';
import { ServiceArt } from '@/components/illustrations/service-art';
import { InView } from '@/components/motion/reveal';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return { title: s.title.charAt(0).toUpperCase() + s.title.slice(1), description: s.short, alternates: { canonical: `/services/${s.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  const serviceLd = { '@context': 'https://schema.org', '@type': 'Service', name: s.title, description: s.description, provider: { '@type': 'Organization', name: site.name, url: site.url }, areaServed: 'Worldwide', serviceType: 'Telegram advertising' };

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services', href: '/services' }, { label: s.title, href: `/services/${s.slug}` }]}
        title={s.title.charAt(0).toUpperCase() + s.title.slice(1)}
        description={s.description}
        actions={<>
          <ButtonLink href={`/contact?service=${s.slug}`} size="lg">{s.cta}</ButtonLink>
          <ButtonLink href="/pricing" variant="secondary" size="lg">See pricing</ButtonLink>
        </>}
        aside={
          <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[var(--shadow-float)]">
            {ServiceArt({ slug: s.slug }) && (
              <InView className="relative h-44 overflow-hidden bg-gradient-to-br from-sky via-tg-soft to-violet-soft">
                <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
                <ServiceArt slug={s.slug} />
              </InView>
            )}
            <div className="p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-tg to-violet text-white shadow-md"><Icon name={s.icon} className="h-6 w-6" /></span>
              <p className="font-display text-xl font-bold">What you get</p>
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              {s.deliverables.map((d) => <li key={d} className="flex gap-3 text-[15px] text-ink-2"><span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-tg-soft"><Check className="h-3.5 w-3.5 text-brand" strokeWidth={3} aria-hidden="true" /></span>{d}</li>)}
            </ul>
            </div>
          </div>
        }
      />

      <Section tone="white">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <div className="flex flex-col gap-5">
            <h2 className="text-[30px] font-bold leading-tight sm:text-[36px]">Who it’s for</h2>
            <ul className="flex flex-col gap-3">
              {s.bestFor.map((b) => <li key={b} className="flex items-start gap-3 rounded-2xl bg-mist p-4 text-ink-2"><UserRound className="mt-0.5 h-5 w-5 flex-none text-brand" aria-hidden="true" />{b}</li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-[30px] font-bold leading-tight sm:text-[36px]">How we deliver it</h2>
            <ol className="grid gap-4 sm:grid-cols-2">
              {s.steps.map((st, i) => (
                <li key={st.title} className="flex flex-col gap-3 rounded-[26px] border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-tg to-brand font-display text-lg font-bold text-white shadow-[0_12px_24px_-10px_rgb(22_115_196/0.7)]">{i + 1}</span>
                  <h3 className="text-lg font-bold">{st.title}</h3>
                  <p className="text-[15px] text-muted">{st.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <SectionHeader kicker="FAQ" title="Questions about this service" />
          <FaqList items={s.faqs} idPrefix={`${s.slug}-faq`} />
        </Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(s.faqs)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      </Section>

      <Section tone="white">
        <Container className="flex flex-col gap-10">
          <SectionHeader title="Related services" action={<ButtonLink href="/services" variant="secondary">All services<ArrowRight className="h-4 w-4" aria-hidden="true" /></ButtonLink>} />
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="group flex flex-col gap-3 rounded-[26px] border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-tg to-brand text-white shadow-md transition-transform group-hover:scale-105"><Icon name={r.icon} className="h-5 w-5" /></span>
                <span className="font-display text-lg font-bold text-ink">{r.title}</span>
                <span className="text-[15px] text-muted">{r.short}</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand title={`Ready to talk about ${s.title.toLowerCase()}?`} primary={{ label: s.cta, href: `/contact?service=${s.slug}` }} />
    </>
  );
}
