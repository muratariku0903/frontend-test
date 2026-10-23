import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useContent } from '../../api/queries';
import { Message } from '../../components/ui/Message';
import { EditableField } from './EditableField';

type Props = {
  selectedId: number | null;
};

export const MainArea = ({ selectedId }: Props) => (
  <main className="min-h-0 px-10 pt-[30px]">
    <div className="h-full rounded-2xl bg-bg-light p-[30px]">
      {selectedId === null ? (
        <Message>コンテンツがありません</Message>
      ) : (
        <ErrorBoundary
          key={selectedId}
          fallback={<Message>取得に失敗しました</Message>}
        >
          <Suspense fallback={<Message>読み込み中…</Message>}>
            <ContentView id={selectedId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  </main>
);

const ContentView = ({ id }: { id: number }) => {
  const { data: content } = useContent(id);

  if (content === null) return <Message>コンテンツが見つかりません</Message>;

  return (
    <div className="grid h-full grid-cols-[1fr_90px] grid-rows-[40px_1fr] gap-5">
      <EditableField contentId={id} name="title" value={content.title} />
      <EditableField contentId={id} name="body" value={content.body} />
    </div>
  );
};
