'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import { BadgeCheck, FileText, TrendingUp, Users } from 'lucide-react';
import { PhoneMockup } from '@/components/illustrations/phone';

const PlaneScene = dynamic(() => import('@/components/three/plane-scene'), { ssr: false });

/** Layered hero illustration: WebGL plane + orbit behind, a 3D-tilted phone and floating glass cards with pointer parallax. */
export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty('--px', x.toFixed(3));
        el.style.setProperty('--py', y.toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const layer = (depth: number): React.CSSProperties => ({
    transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
    transition: 'transform 0.25s ease-out',
  });

  return (
    <div ref={root} className="relative mx-auto h-[600px] w-full max-w-[600px] sm:h-[680px]" role="img" aria-label="Illustration: a Telegram sponsored message, campaign analytics and audience targeting around a phone">
      {/* soft glow disc */}
      <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(42_171_238/0.28),rgb(110_86_247/0.10)_45%,transparent_70%)]" aria-hidden="true" />

      {/* WebGL: paper plane, orbits, glossy spheres */}
      <PlaneScene className="absolute -left-6 -right-16 -inset-y-4" />

      {/* phone in 3D */}
      <div className="absolute left-[54%] top-2 -translate-x-1/2 [perspective:1400px]" style={layer(-14)}>
        <div className="transition-transform duration-300 ease-out [transform-style:preserve-3d]" style={{ transform: 'rotateY(calc(-14deg + var(--px, 0) * 14deg)) rotateX(calc(6deg - var(--py, 0) * 10deg))' }}>
          <PhoneMockup variant="sponsored" animate className="scale-[0.92] sm:scale-100" />
        </div>
      </div>

      {/* floating glass cards */}
      <div className="absolute -left-4 top-[150px] hidden sm:block" style={layer(28)}>
        <div className="float-slow w-[220px] rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[var(--shadow-float)] backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-muted"><TrendingUp className="h-3.5 w-3.5 text-brand" aria-hidden="true" />Campaign growth</p>
            <span className="rounded-full bg-success-soft px-1.5 py-0.5 text-[10px] font-bold text-success">Live</span>
          </div>
          <svg viewBox="0 0 200 70" className="mt-2 h-16 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="hv-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2aabee" stopOpacity="0.35" /><stop offset="1" stopColor="#2aabee" stopOpacity="0" /></linearGradient>
            </defs>
            <path d="M0 60 C 25 55, 35 48, 55 50 S 90 30, 110 34 S 150 14, 170 16 S 195 6, 200 4 L 200 70 L 0 70 Z" fill="url(#hv-area)" />
            <path className="draw-path draw-now" style={{ ['--len' as string]: 260 }} d="M0 60 C 25 55, 35 48, 55 50 S 90 30, 110 34 S 150 14, 170 16 S 195 6, 200 4" fill="none" stroke="#1673c4" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <p className="text-[11px] text-muted">Clicks and joins, sample view</p>
        </div>
      </div>

      <div className="absolute -right-2 top-[70px]" style={layer(40)}>
        <div className="float-med rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[var(--shadow-float)] backdrop-blur-md" style={{ animationDelay: '0.8s' }}>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted"><Users className="h-3.5 w-3.5 text-violet" aria-hidden="true" />Audience</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {['Business', 'English', 'India', 'UAE'].map((c) => <span key={c} className="rounded-full bg-violet-soft px-2 py-0.5 text-[11px] font-semibold text-violet">{c}</span>)}
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-0 sm:bottom-6 sm:left-0" style={layer(22)}>
        <div className="float-med flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-3 pr-5 shadow-[var(--shadow-float)] backdrop-blur-md" style={{ animationDelay: '1.6s' }}>
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-success-soft text-success">
            <span className="ping-soft absolute inset-0 rounded-xl bg-success/20" aria-hidden="true" />
            <BadgeCheck className="relative h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-ink">Ad approved</span>
            <span className="text-xs text-muted">Telegram Ads moderation</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-16 right-0 sm:bottom-24 sm:-right-4" style={layer(34)}>
        <div className="float-slow flex items-center gap-3 rounded-2xl bg-gradient-to-br from-brand to-violet p-3 pr-5 text-white shadow-[0_24px_50px_-20px_rgb(110_86_247/0.7)]" style={{ animationDelay: '0.4s' }}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20"><FileText className="h-5 w-5" aria-hidden="true" /></span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold">Weekly report sent</span>
            <span className="text-xs text-white/85">Spend next to results</span>
          </span>
        </div>
      </div>
    </div>
  );
}
