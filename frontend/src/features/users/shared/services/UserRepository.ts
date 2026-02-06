import api from "@/app/config/axios";
import type { IUser, ICreateUserRequest, IUpdateUserRequest } from "../types/User";
import type { IPagedResponse } from "@/shared/types";

export const getAll = async (page = 0, size = 10, search = ""): Promise<IPagedResponse<IUser>> => {
  const response = await api.get('/users', { params: { page, size, search } });
  return response.data;
};

export const getAllUnpaged = async (): Promise<IUser[]> => {
  const response = await api.get('/users', { params: { page: -1 } });
  return response.data;
};

export const getCount = async (): Promise<number> => {
  const response = await api.get('/users/count');
  return response.data;
};

export const getById = async (id: number): Promise<IUser> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const create = async (data: ICreateUserRequest): Promise<IUser> => {
  const response = await api.post('/users', data);
  return response.data;
};

export const update = async (id: number, data: IUpdateUserRequest): Promise<IUser> => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const toggleActive = async (id: number): Promise<IUser> => {
  const response = await api.patch(`/users/${id}/active`);
  return response.data;
};

export const remove = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
