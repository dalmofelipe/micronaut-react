import { useNotificationStore } from '@/shared/store/useNotificationStore';
import { useState } from 'react';
import { useCreateLoan, useDeleteLoan, useReturnLoan } from '../../shared/hooks/useLoans';
import type { ICreateLoanRequest, ILoan } from '../../shared/types/Loan';

export function useAdminLoans() {
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

  const handleCloseCreateDialog = () => {
    setFormOpen(false);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
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

  return {
    anchorEl,
    selectedLoan,
    formOpen,
    formData,
    deleteDialogOpen,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    handleMenuOpen,
    handleMenuClose,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleFormChange,
    handleFormSubmit,
    handleReturnLoan,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
  };
}
