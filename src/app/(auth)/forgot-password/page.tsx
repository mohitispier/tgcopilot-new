import type { Metadata } from 'next';
import Link from 'next/link';
import { ForgotForm } from '@/components/site/auth-forms';

export const metadata: Metadata = { title: 'Reset your password' };

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[34px] font-bold tracking-[-0.03em]">Reset your password</h1>
        <p className="text-muted">Enter the email you signed up with and we’ll send you a reset link.</p>
      </div>
      <ForgotForm />
      <p className="text-center text-[15px] text-muted"><Link href="/login" className="font-semibold text-brand hover:underline">Back to log in</Link></p>
    </div>
  );
}
