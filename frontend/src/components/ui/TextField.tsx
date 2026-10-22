import type { ComponentProps } from 'react';

type Props = {
  error?: string;
} & Omit<ComponentProps<'input'>, 'className'>;

/** 1 行の入力欄（タイトル用） */
export const TextField = ({ error, ...props }: Props) => (
  <div className="flex flex-col gap-1">
    <input
      type="text"
      aria-invalid={error !== undefined}
      className="h-10 w-full rounded-lg border border-primary bg-white px-[30px] text-2xl font-bold outline-none aria-invalid:border-error"
      {...props}
    />
    {error && <p className="text-xs text-error">{error}</p>}
  </div>
);
