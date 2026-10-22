import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  /** 下部に並べるボタン */
  actions: ReactNode;
  children: ReactNode;
};

export const Dialog = ({ open, title, onClose, actions, children }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      className="m-auto w-[min(560px,calc(100%-32px))] rounded-2xl bg-bg-light p-[30px] text-text backdrop:bg-black/40"
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-5">{children}</div>
      <div className="mt-5 flex justify-end gap-2.5">{actions}</div>
    </dialog>
  );
};
