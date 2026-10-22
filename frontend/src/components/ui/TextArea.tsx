import type { ComponentProps } from 'react';

type Props = {
  error?: string;
} & Omit<ComponentProps<'textarea'>, 'className'>;

/** 複数行の入力欄（本文用）。高さは親の要素いっぱいに広がる */
export const TextArea = ({ error, ...props }: Props) => (
  <div className="flex h-full min-h-0 flex-col gap-1">
    <textarea
      aria-invalid={error !== undefined}
      className="scrollbar-design min-h-0 w-full flex-1 resize-none rounded-lg border border-primary bg-white py-[26px] pr-[14px] pl-[30px] leading-6 outline-none aria-invalid:border-error"
      {...props}
    />
    {error && <p className="text-xs text-error">{error}</p>}
  </div>
);
