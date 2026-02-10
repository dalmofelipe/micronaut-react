# ADR-005: TypeScript Naming Conventions

**Status:** Accepted

**Tags:** `[frontend, typescript, naming]`

**Date:** 2026-02-07 | **Updated:** 2026-02-09

---

## Context

TypeScript permite definir estruturas via `interface` e `type`, mas sem convenção clara:
- Conflitos de nomes com classes/componentes
- Dificulta identificar se é tipo ou valor
- Inconsistência no codebase

## Decision

Adotamos prefixos padronizados para tipos e interfaces:

### Interfaces: Prefixo `I`

```typescript
// ✅ CORRETO
export interface IBook {
  id: number;
  title: string;
  author: string;
}

export interface IBookFilters {
  genre?: string;
  search?: string;
}
```

### Types: Prefixo `T`

```typescript
// ✅ CORRETO
export type TUserRole = 'admin' | 'user' | 'guest';

export type TLoanStatus = 'active' | 'returned' | 'overdue';

export type TBookFormData = Omit<IBook, 'id'>;
```

### Imports: Use `import type`

Para imports que são **apenas tipos** (não valores runtime):

```typescript
// ✅ CORRETO
import type { IBook, TUserRole } from '../types/Book';

// ❌ ERRADO
import { IBook, TUserRole } from '../types/Book';
```

**Benefício:** Webpack/Vite removem completamente esses imports do bundle (tree-shaking perfeito).

### Quando usar Interface vs Type

**Interface (`I`):** Para **objetos/estruturas**

```typescript
interface IUser {
  id: number;
  name: string;
}
```

**Type (`T`):** Para **unions, primitivos, utilitários**

```typescript
type TStatus = 'active' | 'inactive';
type TPartialBook = Partial<IBook>;
```

### Folder Naming Conventions

| Tipo de Pasta | Convenção | Exemplo | Quando Usar |
|---------------|-----------|---------|-------------|
| **Features** | kebab-case | `book-loans/` | Nomes de features |
| **Subpastas temáticas** | kebab-case | `content-form/` | Agrupamento em `views/` |
| **Pastas técnicas (relacionadas)** | singular | `service/`, `types/` | Arquivos intimamente relacionados |
| **Pastas técnicas (independentes)** | plural | `hooks/`, `utils/` | Múltiplos arquivos independentes |
| **Arquivos de componentes** | PascalCase | `ContentFormPage.tsx` | Componentes React |
| **Arquivos de hooks** | camelCase | `useContent.ts` | Custom hooks |
| **Arquivos de styles** | PascalCase + `.styled` | `ContentForm.styled.ts` | Styled components |

## Consequences

### Positive

- **Clareza:** Prefixo indica imediatamente que é tipo, não valor
- **Evita conflitos:** `Book` (classe) vs `IBook` (interface)
- **Busca facilitada:** Grep por `I` ou `T` encontra todos os tipos
- **Bundle size:** `import type` reduz bundle (tree-shaking)

### Negative

- **Verbosidade:** `IBook` vs `Book` (3 caracteres extras)
- **Contra "convenção moderna":** Comunidade TS debate sobre prefixos (aceitamos trade-off pela clareza)

### Neutral

- Componentes React **nunca** usam prefixo: `BookCard`, `AdminPage` (são valores, não tipos)
- DTOs do backend seguem mesma convenção no frontend
