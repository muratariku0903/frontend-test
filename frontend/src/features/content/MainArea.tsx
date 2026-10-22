import { useContent } from '../../api/queries';

type Props = {
  selectedId: number | null;
};

export const MainArea = ({ selectedId }: Props) => (
  <main className="min-h-0 px-10 pt-[30px]">
    <div className="h-full rounded-2xl bg-bg-light p-[30px]">
      {selectedId === null ? (
        <Message>コンテンツがありません</Message>
      ) : (
        <ContentView id={selectedId} />
      )}
    </div>
  </main>
);

const ContentView = ({ id }: { id: number }) => {
  const { data: content, isPending, isError } = useContent(id);

  // 読み込み中・エラーの表示は あとで で実装する
  if (isPending) return null;
  if (isError) return null;
  if (content === null) return <Message>コンテンツが見つかりません</Message>;

  return (
    <div className="grid h-full grid-cols-[1fr_90px] grid-rows-[40px_1fr] gap-5">
      <h1 className="col-start-1 truncate px-[30px] text-2xl leading-10 font-bold">
        {content.title}
      </h1>
      <div className="scrollbar-design col-start-1 min-h-0 overflow-y-auto rounded-lg bg-white py-[26px] pr-[14px] pl-[30px] leading-6 whitespace-pre-wrap">
        {content.body}
      </div>
    </div>
  );
};

const Message = ({ children }: { children: string }) => (
  <p className="text-text-light">{children}</p>
);
