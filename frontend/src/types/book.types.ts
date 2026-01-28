export interface IBook {
  id: number;
  title: string;
  pages: number;
  // Campos futuros (Fase 1):
  author?: string;
  isbn?: string;
  genre?: string;
  totalQuantity?: number;
  availableQuantity?: number;
  summary?: string;
  imageUrl?: string;
  active?: boolean;
}
