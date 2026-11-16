import { BadgeCheck, ChartColumn, Target } from 'lucide-react';
import { LogoMark } from '@/components/site/logo';

/** Brand orbit illustration: logo at the centre, team and channel bubbles orbiting. */
export function OrbitVisual() {
  const bubbles = [
    { t: 'SM', c: '#1673C4', x: '8%', y: '22%' },
    { t: 'CR', c: '#6E56F7', x: '82%', y: '14%' },
    { t: 'AN', c: '#19B98D', x: '88%', y: '62%' },
    { t: 'CW', c: '#22C3EE', x: '14%', y: '74%' },
    { t: 'OP', c: '#F59E0B', x: '50%', y: '92%' },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" role="img" aria-label="Illustration: TG Copilot at the centre of its team and channel network">
      <div className="absolute inset-[6%] rounded-full border border-brand/15" aria-hidden="true" />
      <div className="sweep absolute inset-[6%] rounded-full bg-[conic-gradient(from_0deg,rgb(42_171_238/0.18),transparent_22%)]" aria-hidden="true" />
      <div className="absolute inset-[20%] rounded-full border border-dashed border-violet/25" aria-hidden="true" />
      <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle,rgb(42_171_238/0.25),transparent_70%)]" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[32px] bg-white shadow-[var(--shadow-float)]">
        <LogoMark className="h-16 w-16" />
      </div>
      {bubbles.map((b, i) => (
        <span key={b.t} className="float-slow absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-display text-sm font-bold text-white shadow-lg ring-4 ring-white" style={{ left: b.x, top: b.y, background: b.c, animationDelay: `${i * 0.6}s` }} aria-hidden="true">{b.t}</span>
      ))}
      <div className="float-med absolute left-[2%] top-[44%] flex items-center gap-2 rounded-2xl border border-white bg-white/90 px-2.5 py-2 text-xs font-semibold sm:px-3.5 sm:py-2.5 sm:text-sm text-ink shadow-[var(--shadow-float)] backdrop-blur" aria-hidden="true">
        <Target className="h-4 w-4 text-violet" />Telegram-only specialists
      </div>
      <div className="float-slow absolute right-[0%] top-[36%] flex items-center gap-2 rounded-2xl border border-white bg-white/90 px-2.5 py-2 text-xs font-semibold sm:px-3.5 sm:py-2.5 sm:text-sm text-ink shadow-[var(--shadow-float)] backdrop-blur" style={{ animationDelay: '1s' }} aria-hidden="true">
        <BadgeCheck className="h-4 w-4 text-success" />Ads + channel posts
      </div>
      <div className="float-med absolute bottom-[10%] right-[12%] flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-violet px-2.5 py-2 text-xs font-semibold sm:px-3.5 sm:py-2.5 sm:text-sm text-white shadow-[var(--shadow-float)]" style={{ animationDelay: '2s' }} aria-hidden="true">
        <ChartColumn className="h-4 w-4" />Weekly reports
      </div>
    </div>
  );
}
