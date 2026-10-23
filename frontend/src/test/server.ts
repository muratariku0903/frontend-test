import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import type {
  Content,
  CreateContentInput,
  UpdateContentInput,
} from '../api/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createContent = (id: number, title: string, body: string): Content => ({
  id,
  title,
  body,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
});

const initialContents = () => [
  createContent(
    1,
    '坊ちゃん',
    '親譲りの無鉄砲で小供の時から損ばかりしている。',
  ),
  createContent(
    2,
    '方丈記',
    'ゆく河の流れは絶えずして、しかももとの水にあらず。',
  ),
];

let contents = initialContents();

/** テストごとにデータを初期状態に戻す（更新したデータを次のテストに持ち越さない） */
export const resetContents = () => {
  contents = initialContents();
};

const findContent = (id: string | readonly string[] | undefined) =>
  contents.find((content) => content.id === Number(id));

// 実際のバックエンドの挙動に合わせる
// （存在しない ID の GET / PUT は 200 で中身が空、削除済みの DELETE は 500）
export const server = setupServer(
  http.get(`${BASE_URL}/content`, () => HttpResponse.json(contents)),

  http.get(`${BASE_URL}/content/:id`, ({ params }) => {
    const content = findContent(params.id);
    return content ? HttpResponse.json(content) : new HttpResponse(null);
  }),

  http.post(`${BASE_URL}/content`, async ({ request }) => {
    const input = (await request.json()) as CreateContentInput;
    const id = Math.max(0, ...contents.map((content) => content.id)) + 1;
    const content = createContent(id, input.title, input.body);
    contents = [...contents, content];
    return HttpResponse.json(content, { status: 201 });
  }),

  http.put(`${BASE_URL}/content/:id`, async ({ params, request }) => {
    const input = (await request.json()) as UpdateContentInput;
    contents = contents.map((content) =>
      content.id === Number(params.id) ? { ...content, ...input } : content,
    );
    const content = findContent(params.id);
    return content ? HttpResponse.json(content) : new HttpResponse(null);
  }),
  http.delete(`${BASE_URL}/content/:id`, ({ params }) => {
    const content = findContent(params.id);
    if (!content) return new HttpResponse(null, { status: 500 });
    contents = contents.filter(({ id }) => id !== content.id);
    return new HttpResponse(null, { status: 204 });
  }),
);
