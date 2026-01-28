# Copilot Instructions - Backend (Micronaut + Java)

## 🏗️ Arquitetura Clean Architecture

### Estrutura de Pastas

```
src/main/java/mn_react/
├── core/
│   ├── domain/
│   │   └── entities/        # Entidades de domínio (Book, Loan, User)
│   ├── repository/          # Interfaces de repositório
│   └── usecase/             # Casos de uso (regras de negócio)
├── adapter/
│   ├── api/                 # Controllers REST
│   │   └── dto/            # Request/Response DTOs
│   └── persistence/         # Implementações JPA
│       └── entity/         # Entidades JPA
└── config/                  # Configurações e factories
```

### Responsabilidades por Camada

**Core (Núcleo de Negócio)**
- `domain/entities`: Modelos de domínio puros (sem anotações JPA)
- `repository`: Interfaces que definem contratos de persistência
- `usecase`: Lógica de negócio complexa (validações, regras de empréstimo)

**Adapters (Adaptadores)**
- `api`: Recebe requisições HTTP, valida DTOs, chama use cases
- `persistence`: Implementa repositories usando JPA/JDBC

**Config**
- Factories para injeção de dependências
- DataLoaders para seed de dados
- Configurações de beans

---

## 📋 Convenções de Nomenclatura

### Entities vs DTOs
- **Domain Entity:** `Book`, `Loan`, `User` (em `core/domain/entities`)
- **JPA Entity:** `BookEntity`, `LoanEntity`, `UserEntity` (em `adapter/persistence/entity`)
- **Request DTO:** `CreateBookRequest`, `UpdateBookRequest`
- **Response DTO:** `BookResponse`, `LoanResponse`

### Repositories
- **Interface:** `BookRepository` (em `core/repository`)
- **Implementação:** `BookRepositoryImpl` ou usar Micronaut Data (em `adapter/persistence`)

### Use Cases
- **Nomenclatura:** `CreateLoanUseCase`, `RenewLoanUseCase`, `CalculateFineUseCase`
- **Método principal:** `execute(...)` ou método descritivo como `createLoan(...)`

---

## 📐 Padrões de Implementação

### Domain Entity (core/domain/entities)

```java
package mn_react.core.domain.entities;

public class Book {
    private Long id;
    private String title;
    private String autor;
    private String isbn;
    private String genero;
    private int quantidadeTotal;
    private int quantidadeDisponivel;
    private String resumo;
    private String imagemUrl;
    private boolean ativo;

    // Constructor, getters, setters
    // Métodos de domínio (ex: isDisponivel(), reservar())
}
```

### JPA Entity (adapter/persistence/entity)

```java
package mn_react.adapter.persistence.entity;

import io.micronaut.data.annotation.*;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.*;

@Entity
@Table(name = "books")
@Serdeable
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String autor;

    @Column(unique = true)
    private String isbn;

    // Outros campos com anotações JPA

    // Métodos para converter para/de domain entity
    public Book toDomain() { ... }
    public static BookEntity fromDomain(Book book) { ... }
}
```

### Controller (adapter/api)

```java
package mn_react.adapter.api;

import io.micronaut.http.annotation.*;
import io.micronaut.http.HttpStatus;
import jakarta.validation.Valid;
import mn_react.core.usecase.CreateBookUseCase;
import mn_react.adapter.api.dto.CreateBookRequest;
import mn_react.adapter.api.dto.BookResponse;

@Controller("/books")
public class BookController {
    private final CreateBookUseCase createBookUseCase;

    public BookController(CreateBookUseCase createBookUseCase) {
        this.createBookUseCase = createBookUseCase;
    }

    @Post
    @Status(HttpStatus.CREATED)
    public BookResponse create(@Valid @Body CreateBookRequest request) {
        Book book = createBookUseCase.execute(request.toBook());
        return BookResponse.fromDomain(book);
    }
}
```

### Use Case (core/usecase)

```java
package mn_react.core.usecase;

import jakarta.inject.Singleton;
import mn_react.core.domain.entities.Book;
import mn_react.core.repository.BookRepository;

@Singleton
public class CreateBookUseCase {
    private final BookRepository bookRepository;

    public CreateBookUseCase(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book execute(Book book) {
        // Validações de negócio
        validateIsbn(book.getIsbn());
        
        // Salvar
        return bookRepository.save(book);
    }

    private void validateIsbn(String isbn) {
        // Lógica de validação ISBN-10/ISBN-13
    }
}
```

### DTOs (adapter/api/dto)

```java
package mn_react.adapter.api.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.*;
import mn_react.core.domain.entities.Book;

@Serdeable
public class CreateBookRequest {
    @NotBlank
    private String title;

    private String autor;

    @Pattern(regexp = "ISBN_REGEX")
    private String isbn;

    private String genero;

    @Min(1)
    private int quantidadeTotal;

    // Getters, setters

    public Book toBook() {
        Book book = new Book();
        book.setTitle(this.title);
        book.setAutor(this.autor);
        // ... outros campos
        return book;
    }
}
```

---

## 🗄️ Database e Migrations

### Flyway Migrations (src/main/resources/db/migration)

```sql
-- V1__create_books_table.sql
CREATE TABLE books (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    isbn VARCHAR(13) UNIQUE,
    genre VARCHAR(100),
    total_quantity INTEGER NOT NULL DEFAULT 1,
    available_quantity INTEGER NOT NULL DEFAULT 1,
    summary TEXT,
    image_url VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Nomenclatura de Migrations
- **Formato:** `V{versão}__{descrição}.sql`
- **Exemplo:** `V1__create_books_table.sql`, `V2__create_users_table.sql`

---

## 📝 Regras Gerais

1. **Separação de responsabilidades:** Domain entities não devem ter anotações JPA
2. **DTOs sempre válidos:** Usar Bean Validation (`@NotNull`, `@NotBlank`, `@Min`, etc)
3. **Use Cases para lógica complexa:** Controllers apenas orquestram
4. **Mappers explícitos:** Métodos `toDTO()`, `fromDTO()`, `toDomain()`, `fromDomain()`
5. **Injeção de dependência:** Sempre via construtor

---

## 🏗️ Stack Backend

- **Framework:** Micronaut 4.8.2
- **Linguagem:** Java 21
- **ORM:** Micronaut Data JDBC
- **Database:** PostgreSQL (prod) / H2 (dev)
- **Migrations:** Flyway
- **Validation:** Bean Validation
- **Serialization:** Micronaut Serde

---

## 🔌 MCPs para Backend

### **Upstash Context7 - Documentação de Frameworks**

**Quando usar:**
- Dúvidas sobre APIs do Micronaut (controllers, repositories, validation)
- Sintaxe de anotações (@Controller, @Get, @Post, @Body, etc.)
- Configuração de Micronaut Data JDBC
- Flyway migrations (convenções, scripts SQL)
- Jakarta Bean Validation (constraints personalizados)

**Exemplo prático:**
- Dúvida: "Como fazer query customizada no Micronaut Data JDBC?"
- Resultado: Sintaxe de `@Query`, exemplos de named parameters

**Nota:** Chrome DevTools MCP não é relevante para backend puro, mas pode ser usado para testar endpoints via Swagger UI ou interface administrativa.
