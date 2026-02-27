import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import type { BookFormData } from "../hooks/useBookForm";

interface BookFormDialogProps {
  open: boolean;
  isEditing: boolean;
  formData: BookFormData;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (field: keyof BookFormData, value: any) => void;
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
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Título"
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Autor"
            value={formData.autor}
            onChange={(e) => onChange("autor", e.target.value)}
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
            value={formData.genero}
            onChange={(e) => onChange("genero", e.target.value)}
            fullWidth
          />
          <TextField
            label="Quantidade de Paginas"
            type="number"
            value={formData.pages}
            onChange={(e) => onChange("pages", parseInt(e.target.value, 10))}
            fullWidth
            required
          />
          <TextField
            label="Quantidade Total"
            type="number"
            value={formData.quantidadeTotal}
            onChange={(e) => onChange("quantidadeTotal", parseInt(e.target.value, 10))}
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
            value={formData.imagemUrl}
            onChange={(e) => onChange("imagemUrl", e.target.value)}
            fullWidth
          />
        </Box>
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
