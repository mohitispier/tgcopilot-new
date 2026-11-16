'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { services } from '@/data/services';
import { Button } from '@/components/ui/button';
import { FieldError, Input, Label, Select, Textarea } from '@/components/ui/form';
import { isEmail, submitForm, type SubmitResult } from '@/lib/forms';
import { FormNotice } from './form-notice';

const budgets = ['Not sure yet', 'Under $500 per month', '$500 – $2,000 per month', '$2,000 – $10,000 per month', 'Over $10,000 per month'];
const topics = [
  { v: 'managed', l: 'Managed campaign' },
  ...services.map((s) => ({ v: s.slug, l: s.title.charAt(0).toUpperCase() + s.title.slice(1) })),
  { v: 'agency', l: 'Agency partnership' },
  { v: 'channel-owner', l: 'Listing my channel' },
  { v: 'extension', l: 'Chrome extension' },
  { v: 'api', l: 'API access' },
  { v: 'other', l: 'Something else' },
];

type Fields = { name: string; email: string; telegram: string; company: string; topic: string; budget: string; message: string };

export function ContactForm({ initialTopic, channel }: { initialTopic?: string; channel?: string }) {
  const valid = topics.some((t) => t.v === initialTopic);
  const [f, setF] = useState<Fields>({
    name: '', email: '', telegram: '', company: '', topic: valid ? initialTopic! : 'managed', budget: budgets[0],
    message: channel ? `I'd like a quote for advertising on @${channel}.` : '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (f.name.trim().length < 2) errs.name = 'Enter your name';
    if (!isEmail(f.email)) errs.email = 'Enter a valid email address';
    if (f.telegram && !/^@?[A-Za-z][A-Za-z0-9_]{4,31}$/.test(f.telegram.trim())) errs.telegram = 'Telegram usernames are 5–32 letters, numbers or underscores';
    if (f.message.trim().length < 20) errs.message = 'Tell us a little more (at least 20 characters)';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    const topic = topics.find((t) => t.v === f.topic)?.l ?? f.topic;
    setResult(await submitForm('Contact', { ...f, topic }));
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-float)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name">Your name</Label>
          <Input id="c-name" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby="c-name-err" />
          <FieldError id="c-name-err" message={errors.name} />
        </div>
        <div>
          <Label htmlFor="c-email">Work email</Label>
          <Input id="c-email" type="email" autoComplete="email" value={f.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby="c-email-err" />
          <FieldError id="c-email-err" message={errors.email} />
        </div>
        <div>
          <Label htmlFor="c-tg" optional>Telegram username</Label>
          <Input id="c-tg" value={f.telegram} onChange={set('telegram')} placeholder="@username" aria-invalid={!!errors.telegram} aria-describedby="c-tg-err" />
          <FieldError id="c-tg-err" message={errors.telegram} />
        </div>
        <div>
          <Label htmlFor="c-company" optional>Company or website</Label>
          <Input id="c-company" autoComplete="organization" value={f.company} onChange={set('company')} />
        </div>
        <div>
          <Label htmlFor="c-topic">What do you need?</Label>
          <Select id="c-topic" value={f.topic} onChange={set('topic')}>{topics.map((t) => <option key={t.v} value={t.v}>{t.l}</option>)}</Select>
        </div>
        <div>
          <Label htmlFor="c-budget">Advertising budget</Label>
          <Select id="c-budget" value={f.budget} onChange={set('budget')}>{budgets.map((b) => <option key={b}>{b}</option>)}</Select>
        </div>
      </div>
      <div>
        <Label htmlFor="c-msg">What do you want to promote?</Label>
        <Textarea id="c-msg" value={f.message} onChange={set('message')} placeholder="Your product, who it’s for, the result you want and any deadlines" aria-invalid={!!errors.message} aria-describedby="c-msg-err" />
        <FieldError id="c-msg-err" message={errors.message} />
      </div>
      <Button type="submit" size="lg" disabled={busy}><Send className="h-5 w-5" aria-hidden="true" />{busy ? 'Sending…' : 'Send message'}</Button>
      <FormNotice result={result} />
      <p className="text-sm text-muted">We use your details only to reply to this enquiry. See our <a href="/privacy" className="font-semibold text-brand hover:underline">privacy policy</a>.</p>
    </form>
  );
}
