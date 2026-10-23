import { useState } from 'react';
import { useDeleteContent } from '../../api/queries';
import type { Content } from '../../api/types';
import doneIcon from '../../assets/icons/done.svg';
import editIcon from '../../assets/icons/edit.svg';
import logo from '../../assets/icons/logo.svg';
import plusIcon from '../../assets/icons/plus.svg';
import { Button } from '../../components/ui/Button';
import { CreateContentDialog } from './CreateContentDialog';
import { SidebarItem } from './SidebarItem';

type Props = {
  contents: Content[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export const Sidebar = ({ contents, selectedId, onSelect }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const deleteContent = useDeleteContent();

  return (
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
              isEditing={isEditing}
              onDelete={(id) => deleteContent.mutate(id)}
              isDeleting={deleteContent.isPending}
            />
          ))}
        </ul>
      </nav>

      <div
        className={`flex h-[60px] shrink-0 items-center bg-bg-light pr-2.5 pl-10 ${isEditing ? 'justify-between' : 'justify-end'}`}
      >
        {isEditing ? (
          <>
            <Button
              variant="secondary"
              icon={plusIcon}
              label="New page"
              onClick={() => setIsCreating(true)}
            />
            <Button
              variant="primary"
              icon={doneIcon}
              label="Done"
              onClick={() => setIsEditing(false)}
            />
          </>
        ) : (
          <Button
            variant="primary"
            icon={editIcon}
            label="Edit"
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>

      {isCreating && (
        <CreateContentDialog
          onCreated={(id) => {
            onSelect(id);
            setIsCreating(false);
            setIsEditing(false);
          }}
          onClose={() => setIsCreating(false)}
        />
      )}
    </aside>
  );
};
