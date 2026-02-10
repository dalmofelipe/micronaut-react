import { useNotificationStore } from "@/shared/store/useNotificationStore";
import { useState } from "react";
import {
  useCreateBook,
  useUpdateBook,
} from "../../../hooks/useBooks";
import type {
  IBook,
  IBookRequest
} from "../../../types/Book";


const initialFormData: IBookRequest = {
  title: "",
  author: "",
  isbn: "",
  genre: "",
  totalAvailable: 1,
  resumo: "",
  imageUrl: "",
  pages: 0,
};

export function useBookForm() {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState<IBookRequest>(initialFormData);
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
      author: book.author || "",
      isbn: book.isbn || "",
      genre: book.genre || "",
      totalAvailable: book.totalAvailable || 1,
      resumo: book.resumo || "",
      imageUrl: book.imageUrl || "",
      pages: book.pages || 0,
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

  const handleFormChange = (field: keyof IBookRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      if (isEditing && selectedBook) {
        await updateMutation.mutateAsync({
          id: selectedBook.id,
          data: formData as IBookRequest,
        });
        showNotification("Livro atualizado com sucesso!", "success");
      } else {
        await createMutation.mutateAsync(formData as IBookRequest);
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
