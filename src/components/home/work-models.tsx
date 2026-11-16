import { Check, Headset, MousePointerClick } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeader } from '@/components/ui/layout';

const models = [
  {
    icon: MousePointerClick, name: 'Self-service', title: 'Run campaigns yourself',
    text: 'Use the platform to create ads with AI, pick channels from the marketplace and track every booking in your dashboard.',
    points: ['AI Ad Engine and Channel Discovery', 'Book channels directly', 'Pay per booking or subscribe'],
    cta: { label: 'Create a free account', href: '/register' }, primary: false,
  },
  {
    icon: Headset, name: 'Managed service', title: 'Let our team run everything',
    text: 'Send us your requirements. We prepare a plan and a fixed quote, run the campaign after you approve it and report every week.',
    points: ['Dedicated campaign manager', 'Plan and quote before you pay', 'Weekly reports and optimisation'],
    cta: { label: 'Request a proposal', href: '/contact?type=managed' }, primary: true,
  },
];

export function WorkModels() {
  return (
    <Section tone="mist">
      <Container className="flex flex-col gap-12">
        <SectionHeader align="center" kicker="Two ways to work with us" title="Do it yourself, or have it done for you" description="Start one way and switch any time. Many clients use the tools and bring us in for bigger launches." />
        <div className="grid gap-5 md:grid-cols-2">
          {models.map((m) => (
            <article key={m.name} className={m.primary ? 'flex flex-col gap-5 rounded-3xl border-2 border-brand bg-white p-8 shadow-[var(--shadow-card)]' : 'flex flex-col gap-5 rounded-3xl border border-line bg-white p-8'}>
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-tg-soft text-brand"><m.icon className="h-6 w-6" aria-hidden="true" /></span>
                <span className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-ink-2">{m.name}</span>
              </div>
              <h3 className="text-[26px] font-bold">{m.title}</h3>
              <p className="text-muted">{m.text}</p>
              <ul className="flex flex-col gap-2.5">
                {m.points.map((p) => <li key={p} className="flex gap-2.5 text-ink-2"><Check className="mt-1 h-4 w-4 flex-none text-tg" strokeWidth={3} aria-hidden="true" />{p}</li>)}
              </ul>
              <ButtonLink href={m.cta.href} variant={m.primary ? 'primary' : 'secondary'} className="mt-auto w-fit">{m.cta.label}</ButtonLink>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
