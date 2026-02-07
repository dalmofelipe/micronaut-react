export interface IContent {
  id: number;
  titulo: string;
  conteudo: string;
  categoria?: string;
  status: string;
  autorId: number;
  mediaUrls?: string[];
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateContentRequest {
  titulo: string;
  conteudo: string;
  conteudoJson?: any;
  categoria?: string;
  status?: string;
  autorId: number;
  mediaUrls?: string[];
}

export interface IMediaUploadResponse {
  key: string;
  url: string;
  type: string;
  size: number;
  width?: number;
  height?: number;
} 