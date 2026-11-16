'use client';

import Link from 'next/link';
import { BadgeCheck, Bookmark, BookmarkCheck, Eye, Users } from 'lucide-react';
import { countryNames, engagement, type SampleChannel } from '@/data/channels';
import { formatNumber, formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function ChannelAvatar({ c, size = 48 }: { c: Pick<SampleChannel, 'color' | 'initials'>; size?: number }) {
  return (
    <span className="flex flex-none items-center justify-center rounded-full font-bold text-white" style={{ background: c.color, width: size, height: size, fontSize: size * 0.32 }} aria-hidden="true">
      {c.initials}
    </span>
  );
}

export function ChannelCard({ c, saved, onSave }: { c: SampleChannel; saved?: boolean; onSave?: () => void }) {
  return (
    <article className="group relative flex flex-col gap-4 rounded-3xl border border-line bg-white p-5 transition-shadow hover:shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-3">
        <ChannelAvatar c={c} />
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1.5 text-[17px] font-bold">
            <Link href={`/marketplace/${c.username}`} className="truncate after:absolute after:inset-0 after:rounded-3xl">{c.title}</Link>
            {c.verified && <BadgeCheck className="h-[18px] w-[18px] flex-none text-brand" aria-label="Verified owner" />}
          </h3>
          <p className="truncate text-sm text-muted">@{c.username}</p>
        </div>
        {onSave && (
          <button type="button" onClick={onSave} aria-pressed={saved} aria-label={saved ? `Remove ${c.title} from saved` : `Save ${c.title}`}
            className={cn('relative z-10 flex h-10 w-10 flex-none items-center justify-center rounded-xl border transition-colors', saved ? 'border-brand bg-tg-soft text-brand' : 'border-line text-muted hover:border-brand hover:text-brand')}>
            {saved ? <BookmarkCheck className="h-[18px] w-[18px]" aria-hidden="true" /> : <Bookmark className="h-[18px] w-[18px]" aria-hidden="true" />}
          </button>
        )}
      </div>
      <p className="line-clamp-2 text-[14.5px] text-ink-2">{c.description}</p>
      <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
        <span className="rounded-full bg-mist px-2.5 py-1 text-ink-2">{c.category}</span>
        <span className="rounded-full bg-mist px-2.5 py-1 text-ink-2">{countryNames[c.country] ?? c.country}</span>
        <span className="rounded-full bg-mist px-2.5 py-1 text-ink-2">{c.language}</span>
      </div>
      <dl className="grid grid-cols-3 gap-2 rounded-2xl bg-mist p-3 text-center">
        <div><dt className="flex items-center justify-center gap-1 text-[11px] text-muted"><Users className="h-3 w-3" aria-hidden="true" />Subscribers</dt><dd className="font-bold text-ink">{formatNumber(c.subscribers)}</dd></div>
        <div><dt className="flex items-center justify-center gap-1 text-[11px] text-muted"><Eye className="h-3 w-3" aria-hidden="true" />Avg. views</dt><dd className="font-bold text-ink">{formatNumber(c.avgViews)}</dd></div>
        <div><dt className="text-[11px] text-muted">Engagement</dt><dd className="font-bold text-brand">{engagement(c)}%</dd></div>
      </dl>
      <div className="mt-auto flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-muted">From</p>
          <p className="font-display text-xl font-bold text-ink">{formatPrice(c.priceFromMinor)}<span className="text-sm font-normal text-muted"> / post</span></p>
        </div>
        <p className="text-right text-[11px] leading-tight text-muted">{c.metricsSource}<br />Updated {new Date(c.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
      </div>
    </article>
  );
}
