import api from "@/app/config/axios";
import type { ILoan, ICreateLoanRequest, TLoanStatus } from "../types/Loan";
import type { IPagedResponse } from "@/shared/types";

export const getAll = async (page = 0, size = 10, status?: TLoanStatus, userId?: number): Promise<IPagedResponse<ILoan>> => {
  const response = await api.get('/loans', { params: { page, size, status, userId } });
  return response.data;
};

export const getAllUnpaged = async (): Promise<ILoan[]> => {
  const response = await api.get('/loans', { params: { page: -1 } });
  return response.data;
};

export const getCount = async (status?: TLoanStatus): Promise<number> => {
  const response = await api.get('/loans/count', { params: { status } });
  return response.data;
};

export const getById = async (id: number): Promise<ILoan> => {
  const response = await api.get(`/loans/${id}`);
  return response.data;
};

export const create = async (data: ICreateLoanRequest): Promise<ILoan> => {
  const response = await api.post('/loans', data);
  return response.data;
};

export const returnLoan = async (id: number): Promise<ILoan> => {
  const response = await api.patch(`/loans/${id}/return`);
  return response.data;
};

export const remove = async (id: number): Promise<void> => {
  await api.delete(`/loans/${id}`);
};
