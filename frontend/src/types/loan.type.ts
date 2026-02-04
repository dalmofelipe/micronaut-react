export type TLoanStatus = 'ATIVO' | 'DEVOLVIDO' | 'ATRASADO';

export interface ILoan {
  id: number;
  userId: number;
  bookId: number;
  dataEmprestimo: string;
  dataPrevistaDevolucao: string;
  dataRealDevolucao?: string;
  status: TLoanStatus;
}

export interface ILoanFilters {
  page: number;
  size: number;
  status?: TLoanStatus;
  userId?: number;
}

export interface ICreateLoanRequest {
  userId: number;
  bookId: number;
  dataPrevistaDevolucao?: string;
}
