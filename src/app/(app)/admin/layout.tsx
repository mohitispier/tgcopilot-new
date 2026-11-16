import type { Metadata } from 'next';
import { AppShell } from '@/components/app-shell/app-shell';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell areaKey="admin">{children}</AppShell>;
}
