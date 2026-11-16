'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, BadgeCheck, Download, GitCompare, Search, X } from 'lucide-react';
import { categories, countryNames, engagement, sampleChannels, type SampleChannel } from '@/data/channels';
import { Input } from '@/components/ui/form';
import { SampleTag } from '@/components/ui/layout';
import { ChannelAvatar } from '@/components/marketplace/channel-card';
import { cn, formatNumber, formatPrice } from '@/lib/utils';

type Col = 'title' | 'subscribers' | 'avgViews' | 'er' | 'priceFromMinor' | 'cpm';
const cpm = (c: SampleChannel) => Math.round((c.priceFromMinor / c.avgViews) * 1000);

export function DiscoveryTable() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [sort, setSort] = useState<{ col: Col; dir: 1 | -1 }>({ col: 'er', dir: -1 });
  const [compare, setCompare] = useState<string[]>([]);

  const rows = useMemo(() => {
    const val = (c: SampleChannel): number | string => ({ title: c.title, subscribers: c.subscribers, avgViews: c.avgViews, er: engagement(c), priceFromMinor: c.priceFromMinor, cpm: cpm(c) })[sort.col];
    return sampleChannels
      .filter((c) => (!cat || c.category === cat) && (!q || `${c.title} ${c.username} ${c.category}`.toLowerCase().includes(q.toLowerCase())))
      .sort((a, b) => (val(a) > val(b) ? 1 : val(a) < val(b) ? -1 : 0) * sort.dir);
  }, [q, cat, sort]);

  const toggleSort = (col: Col) => setSort((s) => (s.col === col ? { col, dir: (s.dir * -1) as 1 | -1 } : { col, dir: -1 }));
  const toggleCompare = (u: string) => setCompare((c) => (c.includes(u) ? c.filter((x) => x !== u) : c.length >= 5 ? c : [...c, u]));
  const compared = sampleChannels.filter((c) => compare.includes(c.username));

  function exportCsv() {
    const header = ['Channel', 'Username', 'Category', 'Country', 'Language', 'Subscribers', 'Avg views', 'Engagement %', 'Price from (USD)', 'Cost per 1k views (USD)', 'Metrics source', 'Updated', 'Note'];
    const lines = rows.map((c) => [c.title, `@${c.username}`, c.category, countryNames[c.country] ?? c.country, c.language, c.subscribers, c.avgViews, engagement(c), c.priceFromMinor / 100, cpm(c) / 100, c.metricsSource, c.updated, 'SAMPLE DATA'].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','));
    const blob = new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'tgcopilot-channels-sample.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const Th = ({ col, children, className }: { col: Col; children: React.ReactNode; className?: string }) => (
    <th scope="col" aria-sort={sort.col === col ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'} className={cn('px-4 py-3 font-semibold', className)}>
      <button type="button" onClick={() => toggleSort(col)} className="inline-flex items-center gap-1 hover:text-brand">
        {children}{sort.col === col && (sort.dir === 1 ? <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" /> : <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />)}
      </button>
    </th>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
          <label htmlFor="dc-q" className="sr-only">Search channels</label>
          <Input id="dc-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, @username or topic" className="pl-11" />
        </div>
        <button type="button" onClick={exportCsv} className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line-2 bg-white px-4 font-semibold hover:border-brand hover:text-brand">
          <Download className="h-4 w-4" aria-hidden="true" />Export CSV
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
        {['', ...categories].map((c) => (
          <button key={c || 'all'} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={cn('h-9 flex-none rounded-full border px-4 text-sm font-medium', cat === c ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-2 hover:border-line-2')}>
            {c || 'All'}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <span>Select up to 5 channels to compare them side by side.</span>
        <SampleTag label="Sample data for layout preview" />
      </div>

      <div className="overflow-x-auto rounded-3xl border border-line bg-white">
        <table className="w-full min-w-[860px] text-left text-[15px]">
          <thead className="border-b border-line bg-mist text-sm text-muted">
            <tr>
              <th scope="col" className="w-12 px-4 py-3"><span className="sr-only">Compare</span></th>
              <Th col="title">Channel</Th>
              <Th col="subscribers">Subscribers</Th>
              <Th col="avgViews">Avg. views</Th>
              <Th col="er">Engagement</Th>
              <Th col="priceFromMinor">Price from</Th>
              <Th col="cpm">Cost / 1k views</Th>
              <th scope="col" className="px-4 py-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((c) => (
              <tr key={c.username} className={cn('transition-colors hover:bg-mist/60', compare.includes(c.username) && 'bg-tg-soft/50')}>
                <td className="px-4 py-3">
                  <input type="checkbox" aria-label={`Compare ${c.title}`} checked={compare.includes(c.username)} disabled={!compare.includes(c.username) && compare.length >= 5} onChange={() => toggleCompare(c.username)} className="h-5 w-5 accent-[var(--color-brand)]" />
                </td>
                <td className="px-4 py-3">
                  <Link href={`/marketplace/${c.username}`} className="flex items-center gap-3">
                    <ChannelAvatar c={c} size={36} />
                    <span className="flex flex-col leading-tight">
                      <span className="flex items-center gap-1 font-semibold text-ink hover:text-brand">{c.title}{c.verified && <BadgeCheck className="h-4 w-4 text-brand" aria-label="Verified" />}</span>
                      <span className="text-[13px] text-muted">{c.category}, {c.language}</span>
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 font-medium">{formatNumber(c.subscribers)}</td>
                <td className="px-4 py-3 font-medium">{formatNumber(c.avgViews)}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-16 rounded-full bg-sky"><span className="block h-1.5 rounded-full bg-tg" style={{ width: `${Math.min(100, engagement(c) * 3)}%` }} /></span>
                    <span className="font-semibold text-brand">{engagement(c)}%</span>
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">{formatPrice(c.priceFromMinor)}</td>
                <td className="px-4 py-3 font-medium">{formatPrice(cpm(c))}</td>
                <td className="px-4 py-3 text-[13px] text-muted">{c.metricsSource}<br />{c.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {compared.length > 0 && (
        <div className="rounded-3xl border-2 border-brand bg-white p-6" aria-live="polite">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold"><GitCompare className="h-5 w-5 text-brand" aria-hidden="true" />Comparing {compared.length} channels</h2>
            <button type="button" onClick={() => setCompare([])} className="flex items-center gap-1 text-sm font-semibold text-brand hover:underline"><X className="h-4 w-4" aria-hidden="true" />Clear</button>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-[15px]">
              <thead><tr><th scope="col" className="pb-3 text-sm font-medium text-muted">Metric</th>{compared.map((c) => <th key={c.username} scope="col" className="pb-3 font-bold">{c.title}</th>)}</tr></thead>
              <tbody className="divide-y divide-line">
                {([
                  ['Subscribers', (c: SampleChannel) => formatNumber(c.subscribers)],
                  ['Avg. views', (c: SampleChannel) => formatNumber(c.avgViews)],
                  ['Engagement', (c: SampleChannel) => `${engagement(c)}%`],
                  ['Price from', (c: SampleChannel) => formatPrice(c.priceFromMinor)],
                  ['Cost / 1k views', (c: SampleChannel) => formatPrice(cpm(c))],
                  ['Country', (c: SampleChannel) => countryNames[c.country] ?? c.country],
                  ['Formats', (c: SampleChannel) => c.formats.join(', ')],
                ] as const).map(([label, fn]) => (
                  <tr key={label}><th scope="row" className="py-2.5 pr-4 text-sm font-medium text-muted">{label}</th>{compared.map((c) => <td key={c.username} className="py-2.5 pr-4 font-medium">{fn(c)}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
