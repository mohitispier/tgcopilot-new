'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { FaqList } from '@/components/site/faq-list';
import { Input } from '@/components/ui/form';

export interface HelpGroup { id: string; title: string; items: { q: string; a: string }[] }

export function HelpSearch({ groups }: { groups: HelpGroup[] }) {
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const filtered = groups
    .map((g) => ({ ...g, items: g.items.filter((i) => !term || `${i.q} ${i.a}`.toLowerCase().includes(term)) }))
    .filter((g) => g.items.length);
  return (
    <div className="flex flex-col gap-10">
      <div className="relative mx-auto w-full max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
        <label htmlFor="help-q" className="sr-only">Search help articles</label>
        <Input id="help-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for answers, e.g. refund, verification, moderation" className="h-14 pl-12 text-[17px]" />
      </div>
      {filtered.length ? filtered.map((g) => (
        <section key={g.id} id={g.id} className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <h2 className="text-2xl font-bold">{g.title}</h2>
          <FaqList items={g.items} idPrefix={g.id} />
        </section>
      )) : <p className="text-center text-muted" role="status">No answers match “{q}”. Try another word or contact support.</p>}
    </div>
  );
}
