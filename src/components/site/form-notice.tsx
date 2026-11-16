import { CircleCheck, Info, TriangleAlert } from 'lucide-react';
import { site } from '@/data/site';
import type { SubmitResult } from '@/lib/forms';

export function FormNotice({ result, sentText = 'Thanks! Your message was sent. We usually reply within one working day.' }: { result: SubmitResult | null; sentText?: string }) {
  if (!result) return null;
  if (result.status === 'sent')
    return (
      <p role="status" className="flex items-start gap-2 rounded-xl bg-success-soft p-3 text-sm text-success">
        <CircleCheck className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />{sentText}
      </p>
    );
  if (result.status === 'not-connected')
    return (
      <p role="status" className="flex items-start gap-2 rounded-xl bg-warning-soft p-3 text-sm text-warning">
        <Info className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
        <span>Online forms are not connected yet, so this message was not sent. Please email <a className="font-semibold underline" href={`mailto:${site.email}`}>{site.email}</a> or message <a className="font-semibold underline" href={`https://t.me/${site.telegram}`}>@{site.telegram}</a> on Telegram.</span>
      </p>
    );
  return (
    <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
      <TriangleAlert className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />{result.message}
    </p>
  );
}
