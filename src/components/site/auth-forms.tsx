'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Building2, Eye, EyeOff, Info, Megaphone, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FieldError, Input, Label } from '@/components/ui/form';
import { isEmail } from '@/lib/forms';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

function NotYetNotice() {
  return (
    <p role="status" className="flex items-start gap-2 rounded-xl bg-warning-soft p-3 text-sm text-warning">
      <Info className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
      <span>Accounts are launching soon, so sign-in is not available yet. Meanwhile, <Link href="/contact" className="font-semibold underline">contact our team</Link> or email <a href={`mailto:${site.email}`} className="font-semibold underline">{site.email}</a>.</span>
    </p>
  );
}

function PasswordInput({ id, value, onChange, invalid, describedBy, autoComplete }: { id: string; value: string; onChange: (v: string) => void; invalid?: boolean; describedBy?: string; autoComplete: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input id={id} type={show ? 'text' : 'password'} autoComplete={autoComplete} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={invalid} aria-describedby={describedBy} className="pr-12" />
      <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:text-ink">
        {show ? <EyeOff className="h-[18px] w-[18px]" aria-hidden="true" /> : <Eye className="h-[18px] w-[18px]" aria-hidden="true" />}
      </button>
    </div>
  );
}

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!isEmail(email)) errs.email = 'Enter a valid email address';
    if (!password) errs.password = 'Enter your password';
    setErrors(errs);
    setSubmitted(!Object.keys(errs).length);
  }
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <Label htmlFor="l-email">Email</Label>
        <Input id="l-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby="l-email-err" />
        <FieldError id="l-email-err" message={errors.email} />
      </div>
      <div>
        <div className="flex items-center justify-between"><Label htmlFor="l-pass">Password</Label><Link href="/forgot-password" className="mb-1.5 text-sm font-semibold text-brand hover:underline">Forgot password?</Link></div>
        <PasswordInput id="l-pass" value={password} onChange={setPassword} invalid={!!errors.password} describedBy="l-pass-err" autoComplete="current-password" />
        <FieldError id="l-pass-err" message={errors.password} />
      </div>
      <Button type="submit" size="lg">Log in</Button>
      {submitted && <NotYetNotice />}
    </form>
  );
}

const accountTypes = [
  { v: 'advertiser', label: 'Advertiser', text: 'I want to promote my business', icon: Megaphone },
  { v: 'agency', label: 'Agency', text: 'I run ads for clients', icon: Building2 },
  { v: 'channel-owner', label: 'Channel owner', text: 'I want to sell ad slots', icon: Radio },
];

export function RegisterForm({ initialType }: { initialType?: string }) {
  const [type, setType] = useState(accountTypes.some((a) => a.v === initialType) ? initialType! : 'advertiser');
  const [f, setF] = useState({ name: '', email: '', company: '', password: '', agree: false });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof f, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (f.name.trim().length < 2) errs.name = 'Enter your name';
    if (!isEmail(f.email)) errs.email = 'Enter a valid email address';
    if (!/^(?=.*[A-Za-z])(?=.*\d).{10,}$/.test(f.password)) errs.password = 'Use at least 10 characters with a letter and a number';
    if (!f.agree) errs.agree = 'Please accept the terms to continue';
    setErrors(errs);
    setSubmitted(!Object.keys(errs).length);
  }
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink">I am a…</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {accountTypes.map((a) => (
            <label key={a.v} className={cn('flex cursor-pointer flex-col gap-1.5 rounded-2xl border p-3 transition-colors', type === a.v ? 'border-brand bg-tg-soft' : 'border-line hover:border-line-2')}>
              <input type="radio" name="account-type" value={a.v} checked={type === a.v} onChange={() => setType(a.v)} className="sr-only" />
              <a.icon className={cn('h-5 w-5', type === a.v ? 'text-brand' : 'text-muted')} aria-hidden="true" />
              <span className="text-sm font-bold text-ink">{a.label}</span>
              <span className="text-xs leading-snug text-muted">{a.text}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="r-name">Full name</Label>
          <Input id="r-name" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} aria-invalid={!!errors.name} aria-describedby="r-name-err" />
          <FieldError id="r-name-err" message={errors.name} />
        </div>
        <div>
          <Label htmlFor="r-company" optional>{type === 'channel-owner' ? 'Channel name' : 'Company'}</Label>
          <Input id="r-company" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} />
        </div>
      </div>
      <div>
        <Label htmlFor="r-email">Work email</Label>
        <Input id="r-email" type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} aria-invalid={!!errors.email} aria-describedby="r-email-err" />
        <FieldError id="r-email-err" message={errors.email} />
      </div>
      <div>
        <Label htmlFor="r-pass">Password</Label>
        <PasswordInput id="r-pass" value={f.password} onChange={(v) => setF({ ...f, password: v })} invalid={!!errors.password} describedBy="r-pass-err" autoComplete="new-password" />
        <FieldError id="r-pass-err" message={errors.password ?? undefined} />
        {!errors.password && <p className="mt-1.5 text-sm text-muted">At least 10 characters, with a letter and a number.</p>}
      </div>
      <label className="flex items-start gap-3 text-sm text-ink-2">
        <input type="checkbox" checked={f.agree} onChange={(e) => setF({ ...f, agree: e.target.checked })} className="mt-0.5 h-5 w-5 flex-none accent-[var(--color-brand)]" aria-invalid={!!errors.agree} aria-describedby="r-agree-err" />
        <span>I agree to the <Link href="/terms" className="font-semibold text-brand hover:underline">terms</Link> and <Link href="/privacy" className="font-semibold text-brand hover:underline">privacy policy</Link>.</span>
      </label>
      <FieldError id="r-agree-err" message={errors.agree} />
      <Button type="submit" size="lg">Create account</Button>
      {submitted && <NotYetNotice />}
    </form>
  );
}

export function ForgotForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  return (
    <form onSubmit={(e) => { e.preventDefault(); const ok = isEmail(email); setError(ok ? undefined : 'Enter a valid email address'); setSubmitted(ok); }} noValidate className="flex flex-col gap-5">
      <div>
        <Label htmlFor="f-email">Email</Label>
        <Input id="f-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} aria-describedby="f-email-err" />
        <FieldError id="f-email-err" message={error} />
      </div>
      <Button type="submit" size="lg">Send reset link</Button>
      {submitted && <NotYetNotice />}
    </form>
  );
}
