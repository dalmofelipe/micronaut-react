import api from '@/app/config/axios';
import type { IContent, ICreateContentRequest, IMediaUploadResponse } from './types';

export const contentService = {
  getAll: async (): Promise<IContent[]> => {
    const response = await api.get('/contents');
    return response.data;
  },

  getById: async (id: number): Promise<IContent> => {
    const response = await api.get(`/contents/${id}`);
    return response.data;
  },

  create: async (data: ICreateContentRequest): Promise<IContent> => {
    const response = await api.post('/contents', data);
    return response.data;
  },

  update: async (id: number, data: Partial<ICreateContentRequest>): Promise<IContent> => {
    const response = await api.put(`/contents/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/contents/${id}`);
  },

  uploadMedia: async (file: File): Promise<IMediaUploadResponse> => {
    const fd = new FormData();
    fd.append('file', file);
    const response = await api.post('/media', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data;
  },
};