import { Check } from 'lucide-react';
import { plans } from '@/data/pricing';
import { ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PricingCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {plans.map((p) => (
        <article key={p.key} className={cn('relative flex flex-col gap-6 rounded-3xl border bg-white p-8', p.highlighted ? 'border-2 border-brand bg-[linear-gradient(180deg,#eef7fd_0%,#ffffff_45%)] shadow-[0_40px_80px_-40px_rgb(22_115_196/0.6)] lg:-translate-y-3' : 'border-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]')}>
          {p.highlighted && <span className="absolute -top-3.5 left-8 rounded-full bg-gradient-to-r from-brand to-violet px-3 py-1 text-xs font-bold text-white shadow-md">Most popular</span>}
          <div>
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="mt-1 text-[15px] text-muted">{p.description}</p>
          </div>
          <p className="flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold tracking-tight text-ink">{p.price}</span>
            {p.period && <span className="text-muted">{p.period}</span>}
          </p>
          <ButtonLink href={p.cta.href} variant={p.highlighted ? 'primary' : 'secondary'}>{p.cta.label}</ButtonLink>
          <ul className="flex flex-col gap-3 border-t border-line pt-6 text-[15px] text-ink-2">
            {p.features.map((f) => <li key={f} className="flex gap-2.5"><Check className="mt-1 h-4 w-4 flex-none text-tg" strokeWidth={3} aria-hidden="true" />{f}</li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}
