import api from "@/app/config/axios";
import type { IPagedResponse } from "@/shared/types";
import type { ICreateLoanRequest, ILoan, TLoanStatus } from "../types/Loan";

export const LoanRepository = {
  getAll: async (
    page = 0,
    size = 10,
    status?: TLoanStatus,
    userId?: number,
  ) : Promise<IPagedResponse<ILoan>> => {
    return (await api.get("/loans", { params: { page, size, status, userId } })).data;
  },

  getAllUnpaged: async (): Promise<ILoan[]> => {
    return (await api.get("/loans", { params: { page: -1 } })).data;
  },

  getCount: async (status?: TLoanStatus): Promise<number> => {
    return (await api.get("/loans/count", { params: { status } })).data;
  },

  getById: async (id: number): Promise<ILoan> => {
    return (await api.get(`/loans/${id}`)).data;
  },

  create: async (data: ICreateLoanRequest): Promise<ILoan> => {
    return (await api.post("/loans", data)).data;
  },

  returnLoan: async (id: number): Promise<ILoan> => {
    return (await api.patch(`/loans/${id}/return`)).data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/loans/${id}`);
  },
};
