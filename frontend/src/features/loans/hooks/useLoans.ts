import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as LoanManager from "../services/LoanManager";
import type { ICreateLoanRequest, TLoanStatus } from "../types/Loan";

export const useGetLoans = (page: number, size: number, status?: TLoanStatus, userId?: number) => {
  return useQuery({
    queryKey: ['loans', page, size, status, userId],
    queryFn: () => LoanManager.getAllLoans(page, size, status, userId),
  });
};

export const useGetLoansCount = (status?: TLoanStatus) => {
  return useQuery({
    queryKey: ['loans-count', status],
    queryFn: () => LoanManager.getCount(status), // Need to check if Manager has this
  });
};

export const useCreateLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateLoanRequest) => LoanManager.createLoan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      queryClient.invalidateQueries({ queryKey: ['loans-count'] });
    },
  });
};

export const useReturnLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => LoanManager.returnLoan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      queryClient.invalidateQueries({ queryKey: ['loans-count'] });
    },
  });
};

export const useDeleteLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => LoanManager.deleteLoan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      queryClient.invalidateQueries({ queryKey: ['loans-count'] });
    },
  });
};
