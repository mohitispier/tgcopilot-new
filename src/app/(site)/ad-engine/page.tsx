import type { Metadata } from 'next';
import { Gauge, Languages, Layers, ShieldCheck } from 'lucide-react';
import { AdEngineTool } from '@/components/tools/ad-engine-tool';
import { Container, Section, SectionHeader } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { FaqList } from '@/components/site/faq-list';
import { CtaBand } from '@/components/site/cta-band';
import { FeatureGrid, SectionTitle } from '@/components/site/feature-grid';

export const metadata: Metadata = {
  title: 'AI Ad Engine: Telegram Ad Copy Generator',
  description: 'Generate Telegram sponsored messages and channel posts in seconds. Several angles per brief, character limits checked, any tone and language.',
  alternates: { canonical: '/ad-engine' },
};

const features = [
  { icon: Layers, title: 'Several angles at once', text: 'Benefit, urgency, social proof and more, so you can test what works.' },
  { icon: Gauge, title: 'Limits checked', text: 'Sponsored messages are kept within Telegram’s 160-character limit.' },
  { icon: Languages, title: 'Any tone and language', text: 'Write for your audience in English, Hindi, Russian, Arabic and more.' },
  { icon: ShieldCheck, title: 'Policy-aware', text: 'Drafts avoid the phrasing that commonly gets ads rejected.' },
];

const faqs = [
  { q: 'How much does the Ad Engine cost?', a: 'Free accounts get 20 generations a month. After that it is $0.50 per ad, and it is included without per-ad fees in Marketplace Pro.' },
  { q: 'Can I edit the generated ads?', a: 'Yes. Every variation can be edited, copied and saved to your account to reuse in campaigns.' },
  { q: 'Will my ads pass Telegram moderation?', a: 'Drafts follow common policy guidelines, but Telegram makes the final decision. Our team can review ads before you submit them.' },
];

export default function AdEnginePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'AI Ad Engine', href: '/ad-engine' }]}
        kicker="AI Ad Engine"
        title="Generate Telegram ads in seconds"
        description="Describe your product and audience. Get ready-to-test sponsored messages and channel posts in several angles."
      />
      <Section tone="white" className="pt-12 sm:pt-16">
        <Container><AdEngineTool /></Container>
      </Section>
      <section className="bg-gradient-to-b from-mist to-white py-24 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionTitle align="center" kicker="Why use it" title="Built for Telegram’s" highlight="ad formats" />
          <FeatureGrid items={features} cols={4} />
        </Container>
      </section>
      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <SectionHeader kicker="FAQ" title="About the Ad Engine" />
          <FaqList items={faqs} />
        </Container>
      </Section>
      <CtaBand title="Want an expert to write your ads?" text="Our copywriters write and test Telegram ads for you as part of every managed campaign." primary={{ label: 'Ask about copywriting', href: '/services/ad-creation-copywriting' }} secondary={{ label: 'Create a free account', href: '/register' }} />
    </>
  );
}
