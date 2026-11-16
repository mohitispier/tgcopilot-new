import { ArrowRight, Check } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeader } from '@/components/ui/layout';
import { AdEngineMock, DiscoveryMock, MarketplaceMock } from '@/components/illustrations/product-mocks';
import { cn } from '@/lib/utils';

const products = [
  {
    name: 'AI Ad Engine',
    title: 'Write Telegram ads in seconds',
    text: 'Describe your product and audience. The Ad Engine drafts headlines, 160-character sponsored messages and channel posts in several angles, ready to test.',
    points: ['Multiple variations per brief', 'Any language and tone', 'Character limits checked for you'],
    href: '/ad-engine', cta: 'Try the Ad Engine', mock: <AdEngineMock />,
  },
  {
    name: 'Channel Marketplace',
    title: 'Book verified channels without the back-and-forth',
    text: 'Browse channels by niche, country, language, audience size and price. See verified metrics with their source and date, then request or book a slot.',
    points: ['Ownership-verified listings', 'Prices per ad format', 'Bookings with proof of publication'],
    href: '/marketplace', cta: 'Explore the marketplace', mock: <MarketplaceMock />,
  },
  {
    name: 'Channel Discovery',
    title: 'Find the channels worth paying for',
    text: 'Search and compare channels side by side. Views against subscribers, growth over time and audience fit, so you stop paying for inactive followers.',
    points: ['Engagement and growth metrics', 'Compare up to 5 channels', 'Export shortlists'],
    href: '/discovery', cta: 'Open Channel Discovery', mock: <DiscoveryMock />,
  },
];

export function Products() {
  return (
    <Section id="platform" tone="white">
      <Container className="flex flex-col gap-16 lg:gap-24">
        <SectionHeader
          align="center"
          kicker="The platform"
          title="Prefer to do it yourself? Use our tools"
          description="The same tools our team uses every day, available to advertisers and agencies."
        />
        {products.map((p, i) => (
          <div key={p.name} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div className={cn('flex flex-col gap-5', i % 2 === 1 && 'lg:order-2')}>
              <p className="text-[15px] font-semibold text-brand">{p.name}</p>
              <h3 className="text-[30px] font-bold leading-tight sm:text-[38px]">{p.title}</h3>
              <p className="text-lg text-muted">{p.text}</p>
              <ul className="flex flex-col gap-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2.5 text-ink-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tg-soft"><Check className="h-3.5 w-3.5 text-brand" strokeWidth={3} aria-hidden="true" /></span>{pt}
                  </li>
                ))}
              </ul>
              <ButtonLink href={p.href} variant="secondary" className="mt-2 w-fit">{p.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></ButtonLink>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-sky to-tg-soft sm:-inset-8" aria-hidden="true" />
              <div className="relative">{p.mock}</div>
            </div>
          </div>
        ))}
      </Container>
    </Section>
  );
}
