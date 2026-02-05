# Copilot Instructions - Frontend (React + TypeScript + Vite)

Este projeto segue a arquitetura **"Feature-Based"** proposta por Ramon Prata (2025). 
**Toda** nova implementação ou refatoração deve obedecer estritamente a estas diretrizes.

---

## 🏗️ Arquitetura de Pastas (Ramon Prata's Model)

A estrutura baseia-se em 3 pilares principais dentro de `src/`:

```text
src/
├── app/          # Bootstrap da aplicação
├── features/     # Domínios de negócio (AQUI vive a lógica)
├── shared/       # Código genérico e reutilizável
└── main.tsx      # Entry point
```

### 1. `src/features/` (O Coração do App)
Organizado por **domínio de negócio**.
*   "Uma página é uma feature, mas nem toda feature é uma página."
*   Cada pasta aqui representa um domínio isolado (ex: `books`, `users`, `auth`).

**Estrutura Interna de uma Feature (`src/features/nome-feature/`):**

| Pasta | Responsabilidade | Exemplo |
| :--- | :--- | :--- |
| `views/` | Componentes visuais e páginas da feature. | `BookList.tsx`, `BookDetailsPage.tsx` |
| `services/` | Camada de Dados (Ver regra Manager vs Repository). | `BookManager.ts`, `BookRepository.ts` |
| `hooks/` | Hooks específicos da feature. | `useBookList.ts` |
| `store/` | Estado local/global da feature (Zustand Slices). | `book.store.ts` |
| `types/` | Tipos do domínio (DTOs, Interfaces). | `Book.ts` |
| `utils/` | Funções auxiliares específicas da feature. | `bookFormatters.ts` |
| `routes.tsx` | (Opcional) Rotas internas da feature. | |

### 2. `src/shared/` (Genérico)
Código agnóstico ao negócio. 
*   **Regra de Ouro:** `shared` **NUNCA** pode importar de `features`. `features` importam de `shared`.
*   Contém: `components` (Botões, Modais genéricos), `hooks` (useDebounce), `utils` (date formatters genéricos).

### 3. `src/app/` (Bootstrap)
Configurações globais que "montam" o app.
*   `Router.tsx` (Roteamento raiz)
*   `providers/` (QueryClientProvider, ThemeProvider)
*   `App.tsx` (Layout global)

---

## 📡 Camada de Dados: Pattern Manager vs Repository

Dentro de `features/*/services/`, separamos responsabilidades:

### 1. **Repository (`*Repository.ts`)**
*   **Responsabilidade:** Apenas fazer a chamada HTTP/Banco de dados.
*   **Regra:** ZERO regras de negócio. Retorna os dados "crus" ou tipados (DTO).
*   **Exemplo:**
    ```ts
    // features/books/services/BookRepository.ts
    import { api } from '@/shared/lib/api';
    export const getBooks = () => api.get<IBook[]>('/books');
    ```

### 2. **Manager (`*Manager.ts`)**
*   **Responsabilidade:** O "Cérebro". Orquestra chamadas, trata erros, formata dados para a View.
*   **Regra:** A View (Componente/Hook) chama o Manager. O Manager chama o Repository.
*   **Exemplo:**
    ```ts
    // features/books/services/BookManager.ts
    import * as BookRepository from './BookRepository';
    
    export const fetchBooksForList = async () => {
      try {
        const { data } = await BookRepository.getBooks();
        return data.map(formatBookForDisplay); // Regra de negócio/transformação
      } catch (error) {
        // Tratamento de erro centralizado
        throw new Error('Erro ao buscar livros');
      }
    };
    ```

---

## 🎨 Guidelines de Código

### Convenções de Nomenclatura
*   **Interfaces:** Prefixo `I` (ex: `IBook`).
*   **Tipos:** Prefixo `T` (ex: `TUserRole`).
*   **Imports de Tipo:** Sempre `import type { ... }`.

### Organização de Componentes (Views)
*   **Estilos:** Separados em `styles/NomeComponente.styled.ts` (Styled Components + MUI).
*   **Lógica de Renderização:** Use funções `renderSomething()` para condicionais complexas no JSX.

**Exemplo:**
```tsx
// features/books/views/BookCard.tsx
import { StyledCard } from './styles/BookCard.styled';

export function BookCard({ book }: IBookCardProps) {
  const renderStatus = () => {
    if (book.isAvailable) return <Chip label="Disponível" />;
    return <Chip label="Indisponível" color="error" />;
  };

  return (
    <StyledCard>
      {renderStatus()}
    </StyledCard>
  );
}
```

### Zero `sx` Props (Quando possível)
Prefira criar componentes estilizados (`styled(Box)`) em vez de poluir o JSX com `sx={{ ... }}` complexos.

## 🧩 Componentização e Composição (CRÍTICO)

Aplicável a **QUALQUER** componente (Páginas, Modais, Cards, etc). Se um componente ficou grande ou tem muitas responsabilidades, **QUEBRE-O**.

1.  **Decomposição Obrigatória:**
    *   **Regra Geral**: Se tem mais de ~150 linhas, provavelmente deve ser quebrado.
    *   **Encapsulamento**: Se um trecho de UI precisa de parâmetros específicos e tem sua própria lógica (ex: handlers, state local), ele **DEVE** ser um componente.
    *   Se um componente tem um `Dialog` interno, extraia para `views/MyDialog.tsx`.
    *   Se um componente tem uma `Table` complexa, extraia para `views/MyTable.tsx`.
    *   Se um componente tem blocos lógicos distintos (ex: Filtros + Lista + Paginação), extraia cada um.

2.  **Estrutura de Pastas (Flat Views):**
    Mantenha os componentes extraídos DIRETAMENTE na pasta `views/`. **NÃO** crie subpastas como `components`, `partials` ou `local`.
    ```text
    src/features/books/views/
    ├── AdminBooksPage.tsx      # A página principal (Layout/Orquestração)
    ├── BookFormDialog.tsx      # Componente extraído
    ├── BookTable.tsx           # Componente extraído
    ├── BookSummaryCard.tsx     # Componente menor usado dentro de outro
    └── styles/                 # Única subpasta permitida para estilos
        ├── AdminBooksPage.styled.ts
        ├── BookTable.styled.ts
        └── BookSummaryCard.styled.ts
    ```

3.  **Princípio da Responsabilidade Única (SRP):**
    *   **Pai (Orquestrador):** Gerencia estado global, chamadas de API (via hooks) e layout. Passa dados via props.
    *   **Filho (Apresentação):** Recebe dados e callbacks. Foca em renderizar a UI. Evite hooks de API complexos aqui se possível.

---

## 🛠️ Tech Stack & Bibliotecas

*   **Core:** React 19, TypeScript, Vite
*   **UI:** Material-UI (MUI) v7
*   **State:** Zustand v5 (Pattern Slice Store recomendado)
*   **Data Fetching:** React Query (TanStack) v5
*   **Routing:** React Router v7
*   **HTTP:** Axios v1.9

---

## 🚨 Regras para o Copilot (AI)

1.  **Sempre verifique a pasta `features`** antes de criar algo novo. Não crie pastas soltas em `src/components`.
2.  **Ao criar uma nova funcionalidade**, sugira a criação da pasta em `src/features/nome-feature`.
3.  **Ao refatorar**, mova lógica espalhada (`pages`, `services`) para a estrutura correta (`features/*/services/Manager.ts`).
4.  **Consulte os arquivos existentes** em `shared` antes de duplicar componentes genéricos.
