'use client';

import { useMemo, useState } from 'react';
import { RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, countryNames, sampleChannels, type AdFormat } from '@/data/channels';
import { Input, Label, Select } from '@/components/ui/form';
import { SampleTag } from '@/components/ui/layout';
import { ChannelCard } from './channel-card';
import { cn } from '@/lib/utils';

const formats: AdFormat[] = ['Sponsored post', 'Pinned post', '24h top post', 'Custom package'];
const sizeRanges = [
  { label: 'Any size', min: 0, max: Infinity },
  { label: 'Under 25k', min: 0, max: 25_000 },
  { label: '25k – 100k', min: 25_000, max: 100_000 },
  { label: '100k+', min: 100_000, max: Infinity },
];
const sorts = { relevance: 'Recommended', subscribers: 'Most subscribers', views: 'Most views', engagement: 'Highest engagement', price_asc: 'Price: low to high', price_desc: 'Price: high to low' } as const;

const initial = { q: '', category: '', country: '', language: '', size: 0, maxPrice: '', format: '', verified: false, sort: 'relevance' as keyof typeof sorts };

export function MarketplaceBrowser() {
  const [f, setF] = useState(initial);
  const [saved, setSaved] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const langs = [...new Set(sampleChannels.map((c) => c.language))];
  const countries = [...new Set(sampleChannels.map((c) => c.country))];

  const results = useMemo(() => {
    const range = sizeRanges[f.size];
    const max = f.maxPrice ? Number(f.maxPrice) * 100 : Infinity;
    const q = f.q.trim().toLowerCase();
    const list = sampleChannels.filter((c) =>
      (!q || `${c.title} ${c.username} ${c.description} ${c.category}`.toLowerCase().includes(q)) &&
      (!f.category || c.category === f.category) &&
      (!f.country || c.country === f.country) &&
      (!f.language || c.language === f.language) &&
      c.subscribers >= range.min && c.subscribers < range.max &&
      c.priceFromMinor <= max &&
      (!f.format || c.formats.includes(f.format as AdFormat)) &&
      (!f.verified || c.verified),
    );
    const by: Record<string, (a: typeof list[0], b: typeof list[0]) => number> = {
      relevance: (a, b) => Number(b.verified) - Number(a.verified) || b.avgViews - a.avgViews,
      subscribers: (a, b) => b.subscribers - a.subscribers,
      views: (a, b) => b.avgViews - a.avgViews,
      engagement: (a, b) => b.avgViews / b.subscribers - a.avgViews / a.subscribers,
      price_asc: (a, b) => a.priceFromMinor - b.priceFromMinor,
      price_desc: (a, b) => b.priceFromMinor - a.priceFromMinor,
    };
    return [...list].sort(by[f.sort]);
  }, [f]);

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((x) => ({ ...x, [k]: v }));
  const activeCount = [f.category, f.country, f.language, f.size, f.maxPrice, f.format, f.verified].filter(Boolean).length;

  const filters = (
    <div className="flex flex-col gap-5">
      <div>
        <Label htmlFor="mp-cat">Category</Label>
        <Select id="mp-cat" value={f.category} onChange={(e) => set('category', e.target.value)}>
          <option value="">All categories</option>{categories.map((c) => <option key={c}>{c}</option>)}
        </Select>
      </div>
      <div>
        <Label htmlFor="mp-country">Audience country</Label>
        <Select id="mp-country" value={f.country} onChange={(e) => set('country', e.target.value)}>
          <option value="">Any country</option>{countries.map((c) => <option key={c} value={c}>{countryNames[c] ?? c}</option>)}
        </Select>
      </div>
      <div>
        <Label htmlFor="mp-lang">Language</Label>
        <Select id="mp-lang" value={f.language} onChange={(e) => set('language', e.target.value)}>
          <option value="">Any language</option>{langs.map((c) => <option key={c}>{c}</option>)}
        </Select>
      </div>
      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold text-ink">Subscribers</legend>
        <div className="grid grid-cols-2 gap-2">
          {sizeRanges.map((r, i) => (
            <button key={r.label} type="button" aria-pressed={f.size === i} onClick={() => set('size', i)}
              className={cn('h-10 rounded-xl border text-sm font-medium', f.size === i ? 'border-brand bg-tg-soft text-brand' : 'border-line text-ink-2 hover:border-line-2')}>{r.label}</button>
          ))}
        </div>
      </fieldset>
      <div>
        <Label htmlFor="mp-price">Max price per post (USD)</Label>
        <Input id="mp-price" type="number" inputMode="numeric" min={0} value={f.maxPrice} onChange={(e) => set('maxPrice', e.target.value)} placeholder="Any" />
      </div>
      <div>
        <Label htmlFor="mp-format">Ad format</Label>
        <Select id="mp-format" value={f.format} onChange={(e) => set('format', e.target.value)}>
          <option value="">Any format</option>{formats.map((c) => <option key={c}>{c}</option>)}
        </Select>
      </div>
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-3 text-[15px] font-medium">
        <input type="checkbox" checked={f.verified} onChange={(e) => set('verified', e.target.checked)} className="h-5 w-5 accent-[var(--color-brand)]" />
        Verified owners only
      </label>
      <button type="button" onClick={() => setF({ ...initial, q: f.q })} className="flex items-center justify-center gap-2 text-sm font-semibold text-brand hover:underline">
        <RotateCcw className="h-4 w-4" aria-hidden="true" />Reset filters
      </button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-3xl border border-line bg-white p-6">
          <p className="mb-5 flex items-center gap-2 font-display text-lg font-bold"><SlidersHorizontal className="h-5 w-5 text-brand" aria-hidden="true" />Filters</p>
          {filters}
        </div>
      </aside>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <label htmlFor="mp-q" className="sr-only">Search channels</label>
            <Input id="mp-q" value={f.q} onChange={(e) => set('q', e.target.value)} placeholder="Search channels, topics or @usernames" className="pl-11" />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setShowFilters((s) => !s)} aria-expanded={showFilters} className="flex h-12 items-center gap-2 rounded-xl border border-line-2 px-4 font-semibold lg:hidden">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />Filters{activeCount > 0 && <span className="rounded-full bg-brand px-1.5 text-xs text-white">{activeCount}</span>}
            </button>
            <label htmlFor="mp-sort" className="sr-only">Sort by</label>
            <select id="mp-sort" value={f.sort} onChange={(e) => set('sort', e.target.value as keyof typeof sorts)} className="h-12 rounded-xl border border-line-2 bg-white px-3 font-medium">
              {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="rounded-3xl border border-line bg-white p-5 lg:hidden">
            <div className="mb-4 flex items-center justify-between"><p className="font-bold">Filters</p><button type="button" onClick={() => setShowFilters(false)} aria-label="Close filters"><X className="h-5 w-5" /></button></div>
            {filters}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] text-muted" aria-live="polite"><strong className="text-ink">{results.length}</strong> channels{saved.length > 0 && <>, <strong className="text-ink">{saved.length}</strong> saved</>}</p>
          <SampleTag label="Sample listings for layout preview" />
        </div>

        {results.length ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {results.map((c) => (
              <ChannelCard key={c.username} c={c} saved={saved.includes(c.username)} onSave={() => setSaved((s) => (s.includes(c.username) ? s.filter((x) => x !== c.username) : [...s, c.username]))} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line-2 bg-mist p-12 text-center">
            <p className="font-display text-xl font-bold">No channels match these filters</p>
            <p className="text-muted">Try a wider subscriber range or remove a filter.</p>
            <button type="button" onClick={() => setF(initial)} className="mt-1 font-semibold text-brand hover:underline">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
