import type { IBook, ICreateBookRequest, IUpdateBookRequest } from "@/shared/types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";


interface BookFormDialogProps {
  open: boolean;
  bookToEdit?: IBook | null;
  onClose: () => void;
  onSubmit: (data: ICreateBookRequest | IUpdateBookRequest) => Promise<void>;
}

const INITIAL_STATE = {
  title: "",
  autor: "",
  isbn: "",
  genero: "",
  quantidadeTotal: 1,
  resumo: "",
  imagemUrl: "",
};

export const BookFormDialog = ({
  open,
  bookToEdit,
  onClose,
  onSubmit,
}: BookFormDialogProps) => {
  const [formData, setFormData] = useState(INITIAL_STATE);

  useEffect(() => {
    if (open) {
      if (bookToEdit) {
        setFormData({
          title: bookToEdit.title,
          autor: bookToEdit.autor || "",
          isbn: bookToEdit.isbn || "",
          genero: bookToEdit.genero || "",
          quantidadeTotal: bookToEdit.quantidadeTotal,
          resumo: bookToEdit.resumo || "",
          imagemUrl: bookToEdit.imagemUrl || "",
        });
      } else {
        setFormData(INITIAL_STATE);
      }
    }
  }, [open, bookToEdit]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{bookToEdit ? "Editar Livro" : "Novo Livro"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Título"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Autor"
            value={formData.autor}
            onChange={(e) => handleChange("autor", e.target.value)}
            fullWidth
          />
          <TextField
            label="ISBN"
            value={formData.isbn}
            onChange={(e) => handleChange("isbn", e.target.value)}
            fullWidth
          />
          <TextField
            label="Gênero"
            value={formData.genero}
            onChange={(e) => handleChange("genero", e.target.value)}
            fullWidth
          />
          <TextField
            label="Quantidade Total"
            type="number"
            value={formData.quantidadeTotal}
            onChange={(e) =>
              handleChange("quantidadeTotal", parseInt(e.target.value, 10))
            }
            fullWidth
            required
          />
          <TextField
            label="Resumo"
            value={formData.resumo}
            onChange={(e) => handleChange("resumo", e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="URL da Imagem"
            value={formData.imagemUrl}
            onChange={(e) => handleChange("imagemUrl", e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {bookToEdit ? "Atualizar" : "Criar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
