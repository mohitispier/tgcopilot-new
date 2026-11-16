import type { Metadata } from 'next';
import { Bookmark, Calculator, Check, Download, ExternalLink, Eye, GitCompare, Lock, MessageSquareQuote, RefreshCw, ShieldCheck, Minus } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeader } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { BrowserScene } from '@/components/home/extension-section';
import { FaqList } from '@/components/site/faq-list';
import { CtaBand } from '@/components/site/cta-band';
import { FeatureGrid, SectionTitle } from '@/components/site/feature-grid';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Free Chrome Extension for Telegram Channel Research',
  description: 'See subscriber counts and channel details while you browse Telegram channels, save them to shortlists and request ad quotes in one click.',
  alternates: { canonical: '/chrome-extension' },
};

const features = [
  { icon: Eye, title: 'Channel details at a glance', text: 'Subscriber count, category and description for public channels on t.me pages.' },
  { icon: Bookmark, title: 'Save to shortlists', text: 'Add channels to lists that sync with your TG Copilot account.' },
  { icon: ExternalLink, title: 'Open in Telegram', text: 'Jump from the browser to the channel in your Telegram app.' },
  { icon: MessageSquareQuote, title: 'Request a quote', text: 'Ask for an ad price on any channel without leaving the page.' },
  { icon: GitCompare, title: 'Compare channels', text: 'Put saved channels side by side (Pro).' },
  { icon: Calculator, title: 'Ad cost calculator', text: 'Estimate cost per 1,000 views from price and views (Pro).' },
];

const tiers: { feature: string; free: boolean; pro: boolean }[] = [
  { feature: 'Public channel details', free: true, pro: true },
  { feature: 'Open channel in Telegram', free: true, pro: true },
  { feature: 'Save channels (up to 20)', free: true, pro: true },
  { feature: 'Quick marketplace access', free: true, pro: true },
  { feature: 'Unlimited lists, synced to your account', free: false, pro: true },
  { feature: 'Advanced analytics and history', free: false, pro: true },
  { feature: 'Channel comparison', free: false, pro: true },
  { feature: 'Ad cost calculator', free: false, pro: true },
];

const install = [
  { title: 'Open the Chrome Web Store page', text: 'Use the “Add to Chrome” button on this page.' },
  { title: 'Click “Add to Chrome”', text: 'Confirm the permissions. The extension only reads Telegram channel pages.' },
  { title: 'Pin it to your toolbar', text: 'Click the puzzle icon in Chrome and pin TG Copilot.' },
  { title: 'Open any t.me channel', text: 'Click the TG Copilot icon to see the channel’s details.' },
];

const faqs = [
  { q: 'Is the extension free?', a: 'Yes. The core features are free forever. Pro features are included with Marketplace Pro.' },
  { q: 'What data does it access?', a: 'Only the Telegram channel page you are viewing, and only when you open the extension. It does not read your Telegram messages or other websites.' },
  { q: 'Does it work in other browsers?', a: 'It is built for Chrome and works in Chromium browsers such as Edge, Brave and Opera. Other browsers may follow.' },
];

export default function ExtensionPage() {
  const storeUrl = site.chromeStoreUrl;
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Chrome Extension', href: '/chrome-extension' }]}
        kicker="Free Chrome extension"
        title="Telegram channel insights, right in your browser"
        description="Check a channel before you buy an ad on it. See its details, save it to a shortlist and request a quote in one click."
        actions={storeUrl ? (
          <ButtonLink href={storeUrl} size="lg"><Download className="h-5 w-5" aria-hidden="true" />Add to Chrome, it’s free</ButtonLink>
        ) : (
          <>
            <ButtonLink href="#install" size="lg"><Download className="h-5 w-5" aria-hidden="true" />Add to Chrome, it’s free</ButtonLink>
            <ButtonLink href="/contact?topic=extension" variant="secondary" size="lg">Get notified at launch</ButtonLink>
          </>
        )}
        aside={<BrowserScene />}
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-ink-2">
          {[{ i: ShieldCheck, t: 'Minimal permissions' }, { i: Lock, t: 'No access to your messages' }, { i: RefreshCw, t: 'Syncs with your account' }].map((x) => (
            <li key={x.t} className="flex items-center gap-2"><x.i className="h-5 w-5 text-brand" aria-hidden="true" />{x.t}</li>
          ))}
        </ul>
      </PageHero>

      <section className="bg-white py-24 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionTitle align="center" kicker="Features" title="Everything you need to" highlight="vet a channel" />
          <FeatureGrid items={features} />
        </Container>
      </section>

      <Section tone="mist">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div id="install" className="flex flex-col gap-6">
            <SectionHeader title="Install in under a minute" />
            {!storeUrl && <p className="rounded-2xl border border-warning/25 bg-warning-soft p-4 text-sm text-warning">The extension is being prepared for the Chrome Web Store. The install link will appear here as soon as it is published.</p>}
            <ol className="flex flex-col gap-3">
              {install.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-2xl bg-white p-5">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-brand font-display font-bold text-white">{i + 1}</span>
                  <span><span className="block font-bold text-ink">{s.title}</span><span className="text-[15px] text-muted">{s.text}</span></span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-6">
            <SectionHeader title="Free and Pro" />
            <div className="overflow-hidden rounded-3xl border border-line bg-white">
              <table className="w-full text-left text-[15px]">
                <thead className="bg-mist text-sm"><tr><th scope="col" className="px-5 py-3 font-semibold text-muted">Feature</th><th scope="col" className="px-5 py-3 text-center font-bold">Free</th><th scope="col" className="px-5 py-3 text-center font-bold text-brand">Pro</th></tr></thead>
                <tbody className="divide-y divide-line">
                  {tiers.map((t) => (
                    <tr key={t.feature}>
                      <th scope="row" className="px-5 py-3 font-medium text-ink-2">{t.feature}</th>
                      {[t.free, t.pro].map((v, i) => (
                        <td key={i} className="px-5 py-3 text-center">{v ? <Check className="mx-auto h-5 w-5 text-success" aria-label="Included" /> : <Minus className="mx-auto h-5 w-5 text-line-2" aria-label="Not included" />}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ButtonLink href="/pricing" variant="secondary" className="w-fit">Compare plans</ButtonLink>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <SectionHeader kicker="FAQ" title="About the extension" />
          <FaqList items={faqs} />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
