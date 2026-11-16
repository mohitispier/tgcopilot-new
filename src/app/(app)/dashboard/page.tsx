import type { Metadata } from 'next';
import Link from 'next/link';
import { ChartPlaceholder, EmptyState, PageTitle, Panel, StatCard } from '@/components/app-shell/blocks';

export const metadata: Metadata = { title: 'Dashboard' };

export default function ClientOverview() {
  return (
    <>
      <PageTitle
        title="Overview"
        description="Your campaigns, bookings and spend in one place."
        action={<Link href="/dashboard/create-campaign" className="inline-flex h-11 items-center rounded-xl bg-brand px-5 text-[15px] font-semibold text-white hover:bg-brand-600">Create campaign</Link>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Active campaigns" icon="Megaphone" />
        <StatCard label="Total campaigns" icon="ClipboardList" />
        <StatCard label="Total spend" icon="CreditCard" />
        <StatCard label="Pending orders" icon="Inbox" />
        <StatCard label="Active bookings" icon="CalendarCheck" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Campaign performance" action={<span className="text-sm text-muted">Last 30 days</span>}><ChartPlaceholder label="Impressions, clicks and spend" /></Panel>
        <Panel title="Recent activity"><EmptyState icon="Bell" title="No activity yet" text="Campaign updates, booking confirmations and payments will appear here." /></Panel>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="My campaigns" action={<Link href="/dashboard/campaigns" className="text-sm font-semibold text-brand hover:underline">View all</Link>}>
          <EmptyState icon="Megaphone" title="No campaigns yet" text="Create a self-service campaign or ask our team to run one for you." cta={{ label: 'Create campaign', href: '/dashboard/create-campaign' }} />
        </Panel>
        <Panel title="My bookings" action={<Link href="/dashboard/bookings" className="text-sm font-semibold text-brand hover:underline">View all</Link>}>
          <EmptyState icon="CalendarCheck" title="No bookings yet" text="Book a channel from the marketplace to see it here." cta={{ label: 'Browse marketplace', href: '/marketplace' }} />
        </Panel>
      </div>
    </>
  );
}
