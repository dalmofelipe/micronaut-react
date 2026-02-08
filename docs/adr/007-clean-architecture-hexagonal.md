# ADR-007: Clean Architecture with Hexagonal Ports & Adapters

**Status:** Accepted

**Tags:** `[backend, architecture, clean-architecture]`

**Date:** 2026-02-07

---

## Context

Arquiteturas tradicionais acoplam lógica de negócio à infraestrutura:
- Controllers contêm regras de negócio
- Entidades JPA vazam para camada de apresentação
- Difícil trocar banco de dados ou framework web
- Testes exigem ambiente completo (banco, servidor)

## Decision

Adotamos **Clean Architecture** com padrão **Hexagonal (Ports & Adapters)**:

```
src/main/java/mn_react/
├── core/                    # NÚCLEO (Business Logic)
│   ├── domain/
│   │   └── entities/       # Modelos de domínio puros
│   ├── repository/         # Interfaces (ports)
│   └── usecase/           # Lógica de negócio
└── adapter/               # ADAPTADORES (Infrastructure)
    ├── api/               # REST controllers
    │   └── dto/          # Request/Response DTOs
    └── persistence/      # Database adapters
        └── entity/       # JPA entities
```

### Camadas e Responsabilidades

#### Core (Núcleo)

**Regra de Ouro:** Core **NUNCA** depende de adapters.

1. **`core/domain/entities`:** Modelos de negócio puros (POJOs)

```java
// Book.java - SEM anotações JPA, apenas Lombok
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {
    private Long id;
    private String title;
    private String isbn;
    private int quantidadeTotal;
    private int quantidadeDisponivel;
    
    // Métodos de domínio (lógica de negócio)
    public boolean isAvailable() {
        return quantidadeDisponivel > 0;
    }
    
    public void reservar() {
        if (!isAvailable()) {
            throw new BookUnavailableException(id);
        }
        this.quantidadeDisponivel--;
    }
}
```

**Lombok permitido:** `@Getter`, `@Setter`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor`

**Lombok proibido:** `@Data` (gera equals/hashCode incorreto), `@Value` (imutável demais)

2. **`core/repository`:** Contratos (interfaces)

```java
public interface BookRepository {
    Book save(Book book);
    Optional<Book> findById(Long id);
    List<Book> findAll();
}
```

3. **`core/usecase`:** Regras de negócio

Use Cases são definidos como **interfaces** com implementações separadas:

```java
// core/usecase/book/CreateBookUseCase.java (interface)
public interface CreateBookUseCase {
    Book execute(Book book);
}

// core/usecase/book/impl/CreateBookUseCaseImpl.java (implementação)
public class CreateBookUseCaseImpl implements CreateBookUseCase {
    private final BookRepository repository;
    
    public CreateBookUseCaseImpl(BookRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public Book execute(Book book) {
        validateIsbn(book.getIsbn());
        return repository.save(book);
    }
    
    private void validateIsbn(String isbn) {
        // Validação de negócio
    }
}
```

**Factory Pattern para Injeção:**

Use Cases são registrados via `@Factory` em `config/factories/`:

```java
// config/factories/BookUseCaseFactory.java
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
- Centraliza configuração de beans do core

#### Adapters (Adaptadores)

1. **`adapter/api`:** Controllers REST

```java
@Controller("/books")
public class BookController {
    private final CreateBookUseCase createBookUseCase;
    
    @Post
    public BookResponse create(@Valid @Body CreateBookRequest dto) {
        Book book = createBookUseCase.execute(dto.toBook());
        return BookResponse.fromDomain(book);
    }
}
```

2. **`adapter/persistence`:** Implementações JPA

```java
@Serdeable
@MappedEntity(value = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookEntity {
    @Id @GeneratedValue
    private Long id;
    private String title;
    
    // Conversores
    public Book toDomain() { /* ... */ }
    public static BookEntity fromDomain(Book book) { /* ... */ }
}
```

### Dependency Rule

**Fluxo de dependências:** Adapters → Core (nunca o inverso)

```
adapter/api → core/usecase → core/repository ← adapter/persistence
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
- Factories vivem em `config/factories/` (camada de configuração, não core nem adapter)
