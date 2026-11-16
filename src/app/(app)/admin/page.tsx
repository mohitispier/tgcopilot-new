import type { Metadata } from 'next';
import Link from 'next/link';
import { ChartPlaceholder, EmptyState, PageTitle, Panel, StatCard } from '@/components/app-shell/blocks';

export const metadata: Metadata = { title: 'Admin' };

const queues = [
  { title: 'Channel verification', icon: 'BadgeCheck', href: '/admin/verification', text: 'New channel submissions waiting for review.' },
  { title: 'Managed service requests', icon: 'Headset', href: '/admin/service-requests', text: 'Requests that need triage and a quotation.' },
  { title: 'Campaigns to review', icon: 'Megaphone', href: '/admin/campaigns', text: 'Paid campaigns waiting for approval and submission.' },
  { title: 'Support tickets', icon: 'LifeBuoy', href: '/admin/support', text: 'Open tickets by priority.' },
];

export default function AdminOverview() {
  return (
    <>
      <PageTitle title="Admin overview" description="Platform revenue, activity and the queues that need your team." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue this month" icon="CreditCard" />
        <StatCard label="Active users" icon="Users" />
        <StatCard label="Published channels" icon="Store" />
        <StatCard label="Open orders" icon="ClipboardList" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Revenue"><ChartPlaceholder label="Revenue by source" /></Panel>
        <Panel title="Recent audit log" action={<Link href="/admin/audit-logs" className="text-sm font-semibold text-brand hover:underline">View all</Link>}>
          <EmptyState icon="ScrollText" title="No admin actions yet" text="Approvals, refunds and setting changes are recorded here." />
        </Panel>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {queues.map((q) => (
          <Link key={q.title} href={q.href} className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-[var(--shadow-card)]">
            <span className="font-display text-3xl font-bold text-ink">0</span>
            <span className="font-semibold text-ink">{q.title}</span>
            <span className="text-sm text-muted">{q.text}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
