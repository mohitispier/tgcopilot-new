import Link from 'next/link';
import { AppIcon } from './app-icon';
import { cn } from '@/lib/utils';

export function PageTitle({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.02em]">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-[15px] text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, icon, hint }: { label: string; icon: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-tg-soft text-brand"><AppIcon name={icon} className="h-[18px] w-[18px]" /></span>
      </div>
      <p className="font-display text-3xl font-bold text-ink">—</p>
      <p className="text-xs text-muted">{hint ?? 'No data yet'}</p>
    </div>
  );
}

export function Panel({ title, action, children, className }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-2xl border border-line bg-white', className)}>
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 className="text-base font-bold">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function EmptyState({ icon, title, text, cta }: { icon: string; title: string; text: string; cta?: { label: string; href: string } }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line-2 bg-mist px-6 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm"><AppIcon name={icon} className="h-6 w-6" /></span>
      <p className="font-display text-lg font-bold text-ink">{title}</p>
      <p className="max-w-sm text-[15px] text-muted">{text}</p>
      {cta && <Link href={cta.href} className="mt-1 inline-flex h-10 items-center rounded-xl bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-600">{cta.label}</Link>}
    </div>
  );
}

export function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-56 flex-col justify-end gap-3 rounded-xl bg-mist p-4" role="img" aria-label={`${label}: no data yet`}>
      <div className="flex flex-1 items-end gap-2">
        {[30, 45, 38, 55, 48, 62, 58, 70, 66, 74, 69, 80].map((h, i) => <span key={i} className="flex-1 rounded-t bg-sky-2" style={{ height: `${h}%` }} />)}
      </div>
      <p className="text-center text-sm text-muted">{label} appears here once campaigns are running</p>
    </div>
  );
}
