import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useContents } from './api/queries';
import { Footer } from './components/layout/Footer';
import { Message } from './components/ui/Message';
import { MainArea } from './features/content/MainArea';
import { Sidebar } from './features/sidebar/Sidebar';

export const App = () => (
  <ErrorBoundary fallback={<PageMessage>取得に失敗しました</PageMessage>}>
    <Suspense fallback={<PageMessage>読み込み中…</PageMessage>}>
      <Workspace />
    </Suspense>
  </ErrorBoundary>
);

/** 一覧が取れている前提で、サイドバーとメインエリアを並べる */
const Workspace = () => {
  const { data: contents } = useContents();
  const [chosenId, setChosenId] = useState<number | null>(null);

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
      <MainArea selectedId={selectedId} />
      <Footer />
    </div>
  );
};

const PageMessage = ({ children }: { children: string }) => (
  <div className="grid h-dvh place-items-center">
    <Message>{children}</Message>
  </div>
);
