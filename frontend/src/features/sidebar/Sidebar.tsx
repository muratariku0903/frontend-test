import type { Content } from '../../api/types';
import editIcon from '../../assets/icons/edit.svg';
import logo from '../../assets/icons/logo.svg';
import { Button } from '../../components/ui/Button';
import { SidebarItem } from './SidebarItem';

type Props = {
  contents: Content[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export const Sidebar = ({ contents, selectedId, onSelect }: Props) => (
  <aside className="row-span-2 flex min-h-0 flex-col border-r border-bg-light">
    <div className="flex items-center gap-1 px-10 pt-[30px]">
      <img src={logo} alt="" className="size-8" />
      <span className="text-2xl font-bold">ServiceName</span>
    </div>

    <nav className="mt-5 min-h-0 flex-1 overflow-y-auto pl-10">
      <ul>
        {contents.map((content) => (
          <SidebarItem
            key={content.id}
            content={content}
            isSelected={content.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </nav>

    <div className="flex h-[60px] shrink-0 items-center justify-end bg-bg-light px-2.5">
      <Button variant="primary" icon={editIcon} label="Edit" />
    </div>
  </aside>
);
