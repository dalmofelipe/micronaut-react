import { useQuery } from '@tanstack/react-query';
import * as ContentManager from '@/features/content/service/ContentManager';

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const allContents = await ContentManager.getAllContents();
      return allContents.filter((content) => content.status === 'publicado');
    },
  });
};

export const useBlogPost = (id: number) => {
  return useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => ContentManager.getContentById(id),
    enabled: !!id,
  });
};
