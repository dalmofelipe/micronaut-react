import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import {
  useGetBooks,
  useCreateBook,
  useUpdateBook,
  useDeleteBook,
} from "../hooks/useBooks";
import { useNotificationStore } from "@/shared/store/useNotificationStore";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import type {
  IBook,
  ICreateBookRequest,
  IUpdateBookRequest,
} from "../types/Book";
import { BookTable } from "./BookTable";
import { BookFormDialog } from "./BookFormDialog";

export function AdminBooksPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetBooks(page, size, search);
  const createMutation = useCreateBook();
  const updateMutation = useUpdateBook();
  const deleteMutation = useDeleteBook();
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );

  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // -- Handlers for Actions --

  const handleCreateClick = () => {
    setSelectedBook(null);
    setFormOpen(true);
  };

  const handleEditClick = (book: IBook) => {
    setSelectedBook(book);
    setFormOpen(true);
  };

  const handleDeleteClick = (book: IBook) => {
    setSelectedBook(book);
    setDeleteDialogOpen(true);
  };

  // -- Handlers for Submissions --

  const handleFormSubmit = async (data: ICreateBookRequest | IUpdateBookRequest) => {
    try {
      if (selectedBook) {
        await updateMutation.mutateAsync({
          id: selectedBook.id,
          data: data as IUpdateBookRequest,
        });
        showNotification("Livro atualizado com sucesso!", "success");
      } else {
        await createMutation.mutateAsync(data as ICreateBookRequest);
        showNotification("Livro criado com sucesso!", "success");
      }
      setFormOpen(false);
    } catch (error) {
      showNotification("Erro ao salvar livro", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedBook) {
      try {
        await deleteMutation.mutateAsync(selectedBook.id);
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={700}>
          Livros
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateClick}
        >
          Novo Livro
        </Button>
      </Box>

      <Box p={2} component={Paper} mb={3}>
        <TextField
          fullWidth
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <BookTable
        books={data?.content || []}
        isLoading={isLoading}
        totalElements={data?.totalElements || 0}
        page={page}
        size={size}
        onPageChange={setPage}
        onSizeChange={setSize}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <BookFormDialog
        open={formOpen}
        bookToEdit={selectedBook}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Deletar Livro"
        message={`Tem certeza que deseja deletar o livro "${selectedBook?.title}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialogOpen(false)}
        isLoading={deleteMutation.isPending}
      />
    </Box>
  );
}
