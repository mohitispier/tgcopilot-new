import {
  BadgeCheck, Bell, Bookmark, Building2, CalendarCheck, CalendarDays, ChartColumn, CirclePlus, ClipboardList, CreditCard,
  FileText, Headset, Inbox, LayoutDashboard, LifeBuoy, Megaphone, Newspaper, Percent, Puzzle, Radio, Repeat, RotateCcw,
  ScrollText, Settings, Sparkles, Star, Store, Tags, UserCog, UserRound, Users, Wallet, type LucideProps,
} from 'lucide-react';

const icons: Record<string, React.ComponentType<LucideProps>> = {
  BadgeCheck, Bell, Bookmark, Building2, CalendarCheck, CalendarDays, ChartColumn, CirclePlus, ClipboardList, CreditCard,
  FileText, Headset, Inbox, LayoutDashboard, LifeBuoy, Megaphone, Newspaper, Percent, Puzzle, Radio, Repeat, RotateCcw,
  ScrollText, Settings, Sparkles, Star, Store, Tags, UserCog, UserRound, Users, Wallet,
};

export function AppIcon({ name, ...props }: { name: string } & LucideProps) {
  const C = icons[name] ?? LayoutDashboard;
  return <C aria-hidden="true" {...props} />;
}
