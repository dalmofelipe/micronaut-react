import api from "../config/axios";
import type { IUser, ICreateUserRequest, IUpdateUserRequest, IPagedResponse } from "../types";

export const userService = {
  getAll: async (page = 0, size = 10, search = ""): Promise<IPagedResponse<IUser>> => {
    const response = await api.get('/users', { params: { page, size, search } });
    return response.data;
  },

  getAllUnpaged: async (): Promise<IUser[]> => {
    const response = await api.get('/users', { params: { page: -1 } });
    return response.data;
  },

  getCount: async (): Promise<number> => {
    const response = await api.get('/users/count');
    return response.data;
  },

  getById: async (id: number): Promise<IUser> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (data: ICreateUserRequest): Promise<IUser> => {
    const response = await api.post('/users', data);
    return response.data;
  },

  update: async (id: number, data: IUpdateUserRequest): Promise<IUser> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  toggleActive: async (id: number): Promise<IUser> => {
    const response = await api.patch(`/users/${id}/active`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
