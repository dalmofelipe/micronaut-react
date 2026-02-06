import * as LoanRepository from './LoanRepository';
import type { ICreateLoanRequest, TLoanStatus } from '../types/Loan';

export const getAllLoans = async (page = 0, size = 10, search?: TLoanStatus, userId?: number) => {
  return LoanRepository.getAll(page, size, search, userId);
};

export const getCount = async (status?: TLoanStatus) => {
  return LoanRepository.getCount(status);
};

export const getLoanById = async (id: number) => {
  return LoanRepository.getById(id);
};

export const createLoan = async (data: ICreateLoanRequest) => {
  return LoanRepository.create(data);
};

export const returnLoan = async (id: number) => {
  return LoanRepository.returnLoan(id);
};

export const deleteLoan = async (id: number) => {
  return LoanRepository.remove(id);
};
