import type { Metadata } from 'next';
import { BadgeCheck, ChartColumn, Sparkles } from 'lucide-react';
import { Logo } from '@/components/site/logo';
import { PhoneMockup } from '@/components/illustrations/phone';

export const metadata: Metadata = { robots: { index: false } };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_1fr]">
      <main id="main" className="flex flex-col px-5 py-8 sm:px-10">
        <Logo />
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-12">{children}</div>
        <p className="text-center text-sm text-muted">© {new Date().getFullYear()} TG Copilot</p>
      </main>
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-sky to-tg-soft lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-10 lg:p-12">
        <div className="aurora pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="-right-24 -top-24 h-[420px] w-[420px] bg-tg/40" />
          <span className="-left-20 bottom-0 h-[380px] w-[380px] bg-violet/30" />
          <span className="left-1/3 top-1/2 h-[260px] w-[260px] bg-cyan/30" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
        <PhoneMockup variant="sponsored" className="relative scale-90" />
        <ul className="relative grid max-w-md gap-3">
          {[
            { i: Sparkles, t: 'Write ads with the AI Ad Engine' },
            { i: BadgeCheck, t: 'Book verified Telegram channels' },
            { i: ChartColumn, t: 'Track every campaign in one place' },
          ].map((x) => (
            <li key={x.t} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3.5 font-medium text-ink-2 backdrop-blur"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white"><x.i className="h-[18px] w-[18px]" aria-hidden="true" /></span>{x.t}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
