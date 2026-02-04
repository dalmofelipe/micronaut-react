import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loanService } from "../services/loanService";
import type { ICreateLoanRequest, TLoanStatus } from "../types";

export const useGetLoans = (page: number, size: number, status?: TLoanStatus, userId?: number) => {
  return useQuery({
    queryKey: ['loans', page, size, status, userId],
    queryFn: () => loanService.getAll(page, size, status, userId),
  });
};

export const useGetLoansCount = (status?: TLoanStatus) => {
  return useQuery({
    queryKey: ['loans-count', status],
    queryFn: () => loanService.getCount(status),
  });
};

export const useCreateLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateLoanRequest) => loanService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      queryClient.invalidateQueries({ queryKey: ['loans-count'] });
    },
  });
};

export const useReturnLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => loanService.returnLoan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      queryClient.invalidateQueries({ queryKey: ['loans-count'] });
    },
  });
};

export const useDeleteLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => loanService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      queryClient.invalidateQueries({ queryKey: ['loans-count'] });
    },
  });
};
