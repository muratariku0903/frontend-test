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

/** 作成時に送る値。タイトルと本文の両方が必須（ADR-014） */
export type CreateContentInput = {
  title: string;
  body: string;
};

/** 更新時に送る値。タイトルと本文は別々に編集するので、片方だけ送れる */
export type UpdateContentInput = {
  title?: string;
  body?: string;
};
