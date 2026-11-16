import type { Metadata } from 'next';
import { LegalPage } from '@/components/site/legal-page';

export const metadata: Metadata = { title: 'Cookie Policy', alternates: { canonical: '/cookie-policy' } };

export default function Page() {
  return <LegalPage slug="cookie-policy" />;
}
