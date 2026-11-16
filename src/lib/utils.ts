import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US', { notation: n >= 10_000 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(n);
}

export function formatPrice(minor: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(minor / 100);
}
