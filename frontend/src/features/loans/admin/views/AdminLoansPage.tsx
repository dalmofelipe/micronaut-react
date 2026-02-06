import { useGetBooks } from '@/features/books/shared/hooks/useBooks';
import { useGetUsers } from '@/features/users/shared/hooks/useUsers';
import { ConfirmDeleteDialog } from '@/shared/components/ConfirmDeleteDialog';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useGetLoans } from '../../shared/hooks/useLoans';
import { useLoanFiltersStore } from '../../shared/store/useLoanFiltersStore';
import { useAdminLoans } from '../hooks/useAdminLoans';

import { LoanActionsMenu } from './LoanActionsMenu';
import { LoanFormDialog } from './LoanFormDialog';
import { LoansTable } from './LoansTable';
import { PageHeader, PageTitle, StyledPaper } from './styles/AdminLoans.styled';

export function AdminLoansPage() {
  const filters = useLoanFiltersStore((state) => state.filters);
  const { data, isLoading } =
    useGetLoans(filters.page, filters.size, filters.status, filters.userId);
  const { data: usersData } = useGetUsers(0, 100, '');
  const { data: booksData } = useGetBooks(0, 100, '');

  const {
    anchorEl,
    selectedLoan,
    formOpen,
    formData,
    deleteDialogOpen,
    isCreating,
    isDeleting,
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
  } = useAdminLoans();

  return (
    <>
      <PageHeader>
        <PageTitle variant="h4">Empréstimos</PageTitle>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenCreateDialog}
        >
          Novo Empréstimo
        </Button>
      </PageHeader>

      <StyledPaper>
        <LoansTable
          loans={data?.content || []}
          totalElements={data?.totalElements || 0}
          isLoading={isLoading}
          onMenuOpen={handleMenuOpen}
        />
      </StyledPaper>

      <LoanActionsMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        selectedLoan={selectedLoan}
        onReturn={handleReturnLoan}
        onDeleteClick={handleDeleteClick}
      />

      <LoanFormDialog
        open={formOpen}
        onClose={handleCloseCreateDialog}
        onSubmit={handleFormSubmit}
        formData={formData}
        onChange={handleFormChange}
        users={usersData?.content || []}
        books={booksData?.content || []}
        isLoading={isCreating}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Deletar Empréstimo"
        message="Tem certeza que deseja deletar este empréstimo? Esta ação não pode ser desfeita."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={isDeleting}
      />
    </>
  );
}
