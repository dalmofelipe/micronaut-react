import api from "../config/axios";
import type { ILoan, ICreateLoanRequest, IPagedResponse, TLoanStatus } from "../types";

export const loanService = {
  getAll: async (page = 0, size = 10, status?: TLoanStatus, userId?: number): Promise<IPagedResponse<ILoan>> => {
    const response = await api.get('/loans', { params: { page, size, status, userId } });
    return response.data;
  },

  getAllUnpaged: async (): Promise<ILoan[]> => {
    const response = await api.get('/loans', { params: { page: -1 } });
    return response.data;
  },

  getCount: async (status?: TLoanStatus): Promise<number> => {
    const response = await api.get('/loans/count', { params: { status } });
    return response.data;
  },

  getById: async (id: number): Promise<ILoan> => {
    const response = await api.get(`/loans/${id}`);
    return response.data;
  },

  create: async (data: ICreateLoanRequest): Promise<ILoan> => {
    const response = await api.post('/loans', data);
    return response.data;
  },

  returnLoan: async (id: number): Promise<ILoan> => {
    const response = await api.patch(`/loans/${id}/return`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/loans/${id}`);
  },
};
