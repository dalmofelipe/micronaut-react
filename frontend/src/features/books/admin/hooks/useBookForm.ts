import { useState } from "react";
import {
  useCreateBook,
  useUpdateBook,
} from "../../shared/hooks/useBooks";
import { useNotificationStore } from "@/shared/store/useNotificationStore";
import type {
  IBook,
  ICreateBookRequest,
  IUpdateBookRequest,
} from "../../shared/types/Book";

export interface BookFormData {
  title: string;
  autor: string;
  isbn: string;
  genero: string;
  pages: number;
  quantidadeTotal: number;
  resumo: string;
  imagemUrl: string;
}

const initialFormData: BookFormData = {
  title: "",
  autor: "",
  isbn: "",
  genero: "",
  pages: 1,
  quantidadeTotal: 1,
  resumo: "",
  imagemUrl: "",
};

export function useBookForm() {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<BookFormData>(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  const createMutation = useCreateBook();
  const updateMutation = useUpdateBook();
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );

  const handleOpenCreateDialog = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setSelectedBook(null);
    setFormOpen(true);
  };

  const handleOpenEditDialog = (book: IBook) => {
    setFormData({
      title: book.title,
      autor: book.autor || "",
      isbn: book.isbn || "",
      genero: book.genero || "",
      pages: book.pages,
      quantidadeTotal: book.quantidadeTotal,
      resumo: book.resumo || "",
      imagemUrl: book.imagemUrl || "",
    });
    setSelectedBook(book);
    setIsEditing(true);
    setFormOpen(true);
  };

  const handleCloseDialog = () => {
    setFormOpen(false);
    setFormData(initialFormData);
    setIsEditing(false);
    setSelectedBook(null);
  };

  const handleFormChange = (field: keyof BookFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      handleCloseDialog();
    } catch (error) {
      showNotification("Erro ao salvar livro", "error");
    }
  };

  return {
    formOpen,
    formData,
    isEditing,
    selectedBook,
    isLoading: createMutation.isPending || updateMutation.isPending,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleFormChange,
    handleFormSubmit,
  };
}
