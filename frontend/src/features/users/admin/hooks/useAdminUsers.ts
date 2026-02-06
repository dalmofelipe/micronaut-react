import { useNotificationStore } from '@/shared/store/useNotificationStore';
import { useState } from 'react';
import { useCreateUser, useDeleteUser, useGetUsers, useToggleUserActive, useUpdateUser } from '../../shared/hooks/useUsers';
import { useUserFiltersStore } from '../../shared/store/useUserFiltersStore';
import type { ICreateUserRequest, IUpdateUserRequest, IUser } from '../../shared/types/User';

export function useAdminUsers() {
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
      setFormOpen(true);
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

  return {
    filters,
    setPage,
    setSize,
    setSearch,
    data,
    isLoading,
    createMutation,
    updateMutation,
    toggleActiveMutation,
    deleteMutation,
    anchorEl,
    selectedUser,
    formOpen,
    setFormOpen,
    formData,
    setFormData,
    deleteDialogOpen,
    setDeleteDialogOpen,
    isEditing,
    handleMenuOpen,
    handleMenuClose,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleFormSubmit,
    handleToggleActive,
    handleDeleteClick,
    handleDeleteConfirm,
  };
}
