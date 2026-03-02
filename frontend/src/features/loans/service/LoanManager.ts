import { LoanRepository } from "./LoanRepository";
import type { ICreateLoanRequest, TLoanStatus } from "../types/Loan";

export const LoanManager = {
  getAll: (page = 0, size = 10, status?: TLoanStatus, userId?: number) =>
    LoanRepository.getAll(page, size, status, userId),

  getCount: (status?: TLoanStatus) => LoanRepository.getCount(status),
  
  getById: (id: number) => LoanRepository.getById(id),
  
  create: (data: ICreateLoanRequest) => LoanRepository.create(data),
  
  returnLoan: (id: number) => LoanRepository.returnLoan(id),
  
  remove: (id: number) => LoanRepository.remove(id),
};
