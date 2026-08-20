import clsx from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' }>;
export function Button({ variant = 'primary', className, children, ...props }: Props) {
  return <button className={clsx('inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition duration-150 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50', variant === 'primary' && 'bg-[#5f2548] text-white shadow-sm hover:bg-[#4d1d3a]', variant === 'secondary' && 'border border-[#dcc5ad] bg-[#fffdf8] text-[#3d2932] hover:bg-[#fff1dc] dark:border-[#5b394a] dark:bg-[#21141c] dark:text-white dark:hover:bg-[#2c1a25]', variant === 'ghost' && 'text-[#725c64] hover:bg-[#fff1dc] dark:text-[#d7c5cd] dark:hover:bg-[#2c1a25]', variant === 'danger' && 'bg-[#a63d3d] text-white hover:bg-[#8d3030]', className)} {...props}>{children}</button>;
}
