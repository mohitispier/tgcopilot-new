import { cn } from '@/lib/utils';

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1200px] px-5 sm:px-8', className)}>{children}</div>;
}

export function Section({ id, className, children, tone = 'white' }: { id?: string; className?: string; children: React.ReactNode; tone?: 'white' | 'mist' | 'sky' }) {
  const bg = { white: 'bg-white', mist: 'bg-mist', sky: 'bg-sky' }[tone];
  return (
    <section id={id} className={cn(bg, 'py-20 sm:py-24 lg:py-28', className)}>
      {children}
    </section>
  );
}

export function SectionHeader({
  kicker, title, description, align = 'left', className, action, as: As = 'h2',
}: {
  kicker?: React.ReactNode; title: React.ReactNode; description?: React.ReactNode; align?: 'left' | 'center';
  className?: string; action?: React.ReactNode; as?: 'h1' | 'h2';
}) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-x-12 gap-y-5', align === 'center' && 'flex-col items-center text-center', className)}>
      <div className={cn('flex max-w-[680px] flex-col gap-4', align === 'center' && 'items-center')}>
        {kicker && <p className="flex items-center gap-2 text-[15px] font-semibold text-brand">{kicker}</p>}
        <As className={cn('font-bold tracking-[-0.03em]', As === 'h1' ? 'text-[40px] sm:text-[52px] lg:text-[60px]' : 'text-[32px] sm:text-[42px] lg:text-[48px]', 'leading-[1.06]')}>{title}</As>
        {description && <p className="text-lg text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Badge({ children, tone = 'blue', className }: { children: React.ReactNode; tone?: 'blue' | 'green' | 'amber' | 'grey'; className?: string }) {
  const tones = {
    blue: 'bg-tg-soft text-brand',
    green: 'bg-success-soft text-success',
    amber: 'bg-warning-soft text-warning',
    grey: 'bg-mist text-ink-2 border border-line',
  }[tone];
  return <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-semibold leading-none', tones, className)}>{children}</span>;
}

export function SampleTag({ className, label = 'Sample data' }: { className?: string; label?: string }) {
  return (
    <span title="Illustrative data for layout preview — not real figures" className={cn('inline-flex items-center gap-1 rounded-md border border-dashed border-warning/40 bg-warning-soft px-2 py-0.5 text-xs font-semibold text-warning', className)}>
      {label}
    </span>
  );
}

/** The floating header overlays the first section; this keeps that section's content clear of it. */
export function HeaderSpacer() {
  return <div className="h-[76px]" aria-hidden="true" />;
}
