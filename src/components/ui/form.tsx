import { cn } from '@/lib/utils';

const field =
  'w-full rounded-xl border border-line-2 bg-white px-3.5 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand focus:outline-none focus:ring-4 focus:ring-tg/15 aria-[invalid=true]:border-red-500';

export function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
      {children} {optional && <span className="font-normal text-muted">(optional)</span>}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="mt-1.5 text-sm text-red-600">{message}</p>;
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(field, 'h-12', className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(field, 'min-h-32 py-3', className)} {...props} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(field, 'h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%235b6b88%27 stroke-width=%272%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] bg-[position:right_14px_center] bg-no-repeat pr-10', className)} {...props}>
      {children}
    </select>
  );
}
