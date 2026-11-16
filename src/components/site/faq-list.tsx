import { Plus } from 'lucide-react';

export function FaqList({ items, idPrefix = 'faq' }: { items: { q: string; a: string }[]; idPrefix?: string }) {
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white">
      {items.map((f, i) => (
        <details key={f.q} className="group px-6 sm:px-8" id={`${idPrefix}-${i}`}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-mist text-brand transition-transform group-open:rotate-45"><Plus className="h-4 w-4" aria-hidden="true" /></span>
          </summary>
          <p className="-mt-2 pb-6 pr-10 text-[15px] text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
