import type { LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

const tones = ['from-tg to-brand', 'from-violet to-[#8f7bff]', 'from-cyan to-tg', 'from-mint to-[#0f8a63]', 'from-[#f59e0b] to-[#e07a00]', 'from-brand to-violet'];

export interface Feature { icon: LucideIcon; title: string; text: string }

/** Premium feature grid: gradient icon tiles, hover lift, staggered reveal. */
export function FeatureGrid({ items, cols = 3, className }: { items: Feature[]; cols?: 2 | 3 | 4; className?: string }) {
  const grid = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[cols];
  return (
    <div className={cn('grid gap-5', grid, className)}>
      {items.map((f, i) => (
        <Reveal key={f.title} delay={(i % cols) * 0.07}>
          <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[26px] border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-float)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgb(42_171_238/0.12),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
            <span className={cn('flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3', tones[i % tones.length])}>
              <f.icon className="h-[22px] w-[22px]" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-bold">{f.title}</h3>
            <p className="text-[15px] text-muted">{f.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Section heading used on inner pages, matching the homepage style. */
export function SectionTitle({ kicker, title, highlight, description, align = 'left', action }: { kicker?: string; title: string; highlight?: string; description?: string; align?: 'left' | 'center'; action?: React.ReactNode }) {
  return (
    <Reveal className={cn('flex flex-wrap items-end justify-between gap-x-12 gap-y-6', align === 'center' && 'flex-col items-center text-center')}>
      <div className={cn('flex max-w-[720px] flex-col gap-4', align === 'center' && 'items-center')}>
        {kicker && <p className="text-[15px] font-semibold text-brand">{kicker}</p>}
        <h2 className="text-[32px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[42px] lg:text-[48px]">
          {title}{highlight && <> <span className="text-gradient">{highlight}</span></>}
        </h2>
        {description && <p className="text-lg text-muted">{description}</p>}
      </div>
      {action}
    </Reveal>
  );
}
