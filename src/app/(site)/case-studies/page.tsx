import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container, SampleTag, Section } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'How Telegram advertising campaigns run by TG Copilot performed: goals, channels, creatives and results.',
  alternates: { canonical: '/case-studies' },
};

// Replace these placeholders with real, client-approved case studies.
const slots = [
  { industry: '[Industry]', title: '[Client name]: [result headline]', goal: '[Goal, e.g. grow a Telegram channel]', formats: '[Formats used]' },
  { industry: '[Industry]', title: '[Client name]: [result headline]', goal: '[Goal, e.g. bot sign-ups]', formats: '[Formats used]' },
  { industry: '[Industry]', title: '[Client name]: [result headline]', goal: '[Goal, e.g. app installs]', formats: '[Formats used]' },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Resources', href: '/resources' }, { label: 'Case studies', href: '/case-studies' }]} kicker="Case studies" title="Real campaigns, real numbers" description="Each case study shows the goal, the channels and formats we used, what we changed along the way and the results, with the client’s permission." />
      <Section tone="white">
        <Container className="flex flex-col gap-8">
          <SampleTag label="Placeholders: add client-approved case studies before launch" className="w-fit" />
          <div className="grid gap-5 md:grid-cols-3">
            {slots.map((s, i) => (
              <article key={i} className="flex flex-col gap-4 rounded-3xl border border-dashed border-line-2 bg-mist p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-muted"><FileText className="h-5 w-5" aria-hidden="true" /></span>
                <p className="text-sm font-semibold text-muted">{s.industry}</p>
                <h2 className="text-xl font-bold text-ink-2">{s.title}</h2>
                <dl className="grid gap-2 text-[15px]">
                  <div><dt className="text-sm text-muted">Goal</dt><dd className="text-ink-2">{s.goal}</dd></div>
                  <div><dt className="text-sm text-muted">Formats</dt><dd className="text-ink-2">{s.formats}</dd></div>
                </dl>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  {['[Metric]', '[Metric]', '[Metric]'].map((m, j) => <div key={j} className="rounded-xl bg-white p-3"><p className="font-display font-bold text-muted">{m}</p></div>)}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand title="Want results like these?" />
    </>
  );
}
