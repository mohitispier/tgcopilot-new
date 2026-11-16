import Link from 'next/link';
import { cn } from '@/lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('h-9 w-9', className)} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#2AABEE" />
      <path d="M29.5 11.2 9.8 19c-1.1.45-1.1 1.6 0 1.98l4.9 1.6 1.9 5.9c.25.75 1.15.95 1.7.4l2.75-2.6 5.2 3.85c.75.55 1.8.15 2-.75l3.3-15.4c.25-1.15-.85-2.05-2.05-1.58Z" fill="#fff" />
      <path d="m14.7 22.6 11.4-7.4-8.8 8.6-.5 4.5" fill="none" stroke="#2AABEE" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2.5 rounded-lg', className)} aria-label="TG Copilot home">
      <LogoMark />
      <span className="font-display text-[21px] font-bold tracking-[-0.03em] text-ink">TG Copilot</span>
    </Link>
  );
}
