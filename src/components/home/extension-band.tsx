import { Bookmark, Download, ExternalLink, Eye, MessageSquareQuote } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/layout';
import { BrowserFrame } from '@/components/illustrations/browser';
import { ExtensionPopupMock } from '@/components/illustrations/product-mocks';
import { site } from '@/data/site';

const features = [
  { icon: Eye, text: 'Subscriber count and channel details' },
  { icon: Bookmark, text: 'Save channels to your shortlists' },
  { icon: ExternalLink, text: 'Open the channel in Telegram' },
  { icon: MessageSquareQuote, text: 'Request a quote in one click' },
];

export function ExtensionBand() {
  const href = site.chromeStoreUrl || '/chrome-extension#install';
  return (
    <Section id="extension" tone="sky">
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="text-[15px] font-semibold text-brand">Free Chrome extension</p>
          <h2 className="text-[32px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[44px]">Check any Telegram channel before you buy an ad on it</h2>
          <p className="text-lg text-muted">Open a public channel in your browser and see what matters for advertising, without switching tabs.</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f.text} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 text-[15px] font-medium text-ink-2">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-tg-soft text-brand"><f.icon className="h-[18px] w-[18px]" aria-hidden="true" /></span>{f.text}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href={href} size="lg"><Download className="h-5 w-5" aria-hidden="true" />Add to Chrome, it’s free</ButtonLink>
            <ButtonLink href="/chrome-extension" variant="ghost" size="lg">See all features</ButtonLink>
          </div>
        </div>
        <div className="relative pb-10 pr-4 sm:pr-10">
          <BrowserFrame url="t.me/s/marketbrief_sample">
            <div className="flex flex-col gap-3 p-5 [background-image:radial-gradient(rgb(22_115_196/0.07)_1px,transparent_1px)] [background-size:16px_16px]">
              {[85, 70, 78, 62].map((w, i) => <span key={i} className="block h-16 rounded-2xl bg-white shadow-sm" style={{ width: `${w}%` }} />)}
            </div>
          </BrowserFrame>
          <div className="absolute -bottom-2 right-0 sm:right-2"><ExtensionPopupMock /></div>
        </div>
      </Container>
    </Section>
  );
}
