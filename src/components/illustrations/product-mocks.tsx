import { BadgeCheck, Bookmark, Sparkles, TrendingUp } from 'lucide-react';
import { engagement, sampleChannels } from '@/data/channels';
import { formatNumber, formatPrice } from '@/lib/utils';
import { SampleTag } from '@/components/ui/layout';

export function AdEngineMock() {
  const variants = [
    { angle: 'Benefit', text: 'Launch your store this weekend. Templates, payments and hosting in one place.' },
    { angle: 'Urgency', text: 'First month free for new stores until Sunday. Set up in under an hour.' },
    { angle: 'Social proof', text: 'Built for small brands: everything you need to sell online, ready today.' },
  ];
  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-[var(--shadow-float)]" aria-hidden="true">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-bold text-ink"><Sparkles className="h-4 w-4 text-brand" />AI Ad Engine</p>
        <SampleTag label="Example output" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-[12px]">
        {[['Product', 'Online store builder'], ['Audience', 'Small business owners'], ['Tone', 'Friendly'], ['Language', 'English']].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-line bg-mist px-3 py-2">
            <p className="text-muted">{k}</p>
            <p className="font-semibold text-ink">{v}</p>
          </div>
        ))}
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {variants.map((v, i) => (
          <li key={i} className="rounded-xl border border-line p-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="rounded-full bg-tg-soft px-2 py-0.5 font-bold text-brand">{v.angle}</span>
              <span className="text-muted">{v.text.length}/160</span>
            </div>
            <p className="mt-1.5 text-[13px] leading-snug text-ink">{v.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MarketplaceMock() {
  const list = sampleChannels.slice(0, 3);
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      <div className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3 shadow-sm">
        <span className="text-sm text-muted">Business, English, 10k+ subscribers</span>
        <SampleTag />
      </div>
      {list.map((c) => (
        <div key={c.username} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-card)]">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: c.color }}>{c.initials}</span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 truncate text-[15px] font-bold text-ink">{c.title}{c.verified && <BadgeCheck className="h-4 w-4 text-brand" />}</p>
            <p className="text-[13px] text-muted">{formatNumber(c.subscribers)} subscribers, {formatNumber(c.avgViews)} avg views</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted">from</p>
            <p className="font-bold text-ink">{formatPrice(c.priceFromMinor)}</p>
          </div>
          <span className="hidden h-9 w-9 items-center justify-center rounded-xl border border-line text-muted sm:flex"><Bookmark className="h-4 w-4" /></span>
        </div>
      ))}
    </div>
  );
}

export function DiscoveryMock() {
  const list = sampleChannels.slice(3, 8);
  const bars = [32, 44, 38, 52, 47, 61, 58, 66, 63, 72, 70, 78];
  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-[var(--shadow-float)]" aria-hidden="true">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-bold text-ink"><TrendingUp className="h-4 w-4 text-brand" />Channel Discovery</p>
        <SampleTag />
      </div>
      <div className="mt-4 flex h-24 items-end gap-1.5 rounded-xl bg-mist p-3">
        {bars.map((h, i) => <span key={i} className="flex-1 rounded-t bg-tg/80" style={{ height: `${h}%` }} />)}
      </div>
      <table className="mt-4 w-full text-left text-[12.5px]">
        <thead className="text-muted">
          <tr><th className="pb-2 font-medium">Channel</th><th className="pb-2 font-medium">Subs</th><th className="pb-2 font-medium">Views</th><th className="pb-2 text-right font-medium">ER</th></tr>
        </thead>
        <tbody className="divide-y divide-line">
          {list.map((c) => (
            <tr key={c.username}>
              <td className="py-2 font-semibold text-ink">{c.title}</td>
              <td className="py-2 text-ink-2">{formatNumber(c.subscribers)}</td>
              <td className="py-2 text-ink-2">{formatNumber(c.avgViews)}</td>
              <td className="py-2 text-right font-semibold text-brand">{engagement(c)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ExtensionPopupMock() {
  const c = sampleChannels[0];
  return (
    <div className="w-[290px] rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-float)]" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-bold text-ink"><span className="h-5 w-5 rounded-md bg-tg" />TG Copilot</span>
        <SampleTag />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: c.color }}>{c.initials}</span>
        <span className="flex flex-col leading-tight">
          <span className="font-bold text-ink">{c.title}</span>
          <span className="text-xs text-muted">@{c.username}</span>
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[['Subscribers', formatNumber(c.subscribers)], ['Avg. views', formatNumber(c.avgViews)], ['Engagement', `${engagement(c)}%`], ['Category', c.category]].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-mist px-3 py-2">
            <p className="text-[11px] text-muted">{k}</p>
            <p className="text-[15px] font-bold text-ink">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-[13px] font-semibold">
        <span className="rounded-xl bg-brand py-2 text-center text-white">Save channel</span>
        <span className="rounded-xl border border-line-2 py-2 text-center text-ink">Get a quote</span>
      </div>
    </div>
  );
}
