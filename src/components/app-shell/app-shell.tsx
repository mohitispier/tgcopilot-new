'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Bell, ChevronsUpDown, Eye, Menu, Search, X } from 'lucide-react';
import { areas, type AppArea } from '@/data/app-nav';
import { Logo } from '@/components/site/logo';
import { AppIcon } from './app-icon';
import { cn } from '@/lib/utils';

function SideNav({ area, onNavigate }: { area: AppArea; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label={`${area.title} navigation`} className="flex flex-col gap-0.5">
      {area.nav.map((item) => {
        const href = item.slug ? `${area.base}/${item.slug}` : area.base;
        const active = pathname === href;
        return (
          <Link key={href} href={href} onClick={onNavigate} aria-current={active ? 'page' : undefined}
            className={cn('flex h-10 items-center gap-3 rounded-xl px-3 text-[14.5px] font-medium transition-colors', active ? 'bg-tg-soft text-brand' : 'text-ink-2 hover:bg-mist hover:text-ink')}>
            <AppIcon name={item.icon} className="h-[18px] w-[18px] flex-none" />{item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function AreaSwitcher({ current }: { current: AppArea['key'] }) {
  return (
    <div className="rounded-2xl border border-line bg-mist p-1" role="group" aria-label="Switch dashboard (preview)">
      <div className="grid grid-cols-3 gap-1 text-xs font-semibold">
        {(Object.values(areas)).map((a) => (
          <Link key={a.key} href={a.base} aria-current={a.key === current ? 'page' : undefined}
            className={cn('rounded-xl px-2 py-2 text-center', a.key === current ? 'bg-white text-brand shadow-sm' : 'text-muted hover:text-ink')}>
            {a.key === 'dashboard' ? 'Client' : a.key === 'owner' ? 'Owner' : 'Admin'}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function AppShell({ areaKey, children }: { areaKey: AppArea['key']; children: React.ReactNode }) {
  const area = areas[areaKey];
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  const sidebar = (
    <div className="flex h-full flex-col gap-5 p-4">
      <div className="px-2 pt-1"><Logo /></div>
      <AreaSwitcher current={areaKey} />
      {areaKey === 'dashboard' && (
        <button type="button" className="flex items-center justify-between rounded-2xl border border-line p-3 text-left hover:border-line-2" aria-label="Switch workspace (sample)">
          <span className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-xs font-bold text-white">AW</span>
            <span className="flex flex-col leading-tight"><span className="text-sm font-semibold text-ink">Acme workspace</span><span className="text-xs text-muted">Sample workspace</span></span>
          </span>
          <ChevronsUpDown className="h-4 w-4 text-muted" aria-hidden="true" />
        </button>
      )}
      <div className="-mx-1 flex-1 overflow-y-auto px-1"><SideNav area={area} onNavigate={() => setOpen(false)} /></div>
      <Link href="/" className="rounded-xl px-3 py-2 text-sm font-medium text-muted hover:text-brand">← Back to website</Link>
    </div>
  );

  return (
    <div className="min-h-dvh bg-mist">
      <div className="flex items-center justify-center gap-2 bg-warning-soft px-4 py-2 text-center text-sm font-medium text-warning">
        <Eye className="h-4 w-4 flex-none" aria-hidden="true" />Layout preview. These screens show structure only and are not connected to live data yet.
      </div>
      <div className="flex">
        <aside className="sticky top-0 hidden h-dvh w-[272px] flex-none border-r border-line bg-white lg:block">{sidebar}</aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl border border-line lg:hidden" aria-label="Open navigation"><Menu className="h-5 w-5" aria-hidden="true" /></button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30" />
                <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-[290px] bg-white shadow-2xl" aria-describedby={undefined}>
                  <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                  <Dialog.Close className="absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-line" aria-label="Close navigation"><X className="h-4 w-4" aria-hidden="true" /></Dialog.Close>
                  {sidebar}
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <div className="relative hidden max-w-md flex-1 sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <label htmlFor="app-search" className="sr-only">Search</label>
              <input id="app-search" type="search" placeholder="Search campaigns, channels, bookings" className="h-10 w-full rounded-xl border border-line bg-mist pl-9 pr-3 text-sm focus:border-brand focus:bg-white focus:outline-none" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink-2 hover:text-brand" aria-label="Notifications"><Bell className="h-[18px] w-[18px]" aria-hidden="true" /></button>
              <span className="flex h-10 items-center gap-2 rounded-xl border border-line pl-1 pr-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky text-xs font-bold text-brand">YN</span>
                <span className="hidden text-sm font-semibold text-ink sm:block">Your name</span>
              </span>
            </div>
          </header>
          <main id="main" className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
