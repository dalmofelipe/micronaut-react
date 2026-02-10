import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { useNotificationStore } from "@/shared/store/useNotificationStore";
import { Box } from "@mui/material";
import { useState } from "react";
import { useDeleteBook, useGetBooks } from "../../../hooks/useBooks";
import type { IBook } from "../../../types/Book";
import { useBookForm } from "../book-form/useBookForm";
import { BookActionsMenu } from "./BookActionsMenu";
import { BookFormDialog } from "../book-form/BookFormDialog";
import { BooksPageHeader } from "./BooksPageHeader";
import { BooksSearchBar } from "./BooksSearchBar";
import { BooksTable } from "./BooksTable";

export function AdminBooksPage() {
  // Pagination and search state
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");

  // Data fetching
  const { data, isLoading } = useGetBooks(page, size, search);

  // Form management
  const {
    formOpen,
    formData,
    isEditing,
    isLoading: isFormLoading,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleFormChange,
    handleFormSubmit,
  } = useBookForm();

  // Delete management
  const deleteMutation = useDeleteBook();
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuSelectedBook, setMenuSelectedBook] = useState<IBook | null>(null);

  // Menu handlers
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    book: IBook,
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuSelectedBook(book);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    if (menuSelectedBook) {
      handleOpenEditDialog(menuSelectedBook);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (menuSelectedBook) {
      try {
        await deleteMutation.mutateAsync(menuSelectedBook.id);
        showNotification("Livro deletado com sucesso!", "success");
        setDeleteDialogOpen(false);
      } catch (error: any) {
        showNotification(
          error.response?.data?.message || "Erro ao deletar livro",
          "error",
        );
      }
    }
  };

  return (
    <Box>
      <BooksPageHeader onCreateClick={handleOpenCreateDialog} />

      <BooksSearchBar value={search} onChange={setSearch} />

      <BooksTable
        books={data?.content || []}
        isLoading={isLoading}
        page={page}
        size={size}
        totalElements={data?.totalElements || 0}
        onPageChange={setPage}
        onRowsPerPageChange={setSize}
        onActionClick={handleMenuOpen}
      />

      <BookActionsMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <BookFormDialog
        open={formOpen}
        isEditing={isEditing}
        formData={formData}
        isLoading={isFormLoading}
        onClose={handleCloseDialog}
        onSubmit={handleFormSubmit}
        onChange={handleFormChange}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Deletar Livro"
        message={`Tem certeza que deseja deletar o livro "${menuSelectedBook?.title}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialogOpen(false)}
        isLoading={deleteMutation.isPending}
      />
    </Box>
  );
}
