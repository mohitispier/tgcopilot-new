import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/components/site/auth-forms';

export const metadata: Metadata = { title: 'Log in' };

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[34px] font-bold tracking-[-0.03em]">Welcome back</h1>
        <p className="text-muted">Log in to manage your campaigns, bookings and channels.</p>
      </div>
      <LoginForm />
      <p className="text-center text-[15px] text-muted">New to TG Copilot? <Link href="/register" className="font-semibold text-brand hover:underline">Create a free account</Link></p>
    </div>
  );
}
