import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'white' | 'tg';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-600 shadow-[0_8px_20px_-8px_rgb(22_115_196/0.6)]',
  secondary: 'bg-white text-ink border border-line-2 hover:border-brand hover:text-brand',
  ghost: 'text-ink hover:bg-sky',
  white: 'bg-white text-brand hover:bg-sky shadow-[0_10px_30px_-12px_rgb(15_35_71/0.4)]',
  tg: 'bg-tg text-white hover:brightness-95',
};
const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[15px] rounded-[10px]',
  md: 'h-12 px-5 text-base rounded-xl',
  lg: 'h-14 px-7 text-[17px] rounded-[14px]',
};

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-colors duration-150 disabled:opacity-60 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    className,
  );
}

type Common = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

export function ButtonLink({ href, variant, size, className, children, ...rest }: Common & { href: string } & Omit<React.ComponentProps<typeof Link>, 'href' | 'className'>) {
  const external = /^https?:\/\//.test(href) || href.startsWith('mailto:');
  if (external) {
    return (
      <a href={href} className={buttonClass(variant, size, className)} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, children, ...rest }: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
