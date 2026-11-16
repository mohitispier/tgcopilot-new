import { cn } from '@/lib/utils';

export function BrowserFrame({ url, className, children }: { url: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-float)]', className)} aria-hidden="true">
      <div className="flex h-10 items-center gap-1.5 border-b border-line bg-mist px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f2b8b5]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f5d9a8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#b9e3c8]" />
        <span className="ml-3 flex h-6 flex-1 items-center rounded-md border border-line bg-white px-3 text-[11px] text-muted">{url}</span>
      </div>
      {children}
    </div>
  );
}
