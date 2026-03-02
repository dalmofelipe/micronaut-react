import api from "@/app/config/axios";
import type { IPagedResponse } from "@/shared/types";
import type { ICreateUserRequest, IUpdateUserRequest, IUser } from "../types/User";

export const UserRepository = {
  getAll: async (page = 0, size = 10, search = ""): Promise<IPagedResponse<IUser>> => {
    return (await api.get('/users', { params: { page, size, search } })).data;
  },

  getAllUnpaged: async (): Promise<IUser[]> => {
    return (await api.get('/users', { params: { page: -1 } })).data;
  },

  getCount: async (): Promise<number> => {
    return (await api.get('/users/count')).data;
  },

  getById: async (id: number): Promise<IUser> => {
    return (await api.get(`/users/${id}`)).data;
  },

  create: async (data: ICreateUserRequest): Promise<IUser> => {
    return (await api.post('/users', data)).data;
  },

  update: async (id: number, data: IUpdateUserRequest): Promise<IUser> => {
    return (await api.put(`/users/${id}`, data)).data;
  },

  toggleActive: async (id: number): Promise<IUser> => {
    return (await api.patch(`/users/${id}/active`)).data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
