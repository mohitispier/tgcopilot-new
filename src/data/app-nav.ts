/** Sidebar navigation for the three dashboards. Layout only: modules are wired to the backend in the next phase. */
export interface AppNavItem { label: string; slug: string; icon: string; description: string }
export interface AppArea { key: 'dashboard' | 'owner' | 'admin'; title: string; base: string; nav: AppNavItem[] }

const n = (label: string, slug: string, icon: string, description: string): AppNavItem => ({ label, slug, icon, description });

export const areas: Record<AppArea['key'], AppArea> = {
  dashboard: {
    key: 'dashboard', title: 'Advertiser', base: '/dashboard',
    nav: [
      n('Overview', '', 'LayoutDashboard', 'Your campaigns, spend and bookings at a glance.'),
      n('My campaigns', 'campaigns', 'Megaphone', 'All self-service and managed campaigns with their status and results.'),
      n('Create campaign', 'create-campaign', 'CirclePlus', 'Step-by-step campaign builder: objective, platform, audience, creative, budget, schedule, preview and payment.'),
      n('Managed services', 'managed-services', 'Headset', 'Submit requirements, review quotations and follow campaigns our team runs for you.'),
      n('Marketplace', 'marketplace', 'Store', 'Browse and book channels without leaving your dashboard.'),
      n('My bookings', 'bookings', 'CalendarCheck', 'Track channel bookings from request to proof of publication.'),
      n('Saved channels', 'saved-channels', 'Bookmark', 'Your channel shortlists, synced with the Chrome extension.'),
      n('AI Ad Generator', 'ai-generator', 'Sparkles', 'Generate, edit and save ad copy, with your generation history.'),
      n('Reports', 'reports', 'ChartColumn', 'Download campaign reports and performance summaries.'),
      n('Billing', 'billing', 'CreditCard', 'Payments, invoices, subscription and refund requests.'),
      n('Team', 'team', 'Users', 'Invite teammates and, for agencies, manage client workspaces.'),
      n('Support', 'support', 'LifeBuoy', 'Open and follow support tickets.'),
      n('Profile', 'profile', 'UserRound', 'Account details, security and two-factor authentication.'),
    ],
  },
  owner: {
    key: 'owner', title: 'Channel owner', base: '/owner',
    nav: [
      n('Overview', '', 'LayoutDashboard', 'Bookings, earnings and channel status at a glance.'),
      n('My channels', 'channels', 'Radio', 'Your listed channels and their verification status.'),
      n('Add new channel', 'add-channel', 'CirclePlus', 'List a channel: details, formats, prices and available slots.'),
      n('Verification', 'verification', 'BadgeCheck', 'Prove ownership with a description code or by adding our bot.'),
      n('Pricing', 'pricing', 'Tags', 'Set prices for each ad format.'),
      n('Booking requests', 'requests', 'Inbox', 'Accept or decline incoming booking requests and creatives.'),
      n('Confirmed bookings', 'bookings', 'CalendarCheck', 'Upcoming posts and proof submission.'),
      n('Availability', 'availability', 'CalendarDays', 'Your calendar of available ad slots.'),
      n('Earnings', 'earnings', 'Wallet', 'Pending and available earnings, commissions and payouts.'),
      n('Reviews', 'reviews', 'Star', 'Feedback from advertisers after completed bookings.'),
      n('Settings', 'settings', 'Settings', 'Profile, payout details and notifications.'),
    ],
  },
  admin: {
    key: 'admin', title: 'Admin', base: '/admin',
    nav: [
      n('Overview', '', 'LayoutDashboard', 'Platform health, revenue and work queues.'),
      n('Users', 'users', 'Users', 'Search, edit, suspend users and manage roles and KYC.'),
      n('Agencies', 'agencies', 'Building2', 'Agency accounts and their client workspaces.'),
      n('Staff', 'staff', 'UserCog', 'Team members, roles and assignments.'),
      n('Channel owners', 'channel-owners', 'Radio', 'Owners, payouts and performance.'),
      n('Channel listings', 'channels', 'Store', 'All marketplace listings.'),
      n('Verification queue', 'verification', 'BadgeCheck', 'Approve or reject channel submissions.'),
      n('Campaigns', 'campaigns', 'Megaphone', 'Review, approve and submit campaigns; record results.'),
      n('Service requests', 'service-requests', 'Headset', 'Managed advertising requests and staff assignment.'),
      n('Quotations', 'quotations', 'FileText', 'Prepare and send quotations.'),
      n('Orders', 'orders', 'ClipboardList', 'Order execution, updates and deliverables.'),
      n('Bookings', 'bookings', 'CalendarCheck', 'All marketplace bookings and disputes.'),
      n('Payments', 'payments', 'CreditCard', 'Transactions, manual confirmations and reconciliation.'),
      n('Refunds', 'refunds', 'RotateCcw', 'Refund requests and decisions.'),
      n('Commissions', 'commissions', 'Percent', 'Commission rules by category, channel and service.'),
      n('Subscriptions', 'subscriptions', 'Repeat', 'Plans and subscribers.'),
      n('Blog', 'blog', 'Newspaper', 'Articles, categories, tags and scheduling.'),
      n('Extension users', 'extension', 'Puzzle', 'Chrome extension installs and usage.'),
      n('AI usage', 'ai-usage', 'Sparkles', 'AI tool usage and limits.'),
      n('Support tickets', 'support', 'LifeBuoy', 'Customer tickets, priorities and assignment.'),
      n('Notifications', 'notifications', 'Bell', 'Email and in-app notification templates.'),
      n('Analytics', 'analytics', 'ChartColumn', 'Revenue and operational reports.'),
      n('Audit logs', 'audit-logs', 'ScrollText', 'Every admin action, who did it and when.'),
      n('System settings', 'settings', 'Settings', 'Platform settings and integrations.'),
    ],
  },
};
