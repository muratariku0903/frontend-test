import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { contentApi } from './contentApi';
import type { Content, CreateContentInput, UpdateContentInput } from './types';

const contentKeys = {
  all: ['contents'] as const,
  list: () => [...contentKeys.all, 'list'] as const,
  detail: (id: number) => [...contentKeys.all, 'detail', id] as const,
};

/** コンテンツ一覧 */
export const useContents = () =>
  useSuspenseQuery({
    queryKey: contentKeys.list(),
    queryFn: contentApi.fetchAll,
  });

/** コンテンツ詳細 */
export const useContent = (id: number) =>
  useSuspenseQuery({
    queryKey: contentKeys.detail(id),
    queryFn: () => contentApi.fetchById(id),
  });

/** コンテンツ作成 */
export const useCreateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateContentInput) => contentApi.create(input),
    onSuccess: (content) => {
      queryClient.setQueryData(contentKeys.detail(content.id), content);
      return queryClient.invalidateQueries({ queryKey: contentKeys.list() });
    },
  });
};

/** コンテンツ更新 */
export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateContentInput }) =>
      contentApi.update(id, input),
    onSuccess: (content: Content | null, { id }) => {
      queryClient.setQueryData(contentKeys.detail(id), content);
      return queryClient.invalidateQueries({ queryKey: contentKeys.list() });
    },
  });
};

/** コンテンツ削除 */
export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => contentApi.remove(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: contentKeys.detail(id) });
      return queryClient.invalidateQueries({ queryKey: contentKeys.list() });
    },
  });
};
