import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { Add } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { FilterContainer, PageHeader, StyledPaper } from './styles/AdminUsers.styled';
import { UserActionsMenu } from './UserActionsMenu';
import { UserFormDialog } from './UserFormDialog';
import { UsersTable } from './UsersTable';

export function AdminUsersPage() {
  const {
    filters,
    setPage,
    setSize,
    setSearch,
    data,
    isLoading,
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
  } = useAdminUsers();

  return (
    <Box>
      <PageHeader>
        <Typography variant="h4" fontWeight={700}>
          Usuários
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenCreateDialog}
        >
          Novo Usuário
        </Button>
      </PageHeader>

      <StyledPaper>
        <FilterContainer>
          <TextField
            fullWidth
            placeholder="Buscar por nome ou email..."
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterContainer>

        <UsersTable
          data={data}
          isLoading={isLoading}
          page={filters.page}
          size={filters.size}
          onPageChange={setPage}
          onRowsPerPageChange={setSize}
          onMenuOpen={handleMenuOpen}
        />
      </StyledPaper>

      <UserActionsMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        selectedUser={selectedUser}
        onEdit={handleOpenEditDialog}
        onToggleActive={handleToggleActive}
        onDelete={handleDeleteClick}
      />

      <UserFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
      />

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
