'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const variants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  left: { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } },
};

/** Scroll-reveal wrapper. Content is always rendered (SEO); reduced-motion users see it immediately. */
export function Reveal({
  children, className, delay = 0, variant = 'up', as = 'div',
}: { children: React.ReactNode; className?: string; delay?: number; variant?: keyof typeof variants; as?: 'div' | 'li' | 'section' }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (reduce) return <Comp className={className}>{children}</Comp>;
  return (
    <Comp
      className={className}
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay }}
    >
      {children}
    </Comp>
  );
}

/** Adds the `in-view` class once the element scrolls into view, to start CSS-driven illustration animations. */
export function InView({ children, className, as: As = 'div' }: { children: React.ReactNode; className?: string; as?: 'div' | 'section' | 'article' }) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: '0px 0px -60px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <As ref={ref as never} className={cn(className, seen && 'in-view')}>{children}</As>;
}
