import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import type { IBookRequest } from "../../../types/Book";
import { StyledFormContent } from "./styles/BookFormDialog.styled";

interface BookFormDialogProps {
  open: boolean;
  isEditing: boolean;
  formData: IBookRequest;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (field: keyof IBookRequest, value: any) => void;
}

export function BookFormDialog({
  open,
  isEditing,
  formData,
  isLoading,
  onClose,
  onSubmit,
  onChange,
}: BookFormDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{isEditing ? "Editar Livro" : "Novo Livro"}</DialogTitle>
      <DialogContent>
        <StyledFormContent>
          <TextField
            label="Título"
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Autor"
            value={formData.author}
            onChange={(e) => onChange("author", e.target.value)}
            fullWidth
          />
          <TextField
            label="ISBN"
            value={formData.isbn}
            onChange={(e) => onChange("isbn", e.target.value)}
            fullWidth
          />
          <TextField
            label="Gênero"
            value={formData.genre}
            onChange={(e) => onChange("genre", e.target.value)}
            fullWidth
          />
          <TextField
            label="Quantidade de Páginas"
            type="number"
            value={formData.pages}
            onChange={(e) => onChange("pages", parseInt(e.target.value, 10))}
            fullWidth
            required
          />
          <TextField
            label="Quantidade Total"
            type="number"
            value={formData.totalAvailable}
            onChange={(e) => onChange("totalAvailable", parseInt(e.target.value, 10))}
            fullWidth
            required
          />
          <TextField
            label="Resumo"
            value={formData.resumo}
            onChange={(e) => onChange("resumo", e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="URL da Imagem"
            value={formData.imageUrl}
            onChange={(e) => onChange("imageUrl", e.target.value)}
            fullWidth
          />
        </StyledFormContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={onSubmit} variant="contained" disabled={isLoading}>
          {isEditing ? "Atualizar" : "Criar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
