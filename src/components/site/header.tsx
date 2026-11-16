'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { mainNav, type NavGroup } from '@/data/navigation';
import { Icon } from '@/components/ui/icon';
import { ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

function DesktopDropdown({ group, open, onOpen, onClose, active }: { group: NavGroup; open: boolean; onOpen: () => void; onClose: () => void; active: boolean }) {
  const mega = !!group.secondary;
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
        className={cn('flex h-10 items-center gap-1 rounded-full px-3.5 text-[15px] font-medium text-ink-2 transition-colors hover:bg-sky hover:text-brand', (open || active) && 'text-brand')}
      >
        {group.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <div className={cn('absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200', open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0')}>
        <div className={cn('overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_-30px_rgb(15_35_71/0.4)]', mega ? 'grid w-[820px] grid-cols-[1.55fr_1fr]' : 'w-[340px]')}>
          <div className="p-3">
            <ul className={cn('grid gap-0.5', mega && 'grid-cols-2')}>
              {group.items!.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={onClose} className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-mist">
                    {item.icon && (
                      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-tg-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <Icon name={item.icon} className="h-5 w-5" />
                      </span>
                    )}
                    <span className="flex flex-col">
                      <span className="text-[15px] font-semibold text-ink">{item.label}</span>
                      {item.description && <span className="text-[13px] leading-snug text-muted">{item.description}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {group.footer && (
              <Link href={group.footer.href} onClick={onClose} className="mt-1 flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-semibold text-brand hover:bg-mist">
                {group.footer.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
          {group.secondary && (
            <div className="relative flex flex-col gap-1 bg-[linear-gradient(160deg,#eef7fd,#f3f0ff)] p-5">
              <p className="mb-1 px-2 text-sm font-semibold text-muted">{group.secondary.title}</p>
              {group.secondary.items.map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose} className="group flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white">
                  {item.icon && <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white text-violet shadow-sm group-hover:bg-violet group-hover:text-white"><Icon name={item.icon} className="h-[18px] w-[18px]" /></span>}
                  <span className="flex flex-col"><span className="text-[14.5px] font-semibold text-ink">{item.label}</span>{item.description && <span className="text-[12.5px] text-muted">{item.description}</span>}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenMenu(null);
    const onClick = (e: MouseEvent) => !navRef.current?.contains(e.target as Node) && setOpenMenu(null);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [openMenu]);

  const isActive = (href?: string) => !!href && (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 -mb-[76px] px-3 pt-3 sm:px-5">
      <div className={cn('mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-2xl border px-4 transition-all duration-300 sm:px-5', scrolled ? 'border-line/80 bg-white/80 shadow-[0_12px_40px_-20px_rgb(15_35_71/0.35)] backdrop-blur-xl' : 'border-transparent bg-white/40 backdrop-blur-sm')}>
        <Logo />

        <nav ref={navRef} aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {mainNav.map((group) =>
            group.items ? (
              <DesktopDropdown key={group.label} group={group} active={isActive(group.href)} open={openMenu === group.label} onOpen={() => setOpenMenu(group.label)} onClose={() => setOpenMenu(null)} />
            ) : (
              <Link
                key={group.label}
                href={group.href!}
                aria-current={isActive(group.href) ? 'page' : undefined}
                className={cn('flex h-10 items-center rounded-full px-3.5 text-[15px] font-medium text-ink-2 transition-colors hover:bg-sky hover:text-brand', isActive(group.href) && 'bg-sky text-brand')}
              >
                {group.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/contact" size="sm" className="group rounded-full px-5">Get started<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></ButtonLink>
        </div>

        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild>
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-ink lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl" aria-describedby={undefined}>
              <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Logo />
                <Dialog.Close className="flex h-11 w-11 items-center justify-center rounded-xl border border-line" aria-label="Close menu">
                  <X className="h-5 w-5" aria-hidden="true" />
                </Dialog.Close>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
                {mainNav.map((group) =>
                  group.items ? (
                    <details key={group.label} className="group border-b border-line/70">
                      <summary className="flex h-14 cursor-pointer list-none items-center justify-between px-2 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                        {group.label}
                        <ChevronDown className="h-5 w-5 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <ul className="pb-3">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-[15px] text-ink-2 hover:bg-mist">
                              {item.icon && <Icon name={item.icon} className="h-[18px] w-[18px] text-brand" />}
                              {item.label}
                            </Link>
                          </li>
                        ))}
                        {group.secondary?.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-[15px] text-ink-2 hover:bg-mist">
                              {item.icon && <Icon name={item.icon} className="h-[18px] w-[18px] text-violet" />}
                              {item.label}
                            </Link>
                          </li>
                        ))}
                        {group.footer && (
                          <li>
                            <Link href={group.footer.href} className="block px-2 py-2.5 text-[15px] font-semibold text-brand">{group.footer.label}</Link>
                          </li>
                        )}
                      </ul>
                    </details>
                  ) : (
                    <Link key={group.label} href={group.href!} className="flex h-14 items-center border-b border-line/70 px-2 text-[17px] font-semibold">
                      {group.label}
                    </Link>
                  ),
                )}
              </nav>
              <div className="grid gap-2 border-t border-line p-5">
                <ButtonLink href="/contact" size="lg">Get started</ButtonLink>
                <ButtonLink href="/services" variant="secondary" size="lg">Explore services</ButtonLink>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
