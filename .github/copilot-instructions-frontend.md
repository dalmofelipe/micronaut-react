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

**Sub-features (Separação de Contexto):**
Para domínios complexos, divida em sub-pastas para separar contextos (ex: Admin vs Público):
*   `admin/`: Telas de gestão, Dashboards administrativos.
*   `catalog/` ou `public/`: Telas para o usuário final.
*   `shared/`: Hooks (`useBooks`), services e types usados por ambas as sub-features.

**Estrutura Interna Recomendada:**

| Pasta | Responsabilidade | Exemplo |
| :--- | :--- | :--- |
| `views/` | Componentes visuais e páginas. | `AdminBooksPage.tsx`, `BookCard.tsx` |
| `services/` | Camada de Dados (Manager/Repository). | `BookManager.ts`, `BookRepository.ts` |
| `hooks/` | Hooks de lógica de UI/Formulário. | `useBookForm.ts` |
| `styles/` | Estilos extraídos em arquivos `.styled.ts`. | `BooksTable.styled.ts` |
| `types/` | Tipos do domínio (DTOs, Interfaces). | `Book.ts` |

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

## 🧩 Componentização & Refatoração

Sempre que um componente ultrapassar **150-200 linhas** ou assumir múltiplas responsabilidades, ele **DEVE** ser refatorado:

1.  **Single Responsibility Principle (SRP):** Um componente deve fazer apenas uma coisa (ex: uma tabela, um formulário, um cabeçalho).
2.  **Logic Extraction (Custom Hooks):** Toda lógica de estado complexa, mutations ou efeitos deve ser movida para um custom hook (ex: `useBookForm.ts`) dentro da pasta `hooks/` da sub-feature.
3.  **Styles Extraction:** CSS-in-JS (MUI Styled) deve viver na pasta `styles/` dentro de `views/` da respectiva feature (ex: `views/styles/NomeComponente.styled.ts`).
4.  **Composition Over Complexity:** Quebre componentes monolíticos em componentes menores orquestrados por uma View principal.
5.  **Flat Views Structure:** **NÃO** crie pastas como `components/` dentro de `views/`. Todos os componentes (Cards, Tables, Dialogs) vivem na raiz de `views/`.
6.  **Sub-feature Organization:** Cada sub-feature (`admin`, `catalog`) deve ter sua própria estrutura de `hooks/`, `views/`, etc., quando necessário separar contextos.

---

## 📡 Camada de Dados: Pattern Manager vs Repository

Dentro de `features/*/services/`, separamos responsabilidades:

### 1. **Repository (`*Repository.ts`)**
*   **Responsabilidade:** Apenas fazer a chamada HTTP/Banco de dados.
*   **Regra:** ZERO regras de negócio. Retorna os dados "crus" ou tipados (DTO).

### 2. **Manager (`*Manager.ts`)**
*   **Responsabilidade:** O "Cérebro". Orquestra chamadas, trata erros, formata dados para a View.

---

## 🎨 Guidelines de Código

### Convenções de Nomenclatura
*   **Interfaces:** Prefixo `I` (ex: `IBook`).
*   **Tipos:** Prefixo `T` (ex: `TUserRole`).
*   **Imports de Tipo:** Sempre `import type { ... }`.

### Organização de Componentes (Views)
*   **Estilos:** Separados em `styles/NomeComponente.styled.ts` (Styled Components + MUI).
*   **Lógica de Renderização:** Use funções `renderSomething()` para condicionais complexas no JSX.

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
2.  **Ao criar uma nova funcionalidade**, organize em sub-pastas (`admin`, `catalog`) se houver separação de perfil de acesso.
3.  **Componentes não devem ser arquivos gigantes.** Se notar que o arquivo está crescendo, sugira a quebra em componentes menores e extração de lógica para hooks.
4.  **Lógica de formulário** deve ser sempre extraída para um hook dedicado.
5.  **Imports absolutos:** Prefira `@/` para `src/` e caminhos relativos para arquivos dentro da mesma feature/sub-feature.
6.  **Ao refatorar**, mova lógica espalhada (`pages`, `services`) para a estrutura correta (`features/*/services/Manager.ts`).
7.  **Consulte os arquivos existentes** em `shared` antes de duplicar componentes genéricos.
