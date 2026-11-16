import Link from 'next/link';
import { Mail, MapPin, Send } from 'lucide-react';
import { footerNav, legalNav } from '@/data/navigation';
import { site, telegramUrl } from '@/data/site';
import { Container } from '@/components/ui/layout';
import { Logo } from './logo';
import { NewsletterForm } from './newsletter-form';

const socials = [
  { label: 'Telegram', href: site.social.telegram, short: 'TG' },
  { label: 'LinkedIn', href: site.social.linkedin, short: 'in' },
  { label: 'YouTube', href: site.social.youtube, short: 'YT' },
  { label: 'X', href: site.social.x, short: 'X' },
].filter((s) => s.href);

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-mist">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tg to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgb(110_86_247/0.12),transparent_65%)]" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr]">
          <div className="flex max-w-sm flex-col gap-6">
            <Logo />
            <p className="text-[15px] text-muted">TG Copilot is a Telegram advertising agency. We plan, create and manage Telegram Ads campaigns and channel promotions for businesses worldwide.</p>
            <ul className="flex flex-col gap-2.5 text-[15px]">
              <li><a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-ink-2 hover:text-brand"><Mail className="h-4 w-4 text-brand" aria-hidden="true" />{site.email}</a></li>
              <li><a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-ink-2 hover:text-brand"><Send className="h-4 w-4 text-brand" aria-hidden="true" />@{site.telegram}</a></li>
              <li className="flex items-center gap-2.5 text-ink-2"><MapPin className="h-4 w-4 text-brand" aria-hidden="true" />{site.location}</li>
            </ul>
            {socials.length > 0 && (
              <ul className="flex gap-2" aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-sm font-bold text-ink-2 transition-colors hover:border-brand hover:bg-brand hover:text-white">
                      {s.label === 'Telegram' ? <Send className="h-4 w-4" aria-hidden="true" /> : s.short}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
                <p className="text-sm font-bold text-ink">{col.title}</p>
                {col.links.map((l) => (
                  <Link key={l.href + l.label} href={l.href} className="text-[15px] text-muted transition-colors hover:text-brand">{l.label}</Link>
                ))}
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid items-center gap-6 rounded-3xl border border-line bg-white p-6 sm:p-7 lg:grid-cols-[1fr_minmax(0,420px)]">
          <div>
            <p className="font-display text-lg font-bold text-ink">Telegram advertising tips, once a month</p>
            <p className="text-[15px] text-muted">Guides, policy updates and what worked in our latest campaigns.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} TG Copilot. An independent agency, not affiliated with Telegram FZ-LLC.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-brand">{l.label}</Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
