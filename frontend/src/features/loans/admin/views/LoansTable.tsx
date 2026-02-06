import { StatusChip } from '@/shared/components/StatusChip';
import { MoreVert } from '@mui/icons-material';
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useLoanFiltersStore } from '../../shared/store/useLoanFiltersStore';
import type { ILoan, TLoanStatus } from '../../shared/types/Loan';
import { FilterContainer } from './styles/AdminLoans.styled';

interface ILoansTableProps {
  loans: ILoan[];
  totalElements: number;
  isLoading: boolean;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, loan: ILoan) => void;
}

export function LoansTable({
  loans,
  totalElements,
  isLoading,
  onMenuOpen,
}: ILoansTableProps) {
  const filters = useLoanFiltersStore((state) => state.filters);
  const setPage = useLoanFiltersStore((state) => state.setPage);
  const setSize = useLoanFiltersStore((state) => state.setSize);
  const setStatus = useLoanFiltersStore((state) => state.setStatus);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    }

    if (!loans || loans.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            <Typography color="text.secondary">Nenhum empréstimo encontrado</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return loans.map((loan) => (
      <TableRow key={loan.id} hover>
        <TableCell>{loan.id}</TableCell>
        <TableCell>{loan.userId}</TableCell>
        <TableCell>{loan.bookId}</TableCell>
        <TableCell>{formatDate(loan.dataEmprestimo)}</TableCell>
        <TableCell>{formatDate(loan.dataPrevistaDevolucao)}</TableCell>
        <TableCell>
          <StatusChip status={loan.status} />
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={(e) => onMenuOpen(e, loan)}>
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <FilterContainer>
        <FormControl fullWidth>
          <InputLabel>Filtrar por Status</InputLabel>
          <Select
            value={filters.status || ''}
            onChange={(e) => setStatus(e.target.value as TLoanStatus | undefined)}
            label="Filtrar por Status"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="ATIVO">Ativo</MenuItem>
            <MenuItem value="DEVOLVIDO">Devolvido</MenuItem>
            <MenuItem value="ATRASADO">Atrasado</MenuItem>
          </Select>
        </FormControl>
      </FilterContainer>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ID Usuário</TableCell>
              <TableCell>ID Livro</TableCell>
              <TableCell>Data Empréstimo</TableCell>
              <TableCell>Data Prevista</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableContent()}</TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalElements}
        page={filters.page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={filters.size}
        onRowsPerPageChange={(e) => setSize(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </>
  );
}
