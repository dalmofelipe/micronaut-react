# ADR-002: Manager vs Repository Pattern (Frontend Data Layer)

**Status:** Accepted

**Tags:** `[frontend, data-layer, architecture]`

**Date:** 2026-02-07

---

## Context

A camada de dados do frontend precisa separar responsabilidades:
- **Chamadas HTTP puras** (fetch/Axios) são mecânicas
- **Lógica de orquestração** (error handling, formatação) é estratégica

Misturar ambas no mesmo arquivo cria código confuso e dificulta testes.

## Decision

Dentro de `features/*/services/`, separamos em **dois arquivos**:

### 1. Repository (`*Repository.ts`)

**Responsabilidade:** Apenas fazer chamadas HTTP. Zero lógica de negócio.

```typescript
// BookRepository.ts
import api from '@/app/config/axios';
import type { IBook, ICreateBookRequest } from '../types/Book';

export const BookRepository = {
  getAll: () => api.get<IBook[]>('/books'),
  
  getById: (id: number) => api.get<IBook>(`/books/${id}`),
  
  create: (data: ICreateBookRequest) => 
    api.post<IBook>('/books', data),
};
```

**Regras:**
- Apenas chamadas Axios/Fetch
- Retorna dados "crus" tipados (DTOs)
- Sem try/catch, sem formatação, sem validação

### 2. Manager (`*Manager.ts`)

**Responsabilidade:** Orquestrar chamadas, tratar erros, formatar dados.

```typescript
// BookManager.ts
import { BookRepository } from './BookRepository';

export const BookManager = {
  async getAllBooks() {
    // Futuramente: cache, retry, error handling
    return BookRepository.getAll();
  },
  
  async createBook(data: ICreateBookRequest) {
    // Futuramente: validação extra, sanitização, logging
    return BookRepository.create(data);
  },
};
```

**Regras:**
- Re-exporta métodos do Repository
- Pode adicionar: validação, retry logic, cache, transformações
- Não faz chamadas HTTP diretamente (usa Repository)

### Localização

Ambos vivem em `features/*/shared/services/`:

```
features/books/
└── shared/
    └── services/
        ├── BookManager.ts
        └── BookRepository.ts
```

### Consumo (React Query Hooks)

Hooks **SEMPRE** chamam Manager, nunca Repository:

```typescript
// hooks/useBooks.ts
import { BookManager } from '../services/BookManager';

export const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: BookManager.getAllBooks, // ✅ Manager
  });
};
```

## Consequences

### Positive

- **Separação clara:** HTTP vs Lógica de negócio
- **Testabilidade:** Manager pode mockar Repository facilmente
- **Escalabilidade:** Adicionar cache/retry sem mudar Repository
- **Single Responsibility:** Cada arquivo faz uma coisa

### Negative

- **Dois arquivos:** Mais código boilerplate inicialmente (trade-off aceito)
- **Indireção:** Um nível extra de abstração (benefício a longo prazo)

### Neutral

- Repository é "burro" (mecânico), Manager é "inteligente" (estratégico)
- Para projetos pequenos, Manager pode apenas re-exportar (preparação para crescimento)
