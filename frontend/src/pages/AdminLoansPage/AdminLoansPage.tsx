import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add,
  MoreVert,
  AssignmentReturn,
  Delete,
} from '@mui/icons-material';
import { useGetLoans, useCreateLoan, useReturnLoan, useDeleteLoan } from '../../hooks/useLoans';
import { useGetUsers } from '../../hooks/useUsers';
import { useGetBooks } from '../../hooks/useBooks';
import { useLoanFiltersStore } from '../../store/useLoanFiltersStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { StatusChip } from '../../components/StatusChip';
import { ConfirmDeleteDialog } from '../../components/ConfirmDeleteDialog';
import type { ILoan, ICreateLoanRequest, TLoanStatus } from '../../types';

export function AdminLoansPage() {
  const filters = useLoanFiltersStore((state) => state.filters);
  const setPage = useLoanFiltersStore((state) => state.setPage);
  const setSize = useLoanFiltersStore((state) => state.setSize);
  const setStatus = useLoanFiltersStore((state) => state.setStatus);

  const { data, isLoading } = useGetLoans(filters.page, filters.size, filters.status, filters.userId);
  const { data: usersData } = useGetUsers(0, 100, '');
  const { data: booksData } = useGetBooks(0, 100, '');
  const createMutation = useCreateLoan();
  const returnMutation = useReturnLoan();
  const deleteMutation = useDeleteLoan();
  const showNotification = useNotificationStore((state) => state.showNotification);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLoan, setSelectedLoan] = useState<ILoan | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ userId: '', bookId: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, loan: ILoan) => {
    setAnchorEl(event.currentTarget);
    setSelectedLoan(loan);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCreateDialog = () => {
    setFormData({ userId: '', bookId: '' });
    setFormOpen(true);
  };

  const handleFormSubmit = async () => {
    try {
      const request: ICreateLoanRequest = {
        userId: parseInt(formData.userId, 10),
        bookId: parseInt(formData.bookId, 10),
      };
      await createMutation.mutateAsync(request);
      showNotification('Empréstimo criado com sucesso!', 'success');
      setFormOpen(false);
    } catch (error: any) {
      showNotification(error.response?.data?.message || 'Erro ao criar empréstimo', 'error');
    }
  };

  const handleReturnLoan = async () => {
    if (selectedLoan) {
      try {
        await returnMutation.mutateAsync(selectedLoan.id);
        showNotification('Empréstimo devolvido com sucesso!', 'success');
      } catch (error) {
        showNotification('Erro ao devolver empréstimo', 'error');
      }
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (selectedLoan) {
      try {
        await deleteMutation.mutateAsync(selectedLoan.id);
        showNotification('Empréstimo deletado com sucesso!', 'success');
        setDeleteDialogOpen(false);
      } catch (error: any) {
        showNotification(error.response?.data?.message || 'Erro ao deletar empréstimo', 'error');
      }
    }
  };

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

    if (!data || data.content.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} align="center">
            <Typography color="text.secondary">Nenhum empréstimo encontrado</Typography>
          </TableCell>
        </TableRow>
      );
    }

    return data.content.map((loan) => (
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
          <IconButton onClick={(e) => handleMenuOpen(e, loan)}>
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Empréstimos
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreateDialog}>
          Novo Empréstimo
        </Button>
      </Box>

      <Paper>
        <Box p={2}>
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
        </Box>

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
          count={data?.totalElements || 0}
          page={filters.page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={filters.size}
          onRowsPerPageChange={(e) => setSize(parseInt(e.target.value, 10))}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {selectedLoan?.status === 'ATIVO' && (
          <MenuItem onClick={handleReturnLoan}>
            <ListItemIcon><AssignmentReturn fontSize="small" /></ListItemIcon>
            <ListItemText>Devolver</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon><Delete fontSize="small" /></ListItemIcon>
          <ListItemText>Deletar</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Novo Empréstimo</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <FormControl fullWidth required>
              <InputLabel>Usuário</InputLabel>
              <Select
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                label="Usuário"
              >
                {usersData?.content.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Livro</InputLabel>
              <Select
                value={formData.bookId}
                onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                label="Livro"
              >
                {booksData?.content.map((book) => (
                  <MenuItem key={book.id} value={book.id}>
                    {book.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancelar</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            Criar
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Deletar Empréstimo"
        message="Tem certeza que deseja deletar este empréstimo? Esta ação não pode ser desfeita."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialogOpen(false)}
        isLoading={deleteMutation.isPending}
      />
    </Box>
  );
}
