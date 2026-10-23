import { z } from 'zod';

/** コンテンツの入力チェック。作成ダイアログとメインエリアの編集で使う */
export const contentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'タイトルは1文字以上で入力してください')
    .max(50, 'タイトルは50文字以内で入力してください'),
  body: z
    .string()
    .trim()
    .min(10, '本文は10文字以上で入力してください')
    .max(2000, '本文は2000文字以内で入力してください'),
});
