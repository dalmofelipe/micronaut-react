import { useState } from "react";
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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, MoreVert, Edit, Delete } from "@mui/icons-material";
import {
  useGetBooks,
  useCreateBook,
  useUpdateBook,
  useDeleteBook,
} from "../../hooks/useBooks";
import { useNotificationStore } from "../../store/useNotificationStore";
import { ConfirmDeleteDialog } from "../../components/ConfirmDeleteDialog";
import type {
  IBook,
  ICreateBookRequest,
  IUpdateBookRequest,
} from "../../types";

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    autor: "",
    isbn: "",
    genero: "",
    quantidadeTotal: 1,
    resumo: "",
    imagemUrl: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    book: IBook,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBook(book);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCreateDialog = () => {
    setFormData({
      title: "",
      autor: "",
      isbn: "",
      genero: "",
      quantidadeTotal: 1,
      resumo: "",
      imagemUrl: "",
    });
    setIsEditing(false);
    setFormOpen(true);
  };

  const handleOpenEditDialog = () => {
    if (selectedBook) {
      setFormData({
        title: selectedBook.title,
        autor: selectedBook.autor || "",
        isbn: selectedBook.isbn || "",
        genero: selectedBook.genero || "",
        quantidadeTotal: selectedBook.quantidadeTotal,
        resumo: selectedBook.resumo || "",
        imagemUrl: selectedBook.imagemUrl || "",
      });
      setIsEditing(true);
      setFormOpen(true);
    }
    handleMenuClose();
  };

  const handleFormSubmit = async () => {
    try {
      if (isEditing && selectedBook) {
        await updateMutation.mutateAsync({
          id: selectedBook.id,
          data: formData as IUpdateBookRequest,
        });
        showNotification("Livro atualizado com sucesso!", "success");
      } else {
        await createMutation.mutateAsync(formData as ICreateBookRequest);
        showNotification("Livro criado com sucesso!", "success");
      }
      setFormOpen(false);
    } catch (error) {
      showNotification("Erro ao salvar livro", "error");
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
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

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    }
    renderTableContent;
    if (!data || data.content.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">
            <Typography color="text.secondary">
              Nenhum livro encontrado
            </Typography>
          </TableCell>
        </TableRow>
      );
    }

    return data.content.map((book) => (
      <TableRow key={book.id} hover>
        <TableCell>{book.id}</TableCell>
        <TableCell>{book.title}</TableCell>
        <TableCell>{book.autor || "-"}</TableCell>
        <TableCell>{book.genero || "-"}</TableCell>
        <TableCell>{book.quantidadeTotal}</TableCell>
        <TableCell align="right">
          <IconButton onClick={(e) => handleMenuOpen(e, book)}>
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
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
          onClick={handleOpenCreateDialog}
        >
          Novo Livro
        </Button>
      </Box>

      <Paper>
        <Box p={2}>
          <TextField
            fullWidth
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Gênero</TableCell>
                <TableCell>Quantidade</TableCell>
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
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={size}
          onRowsPerPageChange={(e) => setSize(parseInt(e.target.value, 10))}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpenEditDialog}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Deletar</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{isEditing ? "Editar Livro" : "Novo Livro"}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Título"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Autor"
              value={formData.autor}
              onChange={(e) =>
                setFormData({ ...formData, autor: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="ISBN"
              value={formData.isbn}
              onChange={(e) =>
                setFormData({ ...formData, isbn: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Gênero"
              value={formData.genero}
              onChange={(e) =>
                setFormData({ ...formData, genero: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Quantidade Total"
              type="number"
              value={formData.quantidadeTotal}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantidadeTotal: parseInt(e.target.value, 10),
                })
              }
              fullWidth
              required
            />
            <TextField
              label="Resumo"
              value={formData.resumo}
              onChange={(e) =>
                setFormData({ ...formData, resumo: e.target.value })
              }
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="URL da Imagem"
              value={formData.imagemUrl}
              onChange={(e) =>
                setFormData({ ...formData, imagemUrl: e.target.value })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancelar</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            {isEditing ? "Atualizar" : "Criar"}
          </Button>
        </DialogActions>
      </Dialog>

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
