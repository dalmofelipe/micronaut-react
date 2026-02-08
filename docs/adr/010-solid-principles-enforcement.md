# ADR-010: SOLID Principles Enforcement

**Status:** Accepted

**Tags:** `[backend, solid, clean-code, architecture]`

**Date:** 2026-02-07

---

## Context

Código sem princípios SOLID tende a:
- Classes com múltiplas responsabilidades (difícil manutenção)
- Acoplamento forte (mudanças em cascata)
- Código duplicado (falta de abstração)
- Difícil extensão (modificar código existente para adicionar features)

## Decision

Enforcement **estrito** dos 5 princípios SOLID em todo código backend.

### 1. Single Responsibility Principle (SRP)

**Uma classe, uma razão para mudar.**

```java
// ❌ ERRADO: Controller com lógica de negócio
@Controller("/books")
public class BookController {
    @Post
    public Book create(@Body Book book) {
        if (!isValidIsbn(book.getIsbn())) { // SRP violado!
            throw new IllegalArgumentException();
        }
        return repository.save(book);
    }
}

// ✅ CORRETO: Responsabilidades separadas
@Controller("/books")
public class BookController {
    private final CreateBookUseCase useCase;
    
    @Post
    public BookResponse create(@Valid @Body CreateBookRequest dto) {
        return BookResponse.fromDomain(useCase.execute(dto.toBook()));
    }
}

@Singleton
public class CreateBookUseCase {
    public Book execute(Book book) {
        isbnValidator.validate(book.getIsbn());
        return repository.save(book);
    }
}
```

### 2. Open/Closed Principle (OCP)

**Aberto para extensão, fechado para modificação.**

```java
// ✅ CORRETO: Interfaces permitem extensão
public interface NotificationService {
    void notify(User user, String message);
}

@Singleton
public class EmailNotificationService implements NotificationService {
    public void notify(User user, String message) { /* ... */ }
}

@Singleton
public class SmsNotificationService implements NotificationService {
    public void notify(User user, String message) { /* ... */ }
}

// Use Case não muda para adicionar novo tipo de notificação
public class CreateLoanUseCase {
    private final List<NotificationService> services;
    
    public Loan execute(Loan loan) {
        Loan created = repository.save(loan);
        services.forEach(s -> s.notify(loan.getUser(), "Empréstimo criado"));
        return created;
    }
}
```

### 3. Liskov Substitution Principle (LSP)

**Subtipos substituíveis pelos tipos base.**

```java
// ✅ CORRETO: Implementações respeitam o contrato
public interface BookRepository {
    Book save(Book book); // Nunca retorna null
    Optional<Book> findById(Long id); // Usa Optional
}

@Singleton
public class JdbcBookRepository implements BookRepository {
    public Book save(Book book) {
        // SEMPRE retorna Book salvo (nunca null)
        return entity.toDomain();
    }
}

@Singleton
public class InMemoryBookRepository implements BookRepository {
    public Book save(Book book) {
        // Comportamento CONSISTENTE com JdbcBookRepository
        return book;
    }
}
```

**Regras LSP:**
- Não enfraqueça pré-condições
- Não fortaleça pós-condições
- Não lance exceções não declaradas

### 4. Interface Segregation Principle (ISP)

**Interfaces pequenas e focadas.**

```java
// ❌ ERRADO: Interface muito grande
public interface BookService {
    Book create(Book book);
    void delete(Long id);
    List<Book> findAll();
    void generateReport();
    void exportToCsv();
}

// ✅ CORRETO: Interfaces segregadas
public interface BookWriter {
    Book save(Book book);
    void delete(Long id);
}

public interface BookReader {
    Optional<Book> findById(Long id);
    List<Book> findAll();
}

public interface BookReporter {
    void generateReport();
}
```

### 5. Dependency Inversion Principle (DIP)

**Dependa de abstrações, não de concretizações.**

```java
// ❌ ERRADO: Dependência de implementação concreta
public class CreateLoanUseCase {
    private final JdbcLoanRepository repository; // Concreta!
}

// ✅ CORRETO: Dependência de abstração
public class CreateLoanUseCase {
    private final LoanRepository repository; // Interface!
    
    public CreateLoanUseCase(LoanRepository repository) {
        this.repository = repository;
    }
}
```

**Regras DIP:**
- Use Cases dependem de **interfaces** (repositories)
- Controllers dependem de **interfaces** (use cases, se possível)
- Injeção **sempre via construtor**

## Consequences

### Positive

- **Manutenibilidade:** Mudanças localizadas
- **Testabilidade:** Fácil mockar dependências
- **Flexibilidade:** Extensível sem modificar código existente
- **Clareza:** Responsabilidades bem definidas

### Negative

- **Mais interfaces:** Abstração tem custo
- **Mais classes:** Uma classe por responsabilidade

### Neutral

- SOLID não é dogma - use bom senso
- Para operações triviais, pode simplificar (ex: getter/setter puro)
