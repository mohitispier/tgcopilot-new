import { BadgeCheck, Check, Megaphone, Search, Send, TrendingUp, X } from 'lucide-react';

/** Small animated illustration for each service card. Animations start when an ancestor gets `.in-view`. */
export function ServiceArt({ slug }: { slug: string }) {
  switch (slug) {
    case 'channel-promotion':
      return (
        <div className="relative h-full" aria-hidden="true">
          <div className="slide-stagger absolute inset-x-5 top-5 flex flex-col gap-2">
            {[
              { n: 'Market Brief', c: '#1673C4', w: '78%' },
              { n: 'Startup Desk', c: '#19B98D', w: '64%' },
              { n: 'AI Tools Daily', c: '#6E56F7', w: '72%' },
            ].map((x) => (
              <div key={x.n} className="flex items-center gap-2.5 rounded-xl bg-white/90 p-2 shadow-sm">
                <span className="h-6 w-6 flex-none rounded-full" style={{ background: x.c }} />
                <span className="flex-1"><span className="block h-1.5 rounded-full bg-[#d6e2ee]" style={{ width: x.w }} /><span className="mt-1 block h-1.5 w-1/2 rounded-full bg-[#e6eef6]" /></span>
                <span className="rounded-full bg-success-soft px-1.5 py-0.5 text-[9px] font-bold text-success">Posted</span>
              </div>
            ))}
          </div>
          <span className="absolute -right-2 -top-2 flex h-11 w-11 rotate-12 items-center justify-center rounded-2xl bg-white text-brand shadow-md"><Megaphone className="h-5 w-5" /></span>
        </div>
      );
    case 'targeted-audience-reach':
      return (
        <div className="relative flex h-full items-center justify-center" aria-hidden="true">
          {[150, 110, 70].map((s) => <span key={s} className="absolute rounded-full border border-brand/20" style={{ width: s, height: s }} />)}
          <span className="sweep absolute h-[150px] w-[150px] rounded-full bg-[conic-gradient(from_0deg,rgb(42_171_238/0.35),transparent_25%)]" />
          <span className="relative h-4 w-4 rounded-full bg-brand ring-4 ring-white" />
          {[
            { x: -48, y: -30, c: '#6E56F7' }, { x: 40, y: -42, c: '#19B98D' }, { x: 52, y: 26, c: '#2AABEE' }, { x: -30, y: 44, c: '#F59E0B' }, { x: -64, y: 8, c: '#94A3B8' }, { x: 70, y: -4, c: '#94A3B8' },
          ].map((d, i) => (
            <span key={i} className="absolute flex h-6 w-6 items-center justify-center" style={{ transform: `translate(${d.x}px, ${d.y}px)` }}>
              {d.c !== '#94A3B8' && <span className="ping-soft absolute inset-0 rounded-full" style={{ background: d.c, opacity: 0.25, animationDelay: `${i * 0.4}s` }} />}
              <span className="relative h-3.5 w-3.5 rounded-full ring-2 ring-white" style={{ background: d.c }} />
            </span>
          ))}
        </div>
      );
    case 'ad-creation-copywriting':
      return (
        <div className="relative h-full p-5" aria-hidden="true">
          <div className="rounded-xl bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between text-[10px]">
              <span className="rounded-full bg-tg-soft px-2 py-0.5 font-bold text-brand">Variation A</span>
              <span className="font-semibold text-muted">96/160</span>
            </div>
            <p className="mt-2 flex items-center text-[12px] font-medium text-ink">
              <span className="type-line" style={{ ['--w' as string]: '100%' }}>Launch your store this weekend.</span><span className="caret ml-0.5 h-3.5 w-0.5 bg-brand" />
            </p>
            <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-[#e6eef6]" />
          </div>
          <div className="mt-2 flex gap-1.5">
            {['Benefit', 'Urgency', 'Question'].map((t) => <span key={t} className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-ink-2 shadow-sm">{t}</span>)}
          </div>
        </div>
      );
    case 'channel-research':
      return (
        <div className="relative h-full p-5" aria-hidden="true">
          <div className="slide-stagger flex flex-col gap-1.5">
            {[{ ok: true, w: '70%' }, { ok: false, w: '58%' }, { ok: true, w: '64%' }].map((r, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-white/90 px-2.5 py-2 shadow-sm">
                <span className="h-5 w-5 rounded-full bg-[#cfe3f3]" />
                <span className="h-1.5 flex-1 rounded-full bg-[#d6e2ee]" style={{ maxWidth: r.w }} />
                <span className={r.ok ? 'ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-success-soft text-success' : 'ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-50 text-red-500'}>
                  {r.ok ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" strokeWidth={3} />}
                </span>
              </div>
            ))}
          </div>
          <span className="float-med absolute bottom-3 right-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-brand/90 text-white shadow-lg"><Search className="h-6 w-6" /></span>
        </div>
      );
    case 'bulk-ad-posting':
      return (
        <div className="relative h-full" aria-hidden="true">
          <svg viewBox="0 0 280 150" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
            {[[50, 30], [50, 75], [50, 120], [230, 30], [230, 75], [230, 120]].map(([x, y], i) => (
              <path key={i} className="draw-path" style={{ ['--len' as string]: 200, animationDelay: `${i * 0.12}s` } as React.CSSProperties} d={`M140 75 Q ${(140 + x) / 2} ${y < 75 ? y - 10 : y > 75 ? y + 10 : y} ${x} ${y}`} fill="none" stroke="#2AABEE" strokeWidth="1.5" strokeDasharray="4 4" />
            ))}
          </svg>
          {[[50, 30, '#1673C4'], [50, 75, '#19B98D'], [50, 120, '#6E56F7'], [230, 30, '#F59E0B'], [230, 75, '#0E7490'], [230, 120, '#BE185D']].map(([x, y, c], i) => (
            <span key={i} className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full ring-[3px] ring-white" style={{ left: `${(Number(x) / 280) * 100}%`, top: `${(Number(y) / 150) * 100}%`, background: String(c) }} />
          ))}
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-tg to-brand text-white shadow-lg"><Send className="h-5 w-5" /></span>
        </div>
      );
    case 'optimization-reporting':
      return (
        <div className="relative h-full p-5" aria-hidden="true">
          <div className="flex h-full flex-col rounded-xl bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between text-[10px] font-semibold text-muted"><span>Cost per join</span><span className="flex items-center gap-0.5 text-success"><TrendingUp className="h-3 w-3" />Improving</span></div>
            <div className="grow-bars mt-2 flex flex-1 items-end gap-1.5">
              {[38, 46, 42, 58, 54, 70, 66, 84].map((h, i) => <span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-brand to-tg" style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }} />)}
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

/** Larger live-dashboard illustration for the featured Telegram Ads management card. */
export function CampaignDashboardArt() {
  return (
    <div className="relative rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md" aria-hidden="true">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold text-white/85">
        <span className="flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="ping-soft absolute inset-0 rounded-full bg-mint" /><span className="relative h-2 w-2 rounded-full bg-mint" /></span>Campaign overview</span>
        <span className="rounded-full bg-white/15 px-2 py-0.5">Illustration</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[['Impressions', '72%'], ['Clicks', '58%'], ['Joins', '44%']].map(([k, w]) => (
          <div key={k} className="rounded-xl bg-white p-2.5">
            <p className="text-[10px] font-medium text-muted">{k}</p>
            <div className="mt-1.5 h-1.5 rounded-full bg-sky"><div className="h-1.5 rounded-full bg-gradient-to-r from-tg to-violet" style={{ width: w }} /></div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-xl bg-white p-3">
        <svg viewBox="0 0 300 90" className="h-24 w-full">
          <defs><linearGradient id="cd-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6e56f7" stopOpacity="0.25" /><stop offset="1" stopColor="#6e56f7" stopOpacity="0" /></linearGradient></defs>
          {[20, 45, 70].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#e6eef6" />)}
          <path d="M0 80 C 30 72, 50 66, 80 62 S 130 40, 160 44 S 220 20, 250 22 S 290 8, 300 6 L300 90 L0 90Z" fill="url(#cd-area)" />
          <path className="draw-path" style={{ ['--len' as string]: 360 } as React.CSSProperties} d="M0 80 C 30 72, 50 66, 80 62 S 130 40, 160 44 S 220 20, 250 22 S 290 8, 300 6" fill="none" stroke="#6e56f7" strokeWidth="2.5" strokeLinecap="round" />
          <path className="draw-path" style={{ ['--len' as string]: 360, animationDelay: '0.3s' } as React.CSSProperties} d="M0 84 C 40 80, 60 76, 90 74 S 140 62, 170 60 S 230 48, 260 46 S 290 40, 300 38" fill="none" stroke="#2aabee" strokeWidth="2" strokeLinecap="round" strokeDasharray="0" />
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {[{ t: 'Targeting set A', s: 'Live', ok: true }, { t: 'Variation C', s: 'In review', ok: false }].map((r) => (
          <span key={r.t} className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-ink">
            {r.ok ? <BadgeCheck className="h-3.5 w-3.5 text-success" /> : <span className="h-2 w-2 rounded-full bg-warning" />}{r.t}
            <span className={r.ok ? 'text-success' : 'text-warning'}>{r.s}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
