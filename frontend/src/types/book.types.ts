export interface IBook {
  id: number;
  title: string;
  pages: number;
  // Campos futuros (Fase 1):
  autor?: string;
  isbn?: string;
  genero?: string;
  quantidadeTotal?: number;
  quantidadeDisponivel?: number;
  resumo?: string;
  imagemUrl?: string;
  ativo?: boolean;
}
