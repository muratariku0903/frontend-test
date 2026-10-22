import type { ComponentProps } from 'react';
import { Icon } from './Icon';

const variants = {
  /** Edit / Save */
  primary:
    'bg-primary text-white enabled:hover:bg-primary-hover enabled:active:bg-primary-active',
  /** Done / New page */
  secondary:
    'border-2 border-primary bg-white text-primary enabled:hover:bg-secondary-hover enabled:active:bg-normal',
  /** Cancel */
  normal:
    'bg-normal text-white enabled:hover:bg-normal-hover enabled:active:bg-normal-active',
} as const;

const sizes = {
  default: 'w-[90px]',
  compact: 'w-10',
} as const;

type Props = {
  variant: keyof typeof variants;
  /** SVG の URL */
  icon: string;
  label: string;
  size?: keyof typeof sizes;
} & Omit<ComponentProps<'button'>, 'className' | 'children'>;

export const Button = ({
  variant,
  icon,
  label,
  size = 'default',
  type = 'button',
  ...props
}: Props) => (
  <button
    type={type}
    className={`flex h-10 shrink-0 flex-col items-center justify-center rounded text-[10px] leading-none font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-30 ${variants[variant]} ${sizes[size]}`}
    {...props}
  >
    <Icon src={icon} />
    {label}
  </button>
);
