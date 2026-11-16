import { site } from '@/data/site';

export type SubmitResult = { status: 'sent' } | { status: 'not-connected' } | { status: 'error'; message: string };

/**
 * Sends a form to the configured form service (Formspree, Web3Forms or any JSON endpoint).
 * Until NEXT_PUBLIC_FORM_ENDPOINT is set, returns "not-connected" so the UI can say so honestly
 * instead of pretending the message was delivered.
 */
export async function submitForm(formName: string, data: Record<string, string>): Promise<SubmitResult> {
  if (!site.formEndpoint) return { status: 'not-connected' };
  try {
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ form: formName, ...data, ...(site.web3formsKey ? { access_key: site.web3formsKey, subject: `TG Copilot: ${formName}` } : {}) }),
    });
    if (!res.ok) return { status: 'error', message: 'The form service did not accept the message. Please email us instead.' };
    return { status: 'sent' };
  } catch {
    return { status: 'error', message: 'Could not reach the form service. Check your connection or email us instead.' };
  }
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
