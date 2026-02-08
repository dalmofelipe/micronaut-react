# ADR-014: Naming Conventions Alignment (Cross-stack)

**Status:** Accepted

**Tags:** `[cross-cutting, naming, conventions]`

**Date:** 2026-02-07

---

## Context

Frontend e backend usam nomenclaturas diferentes:
- DTOs com nomes conflitantes (frontend usa `IBook`, backend usa `BookResponse`)
- Repositories com sufixos diferentes
- Dificuldade em comunicação entre desenvolvedores
- Code reviews confusos (conceitos diferentes para mesma coisa)

## Decision

Alinhamos convenções de nomenclatura entre **TypeScript (Frontend)** e **Java (Backend)**.

### DTOs (Request/Response)

#### Request DTOs

**Formato:** `Create<Entity>Request`, `Update<Entity>Request`

```typescript
// Frontend
export interface ICreateBookRequest {
  title: string;
  author: string;
  isbn: string;
}
```

```java
// Backend
public class CreateBookRequest {
    private String title;
    private String author;
    private String isbn;
}
```

#### Response DTOs

**Formato:** `<Entity>Response`

```typescript
// Frontend
export interface IBookResponse {
  id: number;
  title: string;
  author: string;
}
```

```java
// Backend
public class BookResponse {
    private Long id;
    private String title;
    private String author;
}
```

### Entities

#### Frontend (Domain Models)

**Formato:** Interface com prefixo `I`

```typescript
export interface IBook {
  id: number;
  title: string;
  author: string;
  isbn: string;
}
```

#### Backend (Domain Entities)

**Formato:** Classe sem sufixo

```java
// core/domain/entities/Book.java
public class Book {
    private Long id;
    private String title;
    private String author;
    private String isbn;
}
```

#### Backend (JPA Entities)

**Formato:** Classe com sufixo `Entity`

```java
// adapter/persistence/entity/BookEntity.java
@Entity
public class BookEntity {
    @Id
    private Long id;
    private String title;
}
```

### Repositories

#### Frontend

**Formato:** `<Entity>Repository`, `<Entity>Manager`

```typescript
// BookRepository.ts
export const BookRepository = {
  getAll: () => api.get<IBook[]>('/books'),
};

// BookManager.ts
export const BookManager = {
  getAllBooks: () => BookRepository.getAll(),
};
```

#### Backend

**Formato:** Interface `<Entity>Repository`, Implementação `<Entity>RepositoryImpl`

```java
// core/repository/BookRepository.java (interface)
public interface BookRepository {
    Book save(Book book);
}

// adapter/persistence/BookRepositoryImpl.java
public class BookRepositoryImpl implements BookRepository {
    public Book save(Book book) { /* ... */ }
}
```

### Use Cases (Backend only)

**Formato:** `<Verbo><Entity>UseCase`

```java
public class CreateBookUseCase { }
public class UpdateBookUseCase { }
public class DeleteBookUseCase { }
```

### Property Names (Campos)

#### Frontend (camelCase)

```typescript
export interface IBook {
  id: number;
  quantidadeDisponivel: number; // camelCase
  imagemUrl: string;
}
```

#### Backend Domain (camelCase)

```java
public class Book {
    private Long id;
    private int quantidadeDisponivel; // camelCase
    private String imagemUrl;
}
```

#### Database (snake_case)

```sql
CREATE TABLE books (
    id BIGSERIAL PRIMARY KEY,
    quantidade_disponivel INTEGER, -- snake_case
    imagem_url VARCHAR(500)
);
```

### Mapeamento Completo

| Conceito | Frontend | Backend Domain | Backend JPA | Backend DTO |
|----------|----------|----------------|-------------|-------------|
| Entidade | `IBook` | `Book` | `BookEntity` | `BookResponse` |
| Criar Request | `ICreateBookRequest` | - | - | `CreateBookRequest` |
| Repository | `BookRepository` | `BookRepository` (interface) | `BookRepositoryImpl` | - |
| Manager | `BookManager` | - | - | - |
| Use Case | - | `CreateBookUseCase` | - | - |

## Consequences

### Positive

- **Consistência:** Mesma nomenclatura para mesmos conceitos
- **Comunicação clara:** Code reviews mais eficientes
- **Onboarding:** Novos devs entendem padrões rapidamente
- **Menos bugs:** Nomes claros evitam confusões

### Negative

- **Verbosidade:** Prefixos/sufixos adicionam caracteres
- **Migração:** Código antigo precisa ser atualizado

### Neutral

- Frontend usa prefixos (`I`, `T`), backend usa sufixos (`Entity`, `Request`)
- Database sempre snake_case (convenção PostgreSQL)
