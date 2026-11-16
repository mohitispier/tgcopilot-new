import { ChartColumn, ShieldCheck, Sparkles, Store } from 'lucide-react';
import { Container } from '@/components/ui/layout';

const items = [
  { icon: ShieldCheck, title: 'Official Telegram Ads', text: 'Policy-safe sponsored messages' },
  { icon: Store, title: 'Channel marketplace', text: 'Verified channels, clear prices' },
  { icon: Sparkles, title: 'AI Ad Engine', text: 'Ad variations in seconds' },
  { icon: ChartColumn, title: 'Transparent reporting', text: 'Spend next to results' },
];

export function Capabilities() {
  return (
    <div className="relative z-10 -mt-6 bg-transparent">
      <Container>
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-[var(--shadow-card)] sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: I, title, text }) => (
            <li key={title} className="flex items-center gap-4 bg-white p-5 sm:p-6">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-tg-soft text-brand"><I className="h-5 w-5" aria-hidden="true" /></span>
              <span className="flex flex-col leading-snug">
                <span className="font-bold text-ink">{title}</span>
                <span className="text-sm text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
