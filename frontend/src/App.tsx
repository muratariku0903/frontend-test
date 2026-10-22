import { useState } from 'react';
import cancelIcon from './assets/icons/cancel.svg';
import deleteIcon from './assets/icons/delete.svg';
import doneIcon from './assets/icons/done.svg';
import editIcon from './assets/icons/edit.svg';
import plusIcon from './assets/icons/plus.svg';
import saveIcon from './assets/icons/save.svg';
import { Button } from './components/ui/Button';
import { Dialog } from './components/ui/Dialog';
import { IconButton } from './components/ui/IconButton';
import { TextArea } from './components/ui/TextArea';
import { TextField } from './components/ui/TextField';

// Phase 3 の見た目確認用の部品一覧。Phase 4 でレイアウトに置き換える。
export const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <main className="flex flex-col gap-8 p-8">
      <h1 className="text-2xl font-bold">ServiceName</h1>

      <section className="flex flex-col gap-4">
        <h2 className="font-bold">Button</h2>
        <div className="flex gap-2.5">
          <Button variant="primary" icon={editIcon} label="Edit" />
          <Button variant="secondary" icon={doneIcon} label="Done" />
          <Button variant="secondary" icon={plusIcon} label="New page" />
          <Button variant="normal" icon={cancelIcon} label="Cancel" />
        </div>
        <div className="flex gap-2.5">
          <Button
            variant="normal"
            size="compact"
            icon={cancelIcon}
            label="Cancel"
          />
          <Button
            variant="primary"
            size="compact"
            icon={saveIcon}
            label="Save"
          />
        </div>
        <div className="flex gap-2.5">
          <Button variant="primary" icon={editIcon} label="Edit" disabled />
          <Button variant="secondary" icon={doneIcon} label="Done" disabled />
          <Button variant="normal" icon={cancelIcon} label="Cancel" disabled />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-bold">IconButton</h2>
        <div className="flex gap-2.5">
          <IconButton icon={deleteIcon} label="削除" />
          <IconButton icon={deleteIcon} label="削除" disabled />
        </div>
      </section>

      <section className="flex max-w-3xl flex-col gap-4 bg-bg-light p-8">
        <h2 className="font-bold">TextField / TextArea</h2>
        <TextField defaultValue="坊ちゃん" aria-label="タイトル" />
        <TextField
          defaultValue=""
          aria-label="タイトル"
          error="タイトルは1文字以上で入力してください"
        />
        <div className="h-48">
          <TextArea
            defaultValue="親譲りの無鉄砲で小供の時から損ばかりしている。"
            aria-label="本文"
          />
        </div>
        <div className="h-48">
          <TextArea
            defaultValue="短い"
            aria-label="本文"
            error="本文は10文字以上で入力してください"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-bold">Dialog</h2>
        <div>
          <Button
            variant="primary"
            icon={editIcon}
            label="Open"
            onClick={() => setIsDialogOpen(true)}
          />
        </div>
        <Dialog
          open={isDialogOpen}
          title="コンテンツを削除"
          onClose={() => setIsDialogOpen(false)}
          actions={
            <>
              <Button
                variant="normal"
                size="compact"
                icon={cancelIcon}
                label="Cancel"
                onClick={() => setIsDialogOpen(false)}
              />
              <Button
                variant="primary"
                size="compact"
                icon={deleteIcon}
                label="Delete"
                onClick={() => setIsDialogOpen(false)}
              />
            </>
          }
        >
          「坊ちゃん」を削除しますか？
        </Dialog>
      </section>
    </main>
  );
};
