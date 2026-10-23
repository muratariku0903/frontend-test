import type { Content } from '../../api/types';
import deleteIcon from '../../assets/icons/delete.svg';
import { IconButton } from '../../components/ui/IconButton';

type Props = {
  content: Content;
  isSelected: boolean;
  onSelect: (id: number) => void;
  isEditing: boolean;
  onDelete: (id: number) => void;
  isDeleting: boolean;
};

export const SidebarItem = ({
  content,
  isSelected,
  onSelect,
  isEditing,
  onDelete,
  isDeleting,
}: Props) => (
  <li
    className={`flex h-11 items-center rounded pr-1.5 ${isSelected ? 'bg-bg-light' : ''}`}
  >
    <button
      type="button"
      aria-current={isSelected}
      onClick={() => onSelect(content.id)}
      className="h-full min-w-0 flex-1 truncate px-2.5 text-left aria-current:font-bold aria-current:text-primary-strong"
    >
      {content.title}
    </button>
    {isEditing && (
      <IconButton
        icon={deleteIcon}
        label={`${content.title ?? ''}を削除`}
        onClick={() => onDelete(content.id)}
        disabled={isDeleting}
      />
    )}
  </li>
);
