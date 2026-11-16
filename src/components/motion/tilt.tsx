'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * 3D tilt + pointer spotlight for cards. Pure CSS transforms driven by pointer position.
 * Disabled for touch and reduced-motion users automatically (no hover / transitions only).
 */
export function Tilt({ children, className, max = 7, as: As = 'div' }: { children: React.ReactNode; className?: string; max?: number; as?: 'div' | 'article' }) {
  const ref = useRef<HTMLElement>(null);
  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-4px)`;
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = '';
  }
  return (
    <As ref={ref as never} onPointerMove={onMove} onPointerLeave={onLeave} className={cn('spotlight transition-transform duration-300 ease-out will-change-transform', className)}>
      {children}
    </As>
  );
}
