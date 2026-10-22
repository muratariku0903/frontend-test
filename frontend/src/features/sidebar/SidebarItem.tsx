import type { Content } from '../../api/types';

type Props = {
  content: Content;
  isSelected: boolean;
  onSelect: (id: number) => void;
};

export const SidebarItem = ({ content, isSelected, onSelect }: Props) => (
  <li>
    <button
      type="button"
      aria-current={isSelected}
      onClick={() => onSelect(content.id)}
      className="h-11 w-full truncate rounded px-2.5 text-left aria-current:bg-bg-light aria-current:font-bold aria-current:text-primary-strong"
    >
      {content.title ?? <span className="text-normal">無題</span>}
    </button>
  </li>
);
