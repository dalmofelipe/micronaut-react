# ADR-009: Use Case Pattern for Business Logic

**Status:** Accepted

**Tags:** `[backend, use-cases, clean-architecture]`

**Date:** 2026-02-07

**Updated:** 2026-02-24

---

## Context

Controllers tradicionais misturam responsabilidades:
- Validação HTTP + Regras de negócio + Chamadas ao banco
- Lógica espalhada em múltiplos controllers
- Dificulta reutilização (ex: mesma lógica em REST + GraphQL)
- Testes acoplados ao framework web

## Decision

Toda **lógica de negócio** vive em **Use Cases** dedicados em `application/usecase/`.

### Estrutura de Use Case

Use Cases seguem o padrão **Interface + Implementação**:

```java
// application/usecase/book/CreateBookUseCase.java (interface)
package mn_react.application.usecase.book;

import mn_react.domain.entities.Book;

public interface CreateBookUseCase {
    Book execute(String title, int pages);
}
```

```java
// application/usecase/book/impl/CreateBookUseCaseImpl.java (implementação)
package mn_react.application.usecase.book.impl;

import mn_react.domain.entities.Book;
import mn_react.application.repository.BookRepository;
import mn_react.application.usecase.book.CreateBookUseCase;
import mn_react.domain.exception.ConflictException;
import mn_react.domain.exception.ValidationException;

public class CreateBookUseCaseImpl implements CreateBookUseCase {
    private final BookRepository bookRepository;
    
    // Injeção via construtor
    public CreateBookUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    
    @Override
    public Book execute(String title, int pages) {
        // 1. Validações de negócio
        validateTitle(title);
        validatePages(pages);
        
        String normalizedTitle = title.trim().replaceAll("\\s+", " ");
        
        // 2. Verifica duplicidade
        checkForDuplicates(normalizedTitle);
        
        // 3. Persistência
        return bookRepository.save(Book.builder()
            .title(normalizedTitle)
            .pages(pages)
            .build());
    }
    
    // Métodos privados para organização
    private void validateTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new ValidationException("Title cannot be empty");
        }
    }
    
    private void validatePages(int pages) {
        if (pages <= 0) {
            throw new ValidationException("Pages must be greater than 0");
        }
    }
    
    private void checkForDuplicates(String title) {
        if (bookRepository.existsByTitleIgnoreCase(title)) {
            throw new ConflictException("A book with title '" + title + "' already exists");
        }
    }
}
```

### Factory Pattern para Registro

Use Cases são registrados como beans via `@Factory`:

```java
// infrastructure/config/factories/BookUseCaseFactory.java
package mn_react.infrastructure.config.factories;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.application.repository.BookRepository;
import mn_react.application.usecase.book.CreateBookUseCase;
import mn_react.application.usecase.book.UpdateBookUseCase;
import mn_react.application.usecase.book.DeleteBookUseCase;
import mn_react.application.usecase.book.impl.CreateBookUseCaseImpl;
import mn_react.application.usecase.book.impl.UpdateBookUseCaseImpl;
import mn_react.application.usecase.book.impl.DeleteBookUseCaseImpl;

@Factory
public class BookUseCaseFactory {
    
    @Singleton
    CreateBookUseCase createBookUseCase(BookRepository bookRepository) {
        return new CreateBookUseCaseImpl(bookRepository);
    }
    
    @Singleton
    UpdateBookUseCase updateBookUseCase(BookRepository bookRepository) {
        return new UpdateBookUseCaseImpl(bookRepository);
    }
    
    @Singleton
    DeleteBookUseCase deleteBookUseCase(BookRepository bookRepository) {
        return new DeleteBookUseCaseImpl(bookRepository);
    }
}
```

**Localização:** Factories vivem em `infrastructure/config/factories/` (configuração de DI, pertence à infra)

### Regras de Use Cases

1. **Um Use Case = Uma operação de negócio**
   - `CreateBookUseCase`
   - `RenewLoanUseCase`
   - `CalculateFineUseCase`

2. **Nomenclatura:** `<Verbo><Entidade>UseCase`
   - ✅ `CreateBookUseCase`, `UpdateUserUseCase`
   - ❌ `BookService`, `UserManager`

3. **Estrutura:** Interface + Implementação
   - Interface em `application/usecase/<entity>/`
   - Implementação em `application/usecase/<entity>/impl/`
   - Sufixo `Impl` obrigatório na classe concreta

4. **Método principal:** `execute()` ou nome descritivo
   - `execute(Book book)` ou `createBook(Book book)`

5. **Injeção de dependências:** Sempre via construtor
   - Injeta **interfaces** (repositories, outros use cases)
   - Nunca injeta classes concretas

6. **Registro:** Via `@Factory` em `infrastructure/config/factories/`
   - Uma factory por domínio (BookUseCaseFactory, LoanUseCaseFactory)
   - Factory retorna interface, não implementação

7. **Validações:** Use Cases contêm validações de negócio
   - Bean Validation é para estrutura de dados (DTOs)
   - Use Cases validam regras de domínio

### Controller apenas Orquestra

```java
@Controller("/books")
public class BookController {
    private final CreateBookUseCase createBookUseCase;
    
    public BookController(CreateBookUseCase createBookUseCase) {
        this.createBookUseCase = createBookUseCase;
    }
    
    @Post
    @Status(HttpStatus.CREATED)
    public BookResponse create(@Valid @Body CreateBookRequest request) {
        // 1. Converte DTO → Domain
        Book book = request.toBook();
        
        // 2. Chama Use Case (lógica de negócio)
        Book created = createBookUseCase.execute(book);
        
        // 3. Converte Domain → DTO
        return BookResponse.fromDomain(created);
    }
}
```

**Controller NÃO faz:**
- ❌ Validações de negócio
- ❌ Chamadas diretas a repositories
- ❌ Lógica de transformação complexa

**Controller FAZ:**
- ✅ Validação de estrutura (Bean Validation)
- ✅ Conversão DTO ↔ Domain
- ✅ Orquestração (chama Use Cases)

### Organização por Feature

```
application/usecase/
├── book/
│   ├── CreateBookUseCase.java
│   ├── UpdateBookUseCase.java
│   ├── DeleteBookUseCase.java
│   └── impl/
│       ├── CreateBookUseCaseImpl.java
│       ├── UpdateBookUseCaseImpl.java
│       └── DeleteBookUseCaseImpl.java
└── loan/
    ├── CreateLoanUseCase.java
    ├── RenewLoanUseCase.java
    └── impl/
```

## Consequences

### Positive

- **Single Responsibility:** Use Case faz apenas uma coisa
- **Testabilidade:** Testes unitários sem framework web
- **Reutilização:** Lógica disponível para REST/GraphQL/CLI
- **Clareza:** Casos de uso explícitos no código

### Negative

- **Mais classes:** Um Use Case por operação
- **Indireção:** Controllers não contêm lógica diretamente

### Neutral

- Use Cases podem chamar outros Use Cases (composição)
- Para operações simples (CRUD sem regras), Use Case pode ser thin wrapper
