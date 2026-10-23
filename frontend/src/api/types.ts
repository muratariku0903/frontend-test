/** バックエンドの Content エンティティ */
export type Content = {
  id: number;
  /** テーブル定義上は null を許容している */
  title: string | null;
  /** テーブル定義上は null を許容している */
  body: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateContentInput = {
  title: string;
  body: string;
};

export type UpdateContentInput = {
  title?: string;
  body?: string;
};
