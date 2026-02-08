# ADR-004: Zero sx Props Policy

**Status:** Accepted

**Tags:** `[frontend, styling, mui, clean-code]`

**Date:** 2026-02-07

---

## Context

Material-UI (MUI) oferece a prop `sx` para estilos inline:

```typescript
<Box sx={{ padding: 2, backgroundColor: 'primary.main', ... }} />
```

Problema: `sx` complexos poluem o JSX e dificultam:
- Leitura do código (styled vs logic misturados)
- Reutilização de estilos
- Manutenção (estilos espalhados pelo JSX)

## Decision

**Evitar `sx` props para estilos complexos.** Usar **Styled Components** (MUI `styled()`) em vez disso.

### Regra

**PERMITIDO:** `sx` para ajustes simples (1 propriedade):

```typescript
// ✅ OK: Simples, pontual
<Box sx={{ mt: 2 }} />
<Typography sx={{ fontWeight: 'bold' }} />
```

**PROIBIDO:** `sx` com múltiplas propriedades ou lógica:

```typescript
// ❌ ERRADO
<Card sx={{
  padding: 3,
  backgroundColor: theme.palette.primary.light,
  borderRadius: 2,
  boxShadow: theme.shadows[3],
  '&:hover': { transform: 'scale(1.02)' }
}} />
```

### Solução: Styled Components

Extrair estilos para `views/styles/*.styled.ts`:

```typescript
// views/styles/BookCard.styled.ts
import { styled, Card } from '@mui/material';

export const StyledBookCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.light,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.2s',
  
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

// views/BookCard.tsx
import { StyledBookCard } from './styles/BookCard.styled';

export const BookCard = ({ book }) => (
  <StyledBookCard>
    <Typography>{book.title}</Typography>
  </StyledBookCard>
);
```

### Estrutura de Arquivos

Estilos vivem em `views/styles/` dentro de cada sub-feature:

```
features/books/catalog/
├── views/
│   ├── BookCard.tsx
│   └── styles/
│       └── BookCard.styled.ts
```

## Consequences

### Positive

- **JSX limpo:** Componentes focados em estrutura, não estilo
- **Reutilização:** Styled components podem ser importados
- **Type-safety:** TypeScript valida props de temas
- **Performance:** Styled components são otimizados pelo MUI

### Negative

- **Mais arquivos:** Cada componente com estilos complexos vira 2 arquivos
- **Indireção:** Precisa olhar arquivo separado para ver estilos

### Neutral

- Para estilos compartilhados entre features, criar em `shared/components/`
- Estilos globais (tema) vivem em `app/theme.ts`
