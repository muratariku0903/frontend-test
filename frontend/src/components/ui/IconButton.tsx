import type { ComponentProps } from 'react';
import { Icon } from './Icon';

type Props = {
  /** SVG の URL */
  icon: string;
  label: string;
} & Omit<ComponentProps<'button'>, 'className' | 'children'>;

export const IconButton = ({
  icon,
  label,
  type = 'button',
  ...props
}: Props) => (
  <button
    type={type}
    aria-label={label}
    className="flex size-8 shrink-0 items-center justify-center rounded text-normal transition-colors focus-visible:outline-2 focus-visible:outline-primary enabled:hover:bg-black/10 enabled:active:bg-black/20 disabled:cursor-not-allowed disabled:opacity-30"
    {...props}
  >
    <Icon src={icon} />
  </button>
);
