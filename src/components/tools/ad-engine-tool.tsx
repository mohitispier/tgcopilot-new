'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, Copy, Info, RefreshCw, Save, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FieldError, Input, Label, Select, Textarea } from '@/components/ui/form';
import { cn } from '@/lib/utils';

type Form = { product: string; description: string; audience: string; objective: string; language: string; tone: string; cta: string };
type Variant = { angle: string; headline: string; message: string; post: string };

const objectives = ['Website traffic', 'Channel subscribers', 'Bot starts', 'Sales or sign-ups'];
const tones = ['Friendly', 'Professional', 'Bold', 'Playful'];
const languages = ['English', 'Hindi', 'Hinglish', 'Russian', 'Arabic', 'Spanish'];

const ctaFor: Record<string, string> = {
  'Website traffic': 'Learn more', 'Channel subscribers': 'Join the channel', 'Bot starts': 'Start the bot', 'Sales or sign-ups': 'Get started',
};

function firstSentence(t: string) {
  const s = t.trim().split(/(?<=[.!?])\s/)[0] ?? t;
  return s.replace(/[.!?]+$/, '');
}

function clip(t: string, max = 160) {
  return t.length <= max ? t : t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

/** Template drafts built from the brief. Replaced by the real AI provider in the next phase. */
function draft(f: Form, seed: number): Variant[] {
  const benefit = firstSentence(f.description) || `Everything you need from ${f.product}`;
  const who = f.audience || 'you';
  const cta = f.cta || ctaFor[f.objective] || 'Learn more';
  const bold = f.tone === 'Bold';
  const angles: Variant[] = [
    { angle: 'Benefit', headline: `${f.product}: ${benefit}`, message: `${benefit}. Made for ${who}. ${cta}.`, post: `${bold ? '🚀 ' : ''}${f.product}\n\n${benefit}.\n\nBuilt for ${who}. ${cta} 👇` },
    { angle: 'Problem → solution', headline: `Still doing it the hard way?`, message: `Tired of the hard way? ${f.product} helps ${who}: ${benefit.toLowerCase()}. ${cta}.`, post: `Still doing it the hard way?\n\n${f.product} helps ${who}. ${benefit}.\n\n${cta} 👇` },
    { angle: 'Urgency', headline: `Try ${f.product} this week`, message: `This week only for ${who}: ${benefit.toLowerCase()}. Don’t miss it. ${cta}.`, post: `This week only ⏳\n\n${benefit} with ${f.product}.\n\n${cta} 👇` },
    { angle: 'Social proof', headline: `Why ${who} choose ${f.product}`, message: `Why ${who} choose ${f.product}: ${benefit.toLowerCase()}. See for yourself. ${cta}.`, post: `Why ${who} choose ${f.product}\n\n${benefit}.\n\n${cta} 👇` },
    { angle: 'Question', headline: `Want ${benefit.toLowerCase()}?`, message: `Want ${benefit.toLowerCase()}? ${f.product} makes it simple for ${who}. ${cta}.`, post: `Want ${benefit.toLowerCase()}?\n\n${f.product} makes it simple.\n\n${cta} 👇` },
  ];
  const rot = seed % angles.length;
  return [...angles.slice(rot), ...angles.slice(0, rot)].slice(0, 3).map((v) => ({ ...v, message: clip(v.message) }));
}

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); }}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-sm font-semibold text-ink-2 hover:border-brand hover:text-brand"
    >
      {done ? <Check className="h-4 w-4 text-success" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}{done ? 'Copied' : 'Copy'}
    </button>
  );
}

