# ADR-003: Component Size and Decomposition Rules

**Status:** Accepted

**Tags:** `[frontend, components, clean-code]`

**Date:** 2026-02-07

---

## Context

Componentes React tendem a crescer descontroladamente quando não há regras claras:
- Arquivos de 500+ linhas são comuns sem disciplina
- Lógica misturada com apresentação dificulta testes
- Mudanças em um componente quebram outros por acoplamento

## Decision

### Regra de Tamanho

**Limite máximo:** 150-200 linhas por componente.

Quando ultrapassar, **REFATORAR IMEDIATAMENTE**:

```typescript
// ❌ ERRADO: Componente monolítico de 300 linhas
export const AdminBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  
  // ... 250 linhas de JSX misturadas com lógica
};
```

### Estratégia de Decomposição

#### 1. **Extract Logic → Custom Hooks**

Mova estado e lógica para `hooks/`:

```typescript
// hooks/useBookForm.ts (lógica extraída)
export const useBookForm = (book?: IBook) => {
  const [formData, setFormData] = useState(book || {});
  const mutation = useCreateBookMutation();
  
  const handleSubmit = async () => { /* ... */ };
  
  return { formData, setFormData, handleSubmit, isLoading };
};

// views/AdminBooksPage.tsx (componente enxuto)
export const AdminBooksPage = () => {
  const { formData, handleSubmit } = useBookForm();
  
  return <BookForm data={formData} onSubmit={handleSubmit} />;
};
```

#### 2. **Extract Styles → Styled Files**

Mova CSS-in-JS para `styles/`:

```typescript
// views/styles/BookTable.styled.ts
import { styled, TableCell } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  backgroundColor: theme.palette.primary.light,
}));
```

#### 3. **Extract Components → Flat Views**

Componentes grandes viram vários componentes pequenos **na mesma pasta `views/`**:

```
views/
├── AdminBooksPage.tsx      # Orquestrador (layout + estado global)
├── BookFormDialog.tsx      # Dialog extraído
├── BookTable.tsx           # Tabela extraída
└── BookTableRow.tsx        # Linha da tabela extraída
```

**PROIBIDO:** Criar subpastas `components/` ou `partials/`:

```
❌ views/components/BookFormDialog.tsx
✅ views/BookFormDialog.tsx
```

### Single Responsibility Principle

**Pai (Orquestrador):**
- Gerencia estado global
- Chama hooks de API (React Query)
- Define layout
- Passa dados via props

**Filho (Apresentação):**
- Recebe dados via props
- Renderiza UI
- Emite callbacks (`onSubmit`, `onClick`)
- Estado local mínimo

## Consequences

### Positive

- **Legibilidade:** Componentes pequenos são fáceis de entender
- **Testabilidade:** Componentes isolados são fáceis de testar
- **Reutilização:** Componentes focados podem ser reutilizados
- **Manutenibilidade:** Mudanças localizadas não afetam outros componentes

### Negative

- **Mais arquivos:** Crescimento no número de arquivos (trade-off aceito)
- **Disciplina:** Requer vigilância constante para não deixar crescer

### Neutral

- Linha 150-200 é uma **guideline**, não lei absoluta (use bom senso)
- Componentes com JSX extenso mas simples podem ultrapassar se não houver lógica complexa
