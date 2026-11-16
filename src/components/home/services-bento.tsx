import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { homepageServices } from '@/data/services';
import { Icon } from '@/components/ui/icon';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeader } from '@/components/ui/layout';

function CampaignBoard() {
  const rows = [
    { name: 'Targeting set A: business channels', status: 'Live', w: '78%' },
    { name: 'Targeting set B: startup topics', status: 'Live', w: '54%' },
    { name: 'Ad variation C', status: 'In review', w: '22%' },
  ];
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur" aria-hidden="true">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold text-white/80">
        <span>Campaign overview</span>
        <span className="rounded-full bg-white/15 px-2 py-0.5">Illustration</span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {rows.map((r) => (
          <li key={r.name} className="rounded-xl bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-[13px] font-semibold text-ink">{r.name}</span>
              <span className={r.status === 'Live' ? 'rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-bold text-success' : 'rounded-full bg-warning-soft px-2 py-0.5 text-[11px] font-bold text-warning'}>{r.status}</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-sky"><div className="h-1.5 rounded-full bg-tg" style={{ width: r.w }} /></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesBento() {
  const [lead, ...rest] = homepageServices;
  return (
    <Section id="services" tone="white" className="pt-24 sm:pt-28">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          kicker="Advertising services"
          title="Everything you need to advertise on Telegram"
          description="Take one service or hand us the whole campaign. Every engagement starts with a free consultation, so you know the plan and the cost before anything goes live."
          action={<ButtonLink href="/services" variant="secondary">All services<ArrowRight className="h-4 w-4" aria-hidden="true" /></ButtonLink>}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Lead service */}
          <article className="relative grid gap-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E8FD6] to-brand p-7 text-white sm:p-10 md:col-span-2 lg:col-span-3 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[36px] border-white/10" aria-hidden="true" />
            <div className="relative flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand"><Icon name={lead.icon} className="h-7 w-7" /></span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">Most requested</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-[28px] font-bold leading-tight text-white sm:text-[36px]">{lead.title}</h3>
                <p className="max-w-[38em] text-[17px] text-white/90">{lead.description}</p>
              </div>
              <ul className="grid gap-x-6 gap-y-2.5 text-[15px] sm:grid-cols-2">
                {lead.deliverables.map((d) => (
                  <li key={d} className="flex gap-2.5"><Check className="mt-1 h-4 w-4 flex-none" strokeWidth={3} aria-hidden="true" />{d}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/contact?service=telegram-ads-management" variant="white">{lead.cta}</ButtonLink>
                <ButtonLink href={`/services/${lead.slug}`} variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Learn more</ButtonLink>
              </div>
            </div>
            <div className="relative"><CampaignBoard /></div>
          </article>

          {rest.map((s) => (
            <article key={s.slug} className="group relative flex flex-col gap-4 rounded-3xl border border-line bg-white p-7 transition-shadow hover:shadow-[var(--shadow-card)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-tg-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="text-[22px] font-bold leading-snug">{s.title}</h3>
              <p className="text-[15px] text-muted">{s.short}</p>
              <ul className="flex flex-col gap-1.5 text-sm text-ink-2">
                {s.deliverables.slice(0, 3).map((d) => (
                  <li key={d} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 flex-none text-tg" strokeWidth={3} aria-hidden="true" />{d}</li>
                ))}
              </ul>
              <Link href={`/services/${s.slug}`} className="mt-auto flex items-center gap-1.5 pt-2 text-[15px] font-semibold text-brand after:absolute after:inset-0 after:rounded-3xl">
                Explore service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
