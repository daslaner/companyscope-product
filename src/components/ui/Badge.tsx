import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type Tone = 'neutral' | 'positive' | 'warning' | 'danger' | 'accent';

export function Badge({ children, tone = 'neutral' }: PropsWithChildren<{ tone?: Tone }>) {
  return (
    <span
      className={clsx('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold', {
        'bg-[#f5e5cc] text-[#72501f] dark:bg-[#3a2226] dark:text-[#f0c7a8]': tone === 'neutral',
        'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200':
          tone === 'positive',
        'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200': tone === 'warning',
        'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200': tone === 'danger',
        'bg-[#f3dce8] text-[#6f2f55] dark:bg-[#3b1c31] dark:text-[#efb6d5]': tone === 'accent',
      })}
    >
      {children}
    </span>
  );
}
