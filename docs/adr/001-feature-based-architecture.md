# ADR-001: Feature-Based Architecture (Ramon Prata Model)

**Status:** Accepted

**Tags:** `[frontend, architecture, folder-structure]`

**Date:** 2026-02-07

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

Cada feature representa um **domínio de negócio** (ex: `books`, `loans`, `users`):

```
features/books/
├── admin/              # Contexto administrativo
│   ├── views/         # Componentes e páginas
│   ├── hooks/         # Lógica de formulários/UI
│   └── styles/        # Estilos específicos
├── catalog/           # Contexto público/catálogo
│   ├── views/
│   └── styles/
└── shared/            # Código compartilhado entre sub-features
    ├── services/      # Manager + Repository
    ├── hooks/         # useBooks, useBookMutations
    └── types/         # Book.ts, BookFilters.ts
```

### Regras de Dependência

**Unidirecional:** `features` → `shared` (nunca o inverso)

```typescript
// ✅ CORRETO
import { Button } from '@/shared/components/Button';

// ❌ ERRADO
// shared/ nunca pode importar de features/
import { BookCard } from '@/features/books/catalog/views/BookCard';
```

### Sub-features (Separação de Contexto)

Para domínios complexos, dividir em sub-features baseadas no **perfil do usuário**:
- `admin/`: Telas de gestão (CRUD, dashboards)
- `catalog/` ou `public/`: Telas para usuário final
- `shared/`: Hooks, services, types usados por ambos

Cada sub-feature tem sua própria estrutura interna (`views/`, `hooks/`, `styles/`).

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
