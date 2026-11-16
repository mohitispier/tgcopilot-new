import type { Metadata } from 'next';
import Link from 'next/link';
import { ChartPlaceholder, EmptyState, PageTitle, Panel, StatCard } from '@/components/app-shell/blocks';

export const metadata: Metadata = { title: 'Channel owner dashboard' };

export default function OwnerOverview() {
  return (
    <>
      <PageTitle
        title="Overview"
        description="Your channels, booking requests and earnings."
        action={<Link href="/owner/add-channel" className="inline-flex h-11 items-center rounded-xl bg-brand px-5 text-[15px] font-semibold text-white hover:bg-brand-600">Add a channel</Link>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Listed channels" icon="Radio" />
        <StatCard label="Booking requests" icon="Inbox" />
        <StatCard label="Upcoming posts" icon="CalendarCheck" />
        <StatCard label="Available earnings" icon="Wallet" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Earnings"><ChartPlaceholder label="Monthly earnings" /></Panel>
        <Panel title="Booking requests" action={<Link href="/owner/requests" className="text-sm font-semibold text-brand hover:underline">View all</Link>}>
          <EmptyState icon="Inbox" title="No requests yet" text="When advertisers request a slot, you’ll accept or decline it here." />
        </Panel>
      </div>
      <Panel title="My channels" className="mt-6" action={<Link href="/owner/channels" className="text-sm font-semibold text-brand hover:underline">Manage</Link>}>
        <EmptyState icon="Radio" title="List your first channel" text="Add your channel, verify ownership and set prices. Our team reviews listings before they go live." cta={{ label: 'Add a channel', href: '/owner/add-channel' }} />
      </Panel>
    </>
  );
}
