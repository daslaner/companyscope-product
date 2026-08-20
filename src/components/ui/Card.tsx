import clsx from 'clsx';
import type { HTMLAttributes, PropsWithChildren } from 'react';
export function Card({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={clsx('rounded-[1.5rem] border border-[#ead8c4] bg-[#fffdf8] p-5 shadow-sm dark:border-[#4d2d43] dark:bg-[#171018]', className)} {...props}>{children}</div>;
}
