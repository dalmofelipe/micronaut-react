# ADR-002: Manager vs Repository Pattern (Frontend Data Layer)

**Status:** Accepted

**Tags:** `[frontend, data-layer, architecture]`

**Date:** 2026-02-07 | **Updated:** 2026-02-09

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
// ContentRepository.ts
import api from '@/app/config/axios';
import type { IContent } from '../types/Content';

export const ContentRepository = {
  getAll: () => api.get<IContent[]>('/content'),
  getById: (id: number) => api.get<IContent>(`/content/${id}`),
  create: (data: IContent) => api.post<IContent>('/content', data),
};
```

**Regras:** Apenas chamadas HTTP, retorna dados tipados, sem try/catch.

### 2. Manager (`*Manager.ts`)

**Responsabilidade:** Orquestrar chamadas, tratar erros, formatar dados.

```typescript
// ContentManager.ts
import { ContentRepository } from './ContentRepository';

export const ContentManager = {
  async getAll() {
    // Futuramente: cache, retry, error handling
    return ContentRepository.getAll();
  },
};
```

**Regras:** Re-exporta Repository, pode adicionar validação/cache/transformations.

### Localização

Ambos vivem em `features/*/service/` (raiz da feature, singular):

```
features/content/
└── service/
    ├── ContentManager.ts
    └── ContentRepository.ts
```

### Consumo (React Query Hooks)

Hooks **SEMPRE** chamam Manager, nunca Repository:

```typescript
// hooks/useContent.ts
import { ContentManager } from '../service/ContentManager';

export const useContent = () => {
  return useQuery({
    queryKey: ['content'],
    queryFn: ContentManager.getAll, // ✅ Manager
  });
};
```

**Barrel Export:** Manager deve ser exportado via `index.ts` da feature (ADR-016).

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