export function AdEngineTool() {
  const [form, setForm] = useState<Form>({ product: '', description: '', audience: '', objective: objectives[0], language: languages[0], tone: tones[0], cta: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [results, setResults] = useState<Variant[] | null>(null);
  const [seed, setSeed] = useState(0);
  const [tab, setTab] = useState<'message' | 'post'>('message');
  const [history, setHistory] = useState<{ product: string; at: string; variants: Variant[] }[]>([]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  function generate(nextSeed = seed) {
    const errs: typeof errors = {};
    if (form.product.trim().length < 2) errs.product = 'Enter your product or brand name';
    if (form.description.trim().length < 15) errs.description = 'Describe your product in at least one sentence';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const v = draft({ ...form, product: form.product.trim(), audience: form.audience.trim() }, nextSeed);
    setResults(v);
    setHistory((h) => [{ product: form.product.trim(), at: new Date().toLocaleTimeString(), variants: v }, ...h].slice(0, 5));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
      <form
        onSubmit={(e) => { e.preventDefault(); generate(); }}
        noValidate
        className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7"
      >
        <h2 className="flex items-center gap-2 text-xl font-bold"><Sparkles className="h-5 w-5 text-brand" aria-hidden="true" />Your brief</h2>
        <div>
          <Label htmlFor="ae-product">Product or brand name</Label>
          <Input id="ae-product" value={form.product} onChange={set('product')} placeholder="e.g. ShopLaunch" aria-invalid={!!errors.product} aria-describedby="ae-product-err" />
          <FieldError id="ae-product-err" message={errors.product} />
        </div>
        <div>
          <Label htmlFor="ae-desc">What does it do?</Label>
          <Textarea id="ae-desc" value={form.description} onChange={set('description')} placeholder="e.g. Launch an online store in a weekend with templates, payments and hosting in one place." aria-invalid={!!errors.description} aria-describedby="ae-desc-err" />
          <FieldError id="ae-desc-err" message={errors.description} />
        </div>
        <div>
          <Label htmlFor="ae-aud" optional>Target audience</Label>
          <Input id="ae-aud" value={form.audience} onChange={set('audience')} placeholder="e.g. small business owners" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="ae-obj">Objective</Label>
            <Select id="ae-obj" value={form.objective} onChange={set('objective')}>{objectives.map((o) => <option key={o}>{o}</option>)}</Select>
          </div>
          <div>
            <Label htmlFor="ae-tone">Tone</Label>
            <Select id="ae-tone" value={form.tone} onChange={set('tone')}>{tones.map((o) => <option key={o}>{o}</option>)}</Select>
          </div>
          <div>
            <Label htmlFor="ae-lang">Language</Label>
            <Select id="ae-lang" value={form.language} onChange={set('language')}>{languages.map((o) => <option key={o}>{o}</option>)}</Select>
          </div>
          <div>
            <Label htmlFor="ae-cta" optional>Call to action</Label>
            <Input id="ae-cta" value={form.cta} onChange={set('cta')} placeholder={ctaFor[form.objective]} />
          </div>
        </div>
        <Button type="submit" size="lg" className="mt-2"><Sparkles className="h-5 w-5" aria-hidden="true" />Generate ads</Button>
        <p className="text-sm text-muted">Free accounts get 20 generations a month. <Link href="/pricing" className="font-semibold text-brand hover:underline">See plans</Link></p>
      </form>

      <div className="flex flex-col gap-4">
        <p className="flex items-start gap-2 rounded-2xl border border-warning/25 bg-warning-soft p-4 text-sm text-warning">
          <Info className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
          <span><strong>Preview mode.</strong> The AI model is not connected yet, so drafts are built from templates using your brief{form.language !== 'English' ? ` and are shown in English (${form.language} output arrives with the AI connection)` : ''}.</span>
        </p>

        <div className="flex-1 rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div role="tablist" aria-label="Output format" className="flex rounded-xl bg-mist p-1">
              {(['message', 'post'] as const).map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn('h-9 rounded-lg px-4 text-sm font-semibold', tab === t ? 'bg-white text-brand shadow-sm' : 'text-muted')}>
                  {t === 'message' ? 'Sponsored message (160)' : 'Channel post'}
                </button>
              ))}
            </div>
            {results && (
              <div className="flex gap-2">
                <button type="button" onClick={() => { const n = seed + 1; setSeed(n); generate(n); }} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-sm font-semibold text-ink-2 hover:border-brand hover:text-brand"><RefreshCw className="h-4 w-4" aria-hidden="true" />Regenerate</button>
                <Link href="/register?next=/ad-engine" className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand px-3 text-sm font-semibold text-white hover:bg-brand-600"><Save className="h-4 w-4" aria-hidden="true" />Save</Link>
              </div>
            )}
          </div>

          {!results ? (
            <div className="mt-6 flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line-2 bg-mist p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand shadow-sm"><Sparkles className="h-7 w-7" aria-hidden="true" /></span>
              <p className="font-display text-lg font-bold text-ink">Your ad variations appear here</p>
              <p className="max-w-sm text-[15px] text-muted">Fill in the brief and press Generate. You’ll get three angles to test, as sponsored messages and channel posts.</p>
            </div>
          ) : (
            <ul className="mt-6 flex flex-col gap-4" aria-live="polite">
              {results.map((v) => {
                const text = tab === 'message' ? v.message : v.post;
                return (
                  <li key={v.angle} className="rounded-2xl border border-line p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-tg-soft px-2.5 py-1 text-xs font-bold text-brand">{v.angle}</span>
                      {tab === 'message' && <span className={cn('text-xs font-semibold', text.length > 160 ? 'text-red-600' : 'text-muted')}>{text.length}/160</span>}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-muted">Headline: <span className="text-ink">{v.headline}</span></p>
                    <p className="mt-2 whitespace-pre-line text-[15px] text-ink">{text}</p>
                    <div className="mt-4 flex gap-2"><CopyButton text={text} /></div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {history.length > 1 && (
          <div className="rounded-3xl border border-line bg-white p-5">
            <p className="text-sm font-bold text-ink">This session’s history</p>
            <ul className="mt-2 divide-y divide-line text-sm">
              {history.slice(1).map((h, i) => (
                <li key={i} className="flex items-center justify-between py-2">
                  <span className="text-ink-2">{h.product}, {h.variants.length} variations</span>
                  <button type="button" onClick={() => setResults(h.variants)} className="font-semibold text-brand hover:underline">Show ({h.at})</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
