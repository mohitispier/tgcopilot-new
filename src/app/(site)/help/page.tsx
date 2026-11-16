import type { Metadata } from 'next';
import { Mail, Send } from 'lucide-react';
import { HelpSearch, type HelpGroup } from '@/components/tools/help-search';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { generalFaqs } from '@/data/faqs';
import { site, telegramUrl } from '@/data/site';

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Answers about TG Copilot services, the channel marketplace, payments, refunds and listing your Telegram channel.',
  alternates: { canonical: '/help' },
};

const groups: HelpGroup[] = [
  { id: 'getting-started', title: 'Getting started', items: generalFaqs.slice(0, 4) },
  {
    id: 'marketplace', title: 'Marketplace & bookings', items: [
      { q: 'How do I book a channel?', a: 'Open a channel in the marketplace, choose the ad format and date, add your creative and send the request. The owner confirms, you pay, and you receive proof after publication.' },
      { q: 'What if the post is not published?', a: 'If a confirmed post is not published, the booking is cancelled and you receive a full refund.' },
      { q: 'Are the channel metrics real?', a: 'Every metric shows its source and date. Owner-reported numbers are labelled until we verify them.' },
    ],
  },
  {
    id: 'channel-owners', title: 'For channel owners', items: [
      { q: 'How do I list my channel?', a: 'Create a channel owner account, add your channel, prove ownership with a short verification step and set your prices. Our team reviews each listing before it goes live.' },
      { q: 'How does ownership verification work?', a: 'You add a one-time code to your channel description, or add our bot as an administrator. Once confirmed, the code can be removed.' },
      { q: 'When do I get paid?', a: 'Earnings are released after the post is published and the booking is completed. Payouts follow the schedule shown in your dashboard.' },
      { q: 'Can I refuse an ad?', a: 'Yes. You approve every booking and every creative before it is published.' },
    ],
  },
  {
    id: 'billing', title: 'Billing & refunds', items: [
      { q: 'Which payment methods are accepted?', a: '[CONFIRM] Cards, UPI, bank transfer and USDT. Available methods are shown at checkout.' },
      { q: 'How do refunds work?', a: 'See our refund policy for details. In short, unspent budget and unpublished bookings are refunded.' },
      { q: 'Do I get an invoice?', a: 'Yes. Every payment has an invoice you can download from your account.' },
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Resources', href: '/resources' }, { label: 'Help center', href: '/help' }]} kicker="Help center" title="How can we help?" description="Search answers about our services, the marketplace, billing and listing your channel." />
      <Section tone="white">
        <Container className="flex flex-col gap-16">
          <HelpSearch groups={groups} />
          <div className="grid items-center gap-6 rounded-3xl border border-line bg-mist p-8 sm:p-10 lg:grid-cols-[1.4fr_auto]">
            <div>
              <h2 className="text-[26px] font-bold">Still need help?</h2>
              <p className="mt-1 text-muted">Our support team replies {site.responseTime}.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${site.supportEmail}`} variant="secondary"><Mail className="h-4 w-4" aria-hidden="true" />Email support</ButtonLink>
              <ButtonLink href={telegramUrl}><Send className="h-4 w-4" aria-hidden="true" />Message on Telegram</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
