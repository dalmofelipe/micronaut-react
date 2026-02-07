import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { contentService } from './services';
import type { ICreateContentRequest, IMediaUploadResponse } from './types';

export const useContents = () => {
  return useQuery({
    queryKey: ['contents'],
    queryFn: contentService.getAll,
  });
};

export const useContent = (id: number) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: () => contentService.getById(id),
    enabled: !!id,
  });
};

export const useCreateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contentService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};

export const useUploadMedia = () => {
  return useMutation<IMediaUploadResponse, unknown, File>({
    mutationFn: (file: File) => contentService.uploadMedia(file),
  });
};

export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ICreateContentRequest> }) =>
      contentService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contentService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};