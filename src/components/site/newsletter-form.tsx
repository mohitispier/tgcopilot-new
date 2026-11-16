'use client';

import { useState } from 'react';
import { isEmail, submitForm, type SubmitResult } from '@/lib/forms';
import { FormNotice } from './form-notice';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) return setError('Enter a valid email address');
    setError(undefined);
    setBusy(true);
    setResult(await submitForm('Newsletter signup', { email }));
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
          aria-invalid={!!error} aria-describedby={error ? 'newsletter-error' : undefined}
          className="h-11 min-w-0 flex-1 rounded-xl border border-line-2 bg-white px-3.5 text-[15px] focus:border-brand focus:outline-none focus:ring-4 focus:ring-tg/15"
        />
        <button type="submit" disabled={busy} className="h-11 rounded-xl bg-brand px-4 text-[15px] font-semibold text-white hover:bg-brand-600 disabled:opacity-60">Subscribe</button>
      </div>
      {error && <p id="newsletter-error" className="text-sm text-red-600">{error}</p>}
      <FormNotice result={result} sentText="You're subscribed. Look out for our next issue." />
    </form>
  );
}
