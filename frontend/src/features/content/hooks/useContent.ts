import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as ContentManager from '../service/ContentManager';
import type { ICreateContentRequest, IMediaUploadResponse } from '../types/Content';

export const useContents = () => {
  return useQuery({
    queryKey: ['contents'],
    queryFn: () => ContentManager.getAllContents(),
  });
};

export const useContent = (id: number) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: () => ContentManager.getContentById(id),
    enabled: !!id,
  });
};

export const useCreateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ContentManager.createContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};

export const useUploadMedia = () => {
  return useMutation<IMediaUploadResponse, unknown, File>({
    mutationFn: ContentManager.uploadMedia,
  });
};

export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ICreateContentRequest> }) =>
      ContentManager.updateContent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ContentManager.deleteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
};