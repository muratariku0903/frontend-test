import { request } from './client';
import type { Content, CreateContentInput, UpdateContentInput } from './types';

// API のパス（/content）はこのファイルの中だけで扱う
export const contentApi = {
  fetchAll: () => request<Content[]>('/content'),

  /** 存在しない ID の場合は null */
  fetchById: (id: number) => request<Content | null>(`/content/${id}`),

  create: (input: CreateContentInput) =>
    request<Content>('/content', { method: 'POST', body: input }),

  /** 存在しない ID の場合は null */
  update: (id: number, input: UpdateContentInput) =>
    request<Content | null>(`/content/${id}`, { method: 'PUT', body: input }),

  remove: (id: number) => request<null>(`/content/${id}`, { method: 'DELETE' }),
};
