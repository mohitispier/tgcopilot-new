import type { Metadata } from 'next';
import { LegalPage } from '@/components/site/legal-page';

export const metadata: Metadata = { title: 'Refund Policy', alternates: { canonical: '/refund-policy' } };

export default function Page() {
  return <LegalPage slug="refund-policy" />;
}
