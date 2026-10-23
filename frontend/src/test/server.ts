import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import type { Content } from '../api/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createContent = (id: number, title: string, body: string): Content => ({
  id,
  title,
  body,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
});

const contents = [
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

// 実際のバックエンドの挙動に合わせる（存在しない ID の GET は 200 で中身が空）
export const server = setupServer(
  http.get(`${BASE_URL}/content`, () => HttpResponse.json(contents)),

  http.get(`${BASE_URL}/content/:id`, ({ params }) => {
    const content = contents.find(({ id }) => id === Number(params.id));
    return content ? HttpResponse.json(content) : new HttpResponse(null);
  }),
);
