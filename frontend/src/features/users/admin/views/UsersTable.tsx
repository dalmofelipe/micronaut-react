import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import type { IUser } from '../../shared/types/User';

interface UsersTableProps {
  data?: {
    content: IUser[];
    totalElements: number;
  };
  isLoading: boolean;
  page: number;
  size: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newSize: number) => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, user: IUser) => void;
}

export function UsersTable({
  data,
  isLoading,
  page,
  size,
  onPageChange,
  onRowsPerPageChange,
  onMenuOpen,
}: UsersTableProps) {
  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={5} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    }

    if (!data || data.content.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} align="center">
            <Typography color="text.secondary">Nenhum usuário encontrado</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return data.content.map((user) => (
      <TableRow key={user.id} hover>
        <TableCell>{user.id}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <Chip
            label={user.active ? 'Ativo' : 'Inativo'}
            color={user.active ? 'success' : 'default'}
            size="small"
          />
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={(e) => onMenuOpen(e, user)}>
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableContent()}</TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data?.totalElements || 0}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={size}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </>
  );
}
