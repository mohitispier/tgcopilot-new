import { Eye, Pin } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PhoneVariant = 'sponsored' | 'post' | 'pinned' | 'bulk';

function SkeletonLines({ widths }: { widths: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {widths.map((w, i) => (
        <span key={i} className="block h-2 rounded-full bg-[#d6e2ee]" style={{ width: w }} />
      ))}
    </div>
  );
}

function Meta({ time = '09:41' }: { time?: string }) {
  return (
    <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#8a98b0]">
      <Eye className="h-3 w-3" aria-hidden="true" /> {time}
    </span>
  );
}

/** Light Telegram-style channel view used across the site. Purely illustrative. */
export function PhoneMockup({ variant = 'sponsored', className, channel = 'Market Brief', animate = false }: { variant?: PhoneVariant; className?: string; channel?: string; animate?: boolean }) {
  return (
    <div className={cn('relative w-[290px] rounded-[44px] bg-white p-3 shadow-[var(--shadow-phone)]', className)} aria-hidden="true">
      <div className="absolute left-1/2 top-3 z-10 h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-white" />
      <div className="overflow-hidden rounded-[34px] border border-[#e3ebf3] bg-[#e9f2f9]">
        {/* channel header */}
        <div className="flex items-center gap-2.5 border-b border-[#dfe8f1] bg-white px-4 pb-3 pt-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[13px] font-bold text-white">{channel.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
          <span className="flex flex-col leading-tight">
            <span className="text-[13px] font-bold text-ink">{channel}</span>
            <span className="text-[11px] text-muted">channel</span>
          </span>
        </div>

        {variant === 'pinned' && (
          <div className="flex items-center gap-2 border-b border-[#dfe8f1] bg-white px-4 py-2">
            <span className="h-7 w-0.5 rounded bg-tg" />
            <span className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold text-brand">Pinned message</span>
              <span className="text-[11px] text-ink-2">Your offer stays on top of the channel…</span>
            </span>
            <Pin className="ml-auto h-3.5 w-3.5 text-muted" />
          </div>
        )}

        <div className="flex min-h-[420px] flex-col gap-2.5 p-3 [background-image:radial-gradient(rgb(22_115_196/0.08)_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white p-3 shadow-sm">
            <SkeletonLines widths={['92%', '80%', '56%']} />
            <Meta time="09:12" />
          </div>

          {variant === 'post' || variant === 'pinned' ? (
            <div className={cn('rounded-2xl rounded-bl-md bg-white shadow-sm', animate && 'anim-bubble')}>
              <div className="flex h-28 items-end rounded-t-2xl bg-gradient-to-br from-[#2AABEE] to-[#1673C4] p-3">
                <span className="rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold text-brand">Your brand</span>
              </div>
              <div className="p-3">
                <p className="text-[12.5px] font-semibold leading-snug text-ink">Launch your online store this weekend</p>
                <p className="mt-1 text-[11.5px] leading-snug text-ink-2">Templates, payments and hosting in one place. First month free for our readers.</p>
                <p className="mt-1.5 text-[11.5px] font-semibold text-brand">yourbrand.com/start</p>
                <Meta time="10:00" />
              </div>
            </div>
          ) : variant === 'bulk' ? (
            <div className={cn('flex flex-col gap-2', animate && 'anim-bubble')}>
              {['Market Brief', 'Startup Desk', 'Fintech India'].map((c, i) => (
                <div key={c} className="flex items-center gap-2 rounded-2xl bg-white p-2.5 shadow-sm">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: ['#1673C4', '#0F8A63', '#7A4DD8'][i] }}>{c.split(' ').map((w) => w[0]).join('')}</span>
                  <span className="flex flex-1 flex-col">
                    <span className="text-[11px] font-bold text-ink">{c}</span>
                    <span className="text-[10.5px] text-ink-2">Ad variation {String.fromCharCode(65 + i)} posted</span>
                  </span>
                  <span className="rounded-full bg-success-soft px-2 py-0.5 text-[9.5px] font-bold text-success">Live</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-white p-3 shadow-sm">
              <SkeletonLines widths={['86%', '64%']} />
              <Meta time="09:30" />
            </div>
          )}

          {variant === 'sponsored' && (
            <div className={cn('mt-auto rounded-2xl bg-white p-3 shadow-[0_0_0_2px_#fff,0_0_0_4px_rgb(42_171_238/0.45)]', animate && 'anim-bubble')}>
              <p className="text-[11px] font-bold text-brand">Sponsored</p>
              <p className="mt-1 text-[12.5px] leading-snug text-ink">Launch your online store this weekend. Templates, payments and hosting in one place.</p>
              <p className="mt-2.5 border-t border-[#e6eef6] pt-2 text-center text-[12px] font-bold text-brand">Learn more</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
