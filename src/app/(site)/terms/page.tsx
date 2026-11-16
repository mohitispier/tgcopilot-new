import type { Metadata } from 'next';
import { LegalPage } from '@/components/site/legal-page';

export const metadata: Metadata = { title: 'Terms and Conditions', alternates: { canonical: '/terms' } };

export default function Page() {
  return <LegalPage slug="terms" />;
}
