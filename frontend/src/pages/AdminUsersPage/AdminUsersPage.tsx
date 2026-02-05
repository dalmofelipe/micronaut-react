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
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  ToggleOn,
  ToggleOff,
} from '@mui/icons-material';
import { useGetUsers, useCreateUser, useUpdateUser, useToggleUserActive, useDeleteUser } from '../../hooks/useUsers';
import { useUserFiltersStore } from '../../store/useUserFiltersStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { ConfirmDeleteDialog } from '../../components/ConfirmDeleteDialog';
import type { IUser, ICreateUserRequest, IUpdateUserRequest } from '../../types';

export function AdminUsersPage() {
  const filters = useUserFiltersStore((state) => state.filters);
  const setPage = useUserFiltersStore((state) => state.setPage);
  const setSize = useUserFiltersStore((state) => state.setSize);
  const setSearch = useUserFiltersStore((state) => state.setSearch);

  const { data, isLoading } = useGetUsers(filters.page, filters.size, filters.search);
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const toggleActiveMutation = useToggleUserActive();
  const deleteMutation = useDeleteUser();
  const showNotification = useNotificationStore((state) => state.showNotification);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', active: true });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: IUser) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCreateDialog = () => {
    setFormData({ name: '', email: '', active: true });
    setIsEditing(false);
    setFormOpen(true);
  };

  const handleOpenEditDialog = () => {
    if (selectedUser) {
      setFormData({ name: selectedUser.name, email: selectedUser.email, active: selectedUser.active });
      setIsEditing(true);
      setFormOpen(true);
    }
    handleMenuClose();
  };

  const handleFormSubmit = async () => {
    try {
      if (isEditing && selectedUser) {
        await updateMutation.mutateAsync({ id: selectedUser.id, data: formData as IUpdateUserRequest });
        showNotification('Usuário atualizado com sucesso!', 'success');
      } else {
        await createMutation.mutateAsync(formData as ICreateUserRequest);
        showNotification('Usuário criado com sucesso!', 'success');
      }
      setFormOpen(false);
    } catch (error) {
      showNotification('Erro ao salvar usuário', 'error');
    }
  };

  const handleToggleActive = async () => {
    if (selectedUser) {
      try {
        await toggleActiveMutation.mutateAsync(selectedUser.id);
        showNotification('Status atualizado com sucesso!', 'success');
      } catch (error) {
        showNotification('Erro ao atualizar status', 'error');
      }
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      try {
        await deleteMutation.mutateAsync(selectedUser.id);
        showNotification('Usuário deletado com sucesso!', 'success');
        setDeleteDialogOpen(false);
      } catch (error: any) {
        showNotification(error.response?.data?.message || 'Erro ao deletar usuário', 'error');
      }
    }
  };

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
          <IconButton onClick={(e) => handleMenuOpen(e, user)}>
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
          Usuários
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreateDialog}>
          Novo Usuário
        </Button>
      </Box>

      <Paper>
        <Box p={2}>
          <TextField
            fullWidth
            placeholder="Buscar por nome ou email..."
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

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
          page={filters.page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={filters.size}
          onRowsPerPageChange={(e) => setSize(parseInt(e.target.value, 10))}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleOpenEditDialog}>
          <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleToggleActive}>
          <ListItemIcon>
            {selectedUser?.active ? <ToggleOff fontSize="small" /> : <ToggleOn fontSize="small" />}
          </ListItemIcon>
          <ListItemText>{selectedUser?.active ? 'Desativar' : 'Ativar'}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon><Delete fontSize="small" /></ListItemIcon>
          <ListItemText>Deletar</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancelar</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            {isEditing ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Deletar Usuário"
        message={`Tem certeza que deseja deletar o usuário "${selectedUser?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialogOpen(false)}
        isLoading={deleteMutation.isPending}
      />
    </Box>
  );
}
