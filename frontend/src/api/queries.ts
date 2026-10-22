import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contentApi } from './contentApi';
import type { Content, CreateContentInput, UpdateContentInput } from './types';

export const contentKeys = {
  all: ['contents'] as const,
  list: () => [...contentKeys.all, 'list'] as const,
  detail: (id: number) => [...contentKeys.all, 'detail', id] as const,
};

/** コンテンツ一覧 */
export const useContents = () =>
  useQuery({ queryKey: contentKeys.list(), queryFn: contentApi.fetchAll });

/** コンテンツ詳細 */
export const useContent = (id: number) =>
  useQuery({
    queryKey: contentKeys.detail(id),
    queryFn: () => contentApi.fetchById(id),
  });

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
