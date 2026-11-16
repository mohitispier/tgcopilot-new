import type { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/components/site/auth-forms';

export const metadata: Metadata = { title: 'Create your account' };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[34px] font-bold tracking-[-0.03em]">Create your free account</h1>
        <p className="text-muted">Browse channels, write ads with AI and manage everything in one place.</p>
      </div>
      <RegisterForm initialType={type} />
      <p className="text-center text-[15px] text-muted">Already have an account? <Link href="/login" className="font-semibold text-brand hover:underline">Log in</Link></p>
    </div>
  );
}
