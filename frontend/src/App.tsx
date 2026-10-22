import { useState } from 'react';
import { useContents } from './api/queries';
import { Footer } from './components/layout/Footer';
import { MainArea } from './features/content/MainArea';
import { Sidebar } from './features/sidebar/Sidebar';

export const App = () => {
  const { data: contents = [] } = useContents();
  const [chosenId, setChosenId] = useState<number | null>(null);

  // 選んだ ID が一覧にあればそれを、なければ先頭を表示する（0 件なら null）
  const selectedId = contents.some((content) => content.id === chosenId)
    ? chosenId
    : (contents[0]?.id ?? null);

  return (
    <div className="grid h-dvh grid-cols-[280px_1fr] grid-rows-[1fr_60px]">
      <Sidebar
        contents={contents}
        selectedId={selectedId}
        onSelect={setChosenId}
      />
      <MainArea />
      <Footer />
    </div>
  );
};
