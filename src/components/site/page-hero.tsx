import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Container, HeaderSpacer } from '@/components/ui/layout';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

export interface Crumb { label: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: 'Home', href: '/' }, ...items];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: `${site.url}${c.href}` })),
  };
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {all.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {i === all.length - 1 ? <span aria-current="page" className="font-medium text-ink-2">{c.label}</span> : <Link href={c.href} className="hover:text-brand">{c.label}</Link>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </nav>
  );
}

export function PageHero({
  crumbs, kicker, title, description, actions, aside, className, children,
}: {
  crumbs: Crumb[]; kicker?: React.ReactNode; title: React.ReactNode; description?: React.ReactNode;
  actions?: React.ReactNode; aside?: React.ReactNode; className?: string; children?: React.ReactNode;
}) {
  return (
    <section className={cn('relative overflow-hidden border-b border-line bg-mist', className)}>
        <HeaderSpacer />
      <div className="aurora pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="-right-32 -top-40 h-[520px] w-[520px] bg-tg/30" />
        <span className="right-1/4 top-1/3 h-[320px] w-[320px] bg-violet/15" />
        <span className="-left-32 bottom-0 h-[340px] w-[340px] bg-cyan/20" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b" aria-hidden="true" />
      <Container className={cn('relative grid gap-12 py-14 sm:py-20', aside && 'lg:grid-cols-[1.1fr_1fr] lg:items-center')}>
        <div className="flex flex-col gap-6">
          <Breadcrumbs items={crumbs} />
          {kicker && <p className="text-[15px] font-semibold text-brand">{kicker}</p>}
          <h1 className="text-[38px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[52px] lg:text-[62px]">{title}</h1>
          {description && <p className="max-w-[40em] text-lg text-muted sm:text-xl">{description}</p>}
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          {children}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </Container>
    </section>
  );
}
