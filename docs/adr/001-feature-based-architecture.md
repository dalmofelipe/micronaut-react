# ADR-001: Feature-Based Architecture (Ramon Prata Model)

**Status:** Accepted

**Tags:** `[frontend, architecture, folder-structure]`

**Date:** 2026-02-07 | **Updated:** 2026-02-09

---

## Context

Arquiteturas tradicionais baseadas em camadas técnicas (`components/`, `pages/`, `services/`) criam problemas de escalabilidade:
- Dificulta encontrar código relacionado (espalhado em várias pastas)
- Dificulta remoção de features (arquivos distribuídos)
- Aumenta acoplamento não intencional entre domínios
- "Uma página é uma feature, mas nem toda feature é uma página"

## Decision

Adotamos a **arquitetura Feature-Based** proposta por Ramon Prata (2025), com 3 pilares principais em `src/`:

```
src/
├── app/          # Bootstrap da aplicação
├── features/     # Domínios de negócio (coração do app)
└── shared/       # Código genérico reutilizável
```

### Estrutura de Features

Cada feature representa um **domínio de negócio** (ex: `content`, `books`, `loans`):

```
features/content/
├── hooks/             # Custom hooks (useContent, useContentForm)
├── service/           # Manager + Repository (camada de dados)
├── types/             # TypeScript types/interfaces
├── utils/             # Funções puras (formatação, cálculos)
├── views/             # Componentes visuais
│   ├── admin/         # Contexto administrativo
│   │   ├── content-form/      # Subpasta temática
│   │   │   ├── ContentFormPage.tsx
│   │   │   ├── ContentEditor.tsx
│   │   │   └── styles/
│   │   └── content-list/      # Subpasta temática
│   │       ├── ContentListPage.tsx
│   │       └── styles/
│   └── public/        # Contexto público
│       └── ContentFeed.tsx
└── index.ts           # Barrel export (API pública)
```

### Regras de Dependência

**Unidirecional:** `features` → `shared` (nunca o inverso)

```typescript
// ✅ CORRETO
import { Button } from '@/shared/components/Button';

// ❌ ERRADO: shared/ nunca pode importar de features/
import { BookCard } from '@/features/books/catalog/views/BookCard';
```

### Barrel Exports (index.ts)

**OBRIGATÓRIO:** Toda feature deve ter `index.ts` na raiz exportando API pública:

```typescript
// features/content/index.ts
export { useContent, useContentForm } from './hooks';
export type { IContent, TContentStatus } from './types/Content';
export { ContentListPage } from './views/admin/content-list/ContentListPage';
```

**Regra:** Outras features importam APENAS via barrel export (ver ADR-016).

### Organização de Pastas

**Raiz da feature:**
- `hooks/`: Custom hooks compartilhados
- `service/`: Manager + Repository (singular)
- `types/`: Interfaces e types TypeScript
- `utils/`: Funções puras (formatação, cálculos, validações)
- `index.ts`: Barrel export obrigatório

**Sub-features (views/):**
- `admin/`, `public/`: Contextos por perfil de usuário
- Subpastas temáticas: agrupam componentes relacionados (`content-form/`, `content-list/`)
- Cada subpasta tem seu próprio `styles/`

Ver ADR-006 para detalhes sobre separação de contextos.

## Consequences

### Positive

- **Coesão:** Código relacionado fica junto (fácil de encontrar)
- **Escalabilidade:** Adicionar/remover features não afeta outras
- **Clareza:** Estrutura reflete o domínio de negócio
- **Manutenibilidade:** Mudanças isoladas por feature

### Negative

- **Curva de aprendizado:** Equipe precisa entender conceito de features vs sub-features
- **Duplicação aparente:** Mesma estrutura repetida em cada feature (trade-off aceito pela coesão)

### Neutral

- Não criar pastas técnicas soltas em `src/` (`components/`, `pages/` proibidos)
- Imports absolutos via `@/` alias facilitam refatorações
