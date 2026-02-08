# ADR-006: Sub-feature Context Separation

**Status:** Accepted

**Tags:** `[frontend, architecture, organization]`

**Date:** 2026-02-07

---

## Context

Features complexas atendem **diferentes perfis de usuário**:
- Admins precisam de CRUD completo, dashboards, relatórios
- Usuários públicos precisam de catálogo, busca, visualização

Misturar ambos contextos em uma pasta `views/` única cria:
- Dificuldade em encontrar componentes do contexto desejado
- Acoplamento não intencional (admin usando componentes públicos e vice-versa)
- Permissões/rotas confusas

## Decision

Para features com **múltiplos contextos de usuário**, dividir em **sub-features**:

```
features/books/
├── admin/              # Contexto administrativo
│   ├── views/         # AdminBooksPage, BookFormDialog, BooksTable
│   ├── hooks/         # useBookForm, useBookFilters
│   └── styles/        # BooksTable.styled.ts
├── catalog/           # Contexto público/catálogo
│   ├── views/         # BookCard, BookList, BookDetailPage
│   └── styles/        # BookCard.styled.ts
└── shared/            # Código compartilhado entre sub-features
    ├── services/      # BookManager, BookRepository
    ├── hooks/         # useBooks, useBookMutations (React Query)
    └── types/         # IBook, TBookStatus
```

### Regras de Sub-features

1. **Separação por perfil de acesso:**
   - `admin/`: Telas de gestão (CRUD, dashboards, relatórios)
   - `catalog/` ou `public/`: Telas para usuário final (catálogo, busca)
   - `shared/`: Hooks de API, services, types usados por ambos

2. **Cada sub-feature tem estrutura completa:**
   - Pode ter seu próprio `views/`, `hooks/`, `styles/`
   - Pode importar de `shared/` da mesma feature
   - Pode importar de `@/shared/` global

3. **Sub-features NÃO importam entre si:**

```typescript
// ❌ ERRADO: admin importando de catalog
import { BookCard } from '../catalog/views/BookCard';

// ✅ CORRETO: Criar componente genérico em shared
import { BookCard } from '@/shared/components/BookCard';
```

### Quando usar Sub-features?

**Use quando:**
- Feature tem perfis de usuário distintos (admin vs público)
- Feature tem mais de 10 componentes
- Contextos têm permissões/rotas diferentes

**Não use quando:**
- Feature pequena (<5 componentes)
- Um único perfil de usuário

Exemplo simples (sem sub-features):

```
features/dashboard/
├── views/
│   └── DashboardPage.tsx
└── hooks/
    └── useDashboardStats.ts
```

## Consequences

### Positive

- **Organização clara:** Componentes agrupados por contexto
- **Escalabilidade:** Fácil adicionar novos contextos (ex: `mobile/`)
- **Segurança:** Rotas/permissões refletem estrutura de pastas
- **Manutenibilidade:** Mudanças em admin não afetam catalog

### Negative

- **Mais pastas:** Complexidade inicial para features pequenas
- **Decisão necessária:** Dev precisa decidir onde colocar componente

### Neutral

- Sub-features são **opcionais** - use apenas quando necessário
- Exemplo real no codebase: `features/books/` e `features/content/`
