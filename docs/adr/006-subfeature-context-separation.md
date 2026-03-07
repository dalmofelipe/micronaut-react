# ADR-006: Sub-feature Context Separation

**Status:** Accepted

**Tags:** `[frontend, architecture, organization]`

**Date:** 2026-02-07 | **Updated:** 2026-03-02

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

### Critério: Admin vs Public

| Sub-feature | Quando usar |
|---|---|
| `views/admin/` | Rotas protegidas, CRUD, gestão — acesso restrito |
| `views/public/` | Catálogo, leitura, busca — acesso aberto |

- Se a feature tem **só admin** por enquanto → cria `views/admin/` sem `views/public/`
- Quando surgir contexto público, já tem o lugar certo em `views/public/`
- **Hooks de admin ficam em `hooks/` na raiz da feature** — nunca em `views/admin/hooks/`

Para features com **múltiplos contextos de usuário**, dividir em **sub-features**:

```
features/content/
├── hooks/             # Raiz da feature (compartilhados — inclui hooks de admin)
├── service/           # Raiz da feature (Manager + Repository)
├── types/             # Raiz da feature (interfaces/types)
├── utils/             # Raiz da feature (funções puras)
├── views/
│   ├── admin/         # Sub-feature (contexto administrativo)
│   │   ├── content-form/      # Subpasta temática
│   │   │   ├── ContentFormPage.tsx
│   │   │   └── styles/
│   │   └── content-list/      # Subpasta temática
│   └── public/        # Sub-feature (contexto público)
│       └── ContentFeed.tsx
└── index.ts           # Barrel export (ADR-016)
```

### Regras de Organização

1. **Raiz da feature:**
   - `hooks/`: Custom hooks compartilhados entre sub-features (incluindo `useAdminBooks`, `useBookForm`, etc.)
   - `service/`: Manager + Repository (camada de dados)
   - `types/`: Interfaces/types TypeScript compartilhados
   - `utils/`: Funções puras (formatação, cálculos, validações) - SEM hooks
   - `index.ts`: Barrel export obrigatório (ADR-016)

2. **Sub-features (views/):**
   - `admin/`: Telas de gestão (CRUD, dashboards, relatórios)
   - `public/`: Telas para usuário final (catálogo, busca)
   - Contém apenas `views/` com subpastas temáticas (ADR-003)
   - **NÃO tem `hooks/` próprio** — hooks ficam na raiz da feature

3. **Sub-features NÃO importam entre si:**

```typescript
// ❌ ERRADO: admin importando de public
import { ContentFeed } from '../public/ContentFeed';

// ✅ CORRETO: Criar componente genérico em shared
import { ContentCard } from '@/shared/components/ContentCard';
```

### Quando usar Sub-features?

**Use quando:**
- Feature tem perfis de usuário distintos (admin vs público)
- Feature tem mais de 10 componentes
- Contextos têm permissões/rotas diferentes

**Não use quando:**
- Feature pequena (<5 componentes)
- Um único perfil de usuário

### Pasta utils/

Funções puras **SEM** dependências de React ou backend:

```typescript
// utils/formatCurrency.ts
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
```

**Regra:** `utils/` deve ter testes unitários obrigatórios (ADR-013).

## Consequences

### Positive

- **Organização clara:** Componentes agrupados por contexto
- **Escalabilidade:** Fácil adicionar novos contextos (ex: `mobile/`)
- **Segurança:** Rotas/permissões refletem estrutura de pastas
- **Manutenibilidade:** Mudanças em admin não afetam public

### Negative

- **Mais pastas:** Complexidade inicial para features pequenas
- **Decisão necessária:** Dev precisa decidir onde colocar componente

### Neutral

- Sub-features são **opcionais** - use apenas quando necessário
- Exemplo real no codebase: `features/books/`, `features/content/`, `features/loans/`, `features/users/`

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
features/content/
├── hooks/             # Raiz da feature (compartilhados)
├── service/           # Raiz da feature (Manager + Repository)
├── types/             # Raiz da feature (interfaces/types)
├── utils/             # Raiz da feature (funções puras)
├── views/
│   ├── admin/         # Sub-feature (contexto administrativo)
│   │   ├── content-form/      # Subpasta temática
│   │   │   ├── ContentFormPage.tsx
│   │   │   └── styles/
│   │   └── content-list/      # Subpasta temática
│   └── public/        # Sub-feature (contexto público)
│       └── ContentFeed.tsx
└── index.ts           # Barrel export (ADR-016)
```

### Regras de Organização

1. **Raiz da feature:**
   - `hooks/`: Custom hooks compartilhados entre sub-features
   - `service/`: Manager + Repository (camada de dados)
   - `types/`: Interfaces/types TypeScript compartilhados
   - `utils/`: Funções puras (formatação, cálculos, validações) - SEM hooks
   - `index.ts`: Barrel export obrigatório (ADR-016)

2. **Sub-features (views/):**
   - `admin/`: Telas de gestão (CRUD, dashboards, relatórios)
   - `public/`: Telas para usuário final (catálogo, busca)
   - Contém apenas `views/` com subpastas temáticas (ADR-003)

3. **Sub-features NÃO importam entre si:**

```typescript
// ❌ ERRADO: admin importando de public
import { ContentFeed } from '../public/ContentFeed';

// ✅ CORRETO: Criar componente genérico em shared
import { ContentCard } from '@/shared/components/ContentCard';
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

### Pasta utils/

Funções puras **SEM** dependências de React ou backend:

```typescript
// utils/formatCurrency.ts
export const formatCurrency = (value: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
```

**Regra:** `utils/` deve ter testes unitários obrigatórios (ADR-013).

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
