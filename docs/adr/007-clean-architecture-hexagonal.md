# ADR-007: Clean Architecture with Hexagonal Ports & Adapters

**Status:** Accepted

**Tags:** `[backend, architecture, clean-architecture]`

**Date:** 2026-02-07

**Updated:** 2026-02-24

---

## Context

Arquiteturas tradicionais acoplam lógica de negócio à infraestrutura:
- Controllers contêm regras de negócio
- Entidades JPA vazam para camada de apresentação
- Difícil trocar banco de dados ou framework web
- Testes exigem ambiente completo (banco, servidor)

## Decision

Adotamos **Clean Architecture** em 3 camadas, com separação clara entre domínio, aplicação e infraestrutura:

```
src/main/java/mn_react/
├── domain/                  # DOMÍNIO (Business Core)
│   ├── entities/            # Modelos de negócio puros
│   └── exception/           # Hierarquia de exceções de domínio
├── application/             # APLICAÇÃO (Ports & Use Cases)
│   ├── repository/          # Interfaces (ports de saída)
│   └── usecase/             # Lógica de negócio
│       └── book/
│           ├── impl/        # Implementações dos Use Cases
│           └── *.java       # Interfaces dos Use Cases
└── infrastructure/          # INFRAESTRUTURA (Adapters)
    ├── config/
    │   └── factories/       # Factories de injeção de dependência
    ├── http/                # Adapter REST
    │   ├── controllers/     # REST controllers
    │   ├── dto/             # Request/Response DTOs
    │   │   ├── requests/
    │   │   └── responses/
    │   └── exception/       # Exception handlers HTTP
    └── persistence/         # Adapter de banco de dados
        ├── entity/          # JPA/Micronaut Data entities
        └── jdbc/            # Repositórios JDBC
```

### Camadas e Responsabilidades

#### Domínio (domain/)

**Regra de Ouro:** `domain` **NUNCA** depende de `application` ou `infrastructure`.

1. **`domain/entities`:** Modelos de negócio puros (POJOs)

```java
// domain/entities/Book.java - SEM anotações JPA, apenas Lombok
package mn_react.domain.entities;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {
    private Long id;
    private String title;
    private int pages;
}
```

**Lombok permitido:** `@Getter`, `@Setter`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor`

**Lombok proibido:** `@Data` (gera equals/hashCode incorreto), `@Value` (imutável demais)

2. **`domain/exception`:** Hierarquia de exceções de domínio (ver [ADR-012](012-exception-handling-strategy.md))

#### Aplicação (application/)

3. **`application/repository`:** Contratos (interfaces — ports de saída)

```java
// application/repository/BookRepository.java
package mn_react.application.repository;

public interface BookRepository {
    Book save(Book book);
    Optional<Book> findById(Long id);
    List<Book> findAll();
    boolean existsByTitleIgnoreCase(String title);
}
```

4. **`application/usecase`:** Regras de negócio

Use Cases são definidos como **interfaces** com implementações separadas:

```java
// application/usecase/book/CreateBookUseCase.java (interface)
package mn_react.application.usecase.book;

public interface CreateBookUseCase {
    Book execute(String title, int pages);
}

// application/usecase/book/impl/CreateBookUseCaseImpl.java (implementação)
package mn_react.application.usecase.book.impl;

public class CreateBookUseCaseImpl implements CreateBookUseCase {
    private final BookRepository bookRepository;
    
    public CreateBookUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    
    @Override
    public Book execute(String title, int pages) {
        validateTitle(title);
        validatePages(pages);
        checkForDuplicates(title.trim());
        return bookRepository.save(Book.builder().title(title.trim()).pages(pages).build());
    }
}
```

**Factory Pattern para Injeção:**

Use Cases são registrados via `@Factory` em `infrastructure/config/factories/`:

```java
// infrastructure/config/factories/BookUseCaseFactory.java
package mn_react.infrastructure.config.factories;

@Factory
public class BookUseCaseFactory {
    
    @Singleton
    CreateBookUseCase createBookUseCase(BookRepository bookRepository) {
        return new CreateBookUseCaseImpl(bookRepository);
    }
}
```

**Por quê Factory?**
- Permite injetar **interface** (DIP - Dependency Inversion Principle)
- Facilita testes (mock da interface, não da classe concreta)
- Centraliza configuração de beans de aplicação

#### Infraestrutura (infrastructure/)

5. **`infrastructure/http/controllers`:** Controllers REST

```java
@Controller("/books")
public class BookController {
    private final CreateBookUseCase createBookUseCase;
    
    @Post
    @Status(HttpStatus.CREATED)
    public BookResponse create(@Valid @Body CreateBookRequest dto) {
        Book book = createBookUseCase.execute(dto.getTitle(), dto.getPages());
        return BookResponse.fromDomain(book);
    }
}
```

6. **`infrastructure/persistence`:** Implementações Micronaut Data

```java
// infrastructure/persistence/entity/BookEntity.java
package mn_react.infrastructure.persistence.entity;

@Serdeable
@MappedEntity(value = "books")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BookEntity {
    @Id @GeneratedValue(GeneratedValue.Type.IDENTITY)
    private Long id;
    private String title;
    private int pages;
    
    // Conversores obrigatórios
    public Book toDomain() { /* ... */ }
    public static BookEntity fromDomain(Book book) { /* ... */ }
}
```

### Dependency Rule

**Fluxo de dependências:** `infrastructure` → `application` → `domain` (nunca o inverso)

```
infrastructure/http → application/usecase → application/repository ← infrastructure/persistence
                                                     ↑
                                              domain/entities
```

## Consequences

### Positive

- **Testabilidade:** Use cases testados sem banco/HTTP
- **Flexibilidade:** Trocar framework sem mudar core
- **Clareza:** Lógica de negócio isolada e visível
- **Manutenibilidade:** Mudanças de infraestrutura não afetam core

### Negative

- **Mais código:** Mappers entre domain/JPA entities
- **Curva de aprendizado:** Conceito de ports/adapters

### Neutral

- Ver [ADR-008](008-domain-vs-persistence-entities.md) para detalhes de mapeamento
- Ver [ADR-009](009-use-case-pattern.md) para regras de Use Cases
- Factories vivem em `infrastructure/config/factories/` (configuração de DI, pertence à infra)
