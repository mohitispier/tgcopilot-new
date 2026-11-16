import type { Metadata } from 'next';
import { CalendarCheck, Clock, Mail, MapPin, Send } from 'lucide-react';
import { ContactForm } from '@/components/site/contact-form';
import { Container, Section, HeaderSpacer } from '@/components/ui/layout';
import { Breadcrumbs } from '@/components/site/page-hero';
import { site, telegramUrl } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact Us: Book a Free Telegram Ads Consultation',
  description: 'Tell us what you want to promote on Telegram. We reply within one working day with ideas, a plan and a free consultation slot.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string; topic?: string; type?: string; channel?: string }> }) {
  const sp = await searchParams;
  const initialTopic = sp.service ?? sp.topic ?? sp.type;
  const channel = sp.channel && /^[A-Za-z0-9_]{4,32}$/.test(sp.channel) ? sp.channel : undefined;
  return (
    <section className="relative overflow-hidden bg-mist">
        <HeaderSpacer />
      <div className="aurora pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="-right-32 -top-40 h-[520px] w-[520px] bg-tg/30" />
        <span className="bottom-0 right-1/4 h-[380px] w-[380px] bg-violet/20" />
        <span className="-left-32 top-1/3 h-[340px] w-[340px] bg-cyan/20" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b" aria-hidden="true" />
      <Container className="relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div className="flex flex-col gap-7">
          <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />
          <h1 className="text-[38px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[56px]">Let’s plan your <span className="text-gradient">Telegram campaign</span></h1>
          <p className="text-lg text-muted">Tell us what you want to promote. We’ll reply {site.responseTime} with ideas and a slot for a free consultation.</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-tg to-brand text-white shadow-md"><Mail className="h-5 w-5" aria-hidden="true" /></span>
                <span><span className="block text-sm text-muted">Email</span><span className="font-semibold text-ink">{site.email}</span></span>
              </a>
            </li>
            <li>
              <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-tg to-brand text-white shadow-md"><Send className="h-5 w-5" aria-hidden="true" /></span>
                <span><span className="block text-sm text-muted">Telegram</span><span className="font-semibold text-ink">@{site.telegram}</span></span>
              </a>
            </li>
            <li className="flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 backdrop-blur">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-tg to-brand text-white shadow-md"><MapPin className="h-5 w-5" aria-hidden="true" /></span>
              <span><span className="block text-sm text-muted">Based in</span><span className="font-semibold text-ink">{site.location}, working worldwide</span></span>
            </li>
          </ul>
          <div className="flex flex-col gap-3 rounded-3xl border border-white bg-white/80 p-6 backdrop-blur">
            <p className="flex items-center gap-2 font-display text-lg font-bold"><CalendarCheck className="h-5 w-5 text-brand" aria-hidden="true" />What happens next</p>
            <ol className="flex flex-col gap-2 text-[15px] text-ink-2">
              <li className="flex gap-2"><span className="font-bold text-brand">1.</span>We review your message and reply {site.responseTime}.</li>
              <li className="flex gap-2"><span className="font-bold text-brand">2.</span>A 20 to 30 minute call to understand your goals.</li>
              <li className="flex gap-2"><span className="font-bold text-brand">3.</span>You receive a written plan with a fixed quote.</li>
            </ol>
            <p className="flex items-center gap-2 text-sm text-muted"><Clock className="h-4 w-4" aria-hidden="true" />Working hours: [Mon–Sat, 10:00–19:00 IST]</p>
          </div>
        </div>
        <div><ContactForm initialTopic={initialTopic} channel={channel} /></div>
      </Container>
    </section>
  );
}
