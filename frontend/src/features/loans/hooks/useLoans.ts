import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoanManager } from "../service/LoanManager";
import type { ICreateLoanRequest, TLoanStatus } from "../types/Loan";

export const useGetLoans = (
  page: number,
  size: number,
  status?: TLoanStatus,
  userId?: number,
) => {
  return useQuery({
    queryKey: ["loans", page, size, status, userId],
    queryFn: () => LoanManager.getAll(page, size, status, userId),
  });
};

export const useGetLoansCount = (status?: TLoanStatus) => {
  return useQuery({
    queryKey: ["loans-count", status],
    queryFn: () => LoanManager.getCount(status),
  });
};

export const useCreateLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateLoanRequest) => LoanManager.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      queryClient.invalidateQueries({ queryKey: ["loans-count"] });
    },
  });
};

export const useReturnLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => LoanManager.returnLoan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      queryClient.invalidateQueries({ queryKey: ["loans-count"] });
    },
  });
};

export const useDeleteLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => LoanManager.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      queryClient.invalidateQueries({ queryKey: ["loans-count"] });
    },
  });
};
