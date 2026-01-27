# Copilot Instructions - Frontend (React + TypeScript)

## 📋 Convenções de Nomenclatura

### Interfaces
- **Todas interfaces devem começar com `I`**
- Exemplos: `IBookCardProps`, `IBook`, `IBookFilters`, `IBookFiltersStore`

### Types
- **Todos types devem começar com `T`**
- Exemplos: `TExampleType`, `TUserRole`

### Importações de Tipos
- Sempre usar `import type { ... }` para importações que são apenas tipos
- Evita problemas com `verbatimModuleSyntax`
- Exemplo: `import type { IBook } from '../types';`

---

## 🎨 Organização de Componentes React

### Estrutura de Arquivos Obrigatória

```
components/
├── MyComponent.tsx
└── styles/
    └── MyComponent.styled.ts
```

- **SEMPRE** criar arquivo de estilos separado em `styles/NomeDoComponente.styled.ts`
- **NUNCA** misturar estilos dentro do componente

### Centralização de Types

```
src/
└── types/
    ├── index.ts          # Exports centralizados
    ├── book.types.ts     # interface IBook
    └── filters.types.ts  # interface IBookFilters
```

- Interfaces de modelos de dados ficam em `src/types/`
- Interfaces de props de componentes ficam no próprio componente

---

## 🚫 Regra Crítica: ZERO Lógica no JSX

### ❌ INCORRETO
```tsx
export function MyComponent({ book }: IMyComponentProps) {
  return (
    <>
      {book.autor && (
        <Typography variant="body2">
          {book.autor}
        </Typography>
      )}
      
      {isLoading && <CircularProgress />}
      
      {!isLoading && !error && data.length > 0 && (
        <Grid>...</Grid>
      )}
    </>
  );
}
```

### ✅ CORRETO
```tsx
export function MyComponent({ book }: IMyComponentProps) {
  const renderAutor = () => {
    if (!book.autor) return null;
    
    return (
      <Typography variant="body2">
        {book.autor}
      </Typography>
    );
  };

  const renderLoading = () => {
    if (!isLoading) return null;
    return <CircularProgress />;
  };

  const renderContent = () => {
    if (isLoading || error || data.length === 0) return null;
    return <Grid>...</Grid>;
  };

  return (
    <>
      {renderAutor()}
      {renderLoading()}
      {renderContent()}
    </>
  );
}
```

**Regra:** Toda lógica condicional deve estar dentro de métodos `render...()`

---

## 🎨 Regra Crítica: ZERO uso de `sx` props

### ❌ INCORRETO
```tsx
<Box 
  sx={{
    display: 'flex',
    gap: 2,
    padding: 3,
    backgroundColor: 'background.paper'
  }}
>
  <Typography sx={{ fontWeight: 'bold' }}>Title</Typography>
</Box>
```

### ✅ CORRETO

**MyComponent.styled.ts:**
```tsx
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

export const StyledTitle = styled(Typography)({
  fontWeight: 'bold',
});
```

**MyComponent.tsx:**
```tsx
import { StyledContainer, StyledTitle } from './styles/MyComponent.styled';

export function MyComponent() {
  return (
    <StyledContainer>
      <StyledTitle>Title</StyledTitle>
    </StyledContainer>
  );
}
```

**Regra:** Se precisa de `sx={{...}}`, crie um Styled Component

---

## 📐 Padrões de Implementação

### Componentes React

```tsx
import { Typography } from '@mui/material';
import type { IBook } from '../../types';
import { StyledCard, StyledContent } from './styles/BookCard.styled';

interface IBookCardProps {
  book: IBook;
  onClick: (book: IBook) => void;
}

export function BookCard({ book, onClick }: IBookCardProps) {
  const renderAutor = () => {
    if (!book.autor) return null;
    return <Typography>{book.autor}</Typography>;
  };

  return (
    <StyledCard onClick={() => onClick(book)}>
      <StyledContent>
        <Typography>{book.title}</Typography>
        {renderAutor()}
      </StyledContent>
    </StyledCard>
  );
}
```

### Zustand Stores

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IBookFilters } from '../types';

interface IBookFiltersStore {
  filters: IBookFilters;
  setSearch: (search: string) => void;
  resetFilters: () => void;
}

export const useBookFiltersStore = create<IBookFiltersStore>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      setSearch: (search) => set((state) => ({ 
        filters: { ...state.filters, search } 
      })),
      resetFilters: () => set({ filters: defaultFilters }),
    }),
    { name: 'book-filters-storage' }
  )
);
```

### React Query Hooks

```tsx
import { useQuery } from '@tanstack/react-query';
import { bookService } from '../services/bookService';

export const useGetAllBooks = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['all-books'],
    queryFn: bookService.getAllBooks,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    allBooks: data,
    isLoadingAllBooks: isLoading,
    isErrorAllBooks: isError,
    errorAllBooks: error,
  };
};
```

---

## 📝 Regras Gerais

1. **Imports organizados:** tipos primeiro, depois hooks, depois componentes
2. **Constantes no topo:** `const ITEMS_PER_PAGE = 10;` antes do componente
3. **Métodos render...() agrupados:** todos juntos antes do return final
4. **Early returns:** sempre validar condições no início dos métodos
5. **Nomenclatura em português:** variáveis de domínio (autor, genero, disponível)
6. **Nomenclatura em inglês:** termos técnicos (isLoading, handleClick, render)

---

## 🏗️ Stack Frontend

- **Framework:** React 18
- **Linguagem:** TypeScript
- **Build Tool:** Vite
- **UI Library:** Material-UI v7.1.1
- **State Management:** Zustand v5.0.5
- **Data Fetching:** React Query (TanStack) v5.80.6
- **Routing:** React Router v7.6.2
- **HTTP Client:** Axios v1.9.0
- **Charts:** Recharts (para estatísticas)

---

## 🔌 MCPs para Frontend

### **MUI MCP - Documentação Material-UI**

**Quando usar:**
- Implementar componentes MUI novos ou complexos
- Verificar props, variantes, customizações
- Consultar exemplos de theming, styled components, sx props

**Exemplo prático:**
- Dúvida: "Como customizar cores de um Button?"
- Ação: Buscar docs do Button component no MUI MCP
- Resultado: Props `color`, `variant`, customização via `styled()`

### **Upstash Context7 - Documentação de Bibliotecas**

**Quando usar:**
- Dúvidas sobre React Query (queries, mutations, invalidation)
- Zustand (stores, persist middleware, devtools)
- React Router v7 (loaders, actions, navigation)
- Axios (interceptors, error handling)
- Recharts (gráficos, customização)

**Exemplo prático:**
- Dúvida: "Como usar persist middleware no Zustand?"
- Resultado: Sintaxe correta, exemplos de configuração

### **Chrome DevTools MCP - Testes Visuais**

**Quando usar:**
- Verificar se componente renderiza corretamente
- Testar responsividade (mobile, tablet, desktop)
- Capturar screenshots de estados específicos
- Debug de problemas de layout/CSS

**Exemplo prático:**
- Tarefa: "Verificar se modal abre ao clicar no card"
- Resultado: Screenshot mostrando modal aberto

**Regra:** Sempre consulte MCPs antes de "chutar" sintaxe ou implementação. Documentação atualizada > tentativa e erro.
