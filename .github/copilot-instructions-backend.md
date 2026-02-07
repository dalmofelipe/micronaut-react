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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateBookRequest {
    @NotBlank
    private String title;

    private String autor;

    @Pattern(regexp = "ISBN_REGEX")
    private String isbn;

    private String genero;

    @Min(1)
    private int quantidadeTotal;

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
    autor VARCHAR(255),
    isbn VARCHAR(13) UNIQUE,
    genero VARCHAR(100),
    quantidade_total INTEGER NOT NULL DEFAULT 1,
    quantidade_disponivel INTEGER NOT NULL DEFAULT 1,
    resumo TEXT,
    imagem_url VARCHAR(500),
    ativo BOOLEAN NOT NULL DEFAULT true,
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

---

## 🎯 Princípios SOLID Completos

### 1. Single Responsibility Principle (SRP) ✅
**Uma classe deve ter apenas uma razão para mudar**

```java
// ❌ ERRADO: Controller com lógica de negócio
@Controller("/books")
public class BookController {
    private final BookRepository repository;
    
    @Post
    public Book create(@Body Book book) {
        // Validação de negócio no controller (ERRADO!)
        if (book.getIsbn() == null || !isValidIsbn(book.getIsbn())) {
            throw new IllegalArgumentException("ISBN inválido");
        }
        return repository.save(book);
    }
}

// ✅ CORRETO: Responsabilidades separadas
@Controller("/books")
public class BookController {
    private final CreateBookUseCase createBookUseCase;
    
    @Post
    public BookResponse create(@Valid @Body CreateBookRequest request) {
        Book book = createBookUseCase.execute(request.toBook());
        return BookResponse.fromDomain(book);
    }
}

@Singleton
public class CreateBookUseCase {
    private final BookRepository repository;
    private final IsbnValidator isbnValidator;
    
    public Book execute(Book book) {
        isbnValidator.validate(book.getIsbn());
        return repository.save(book);
    }
}
```

### 2. Open/Closed Principle (OCP)
**Aberto para extensão, fechado para modificação**

```java
// ✅ Use interfaces para permitir extensão
public interface NotificationService {
    void notify(User user, String message);
}

@Singleton
public class EmailNotificationService implements NotificationService {
    public void notify(User user, String message) {
        // Enviar email
    }
}

@Singleton
public class SmsNotificationService implements NotificationService {
    public void notify(User user, String message) {
        // Enviar SMS
    }
}

// Use Case não precisa mudar para adicionar novos tipos de notificação
@Singleton
public class CreateLoanUseCase {
    private final List<NotificationService> notificationServices;
    
    public CreateLoanUseCase(List<NotificationService> notificationServices) {
        this.notificationServices = notificationServices;
    }
    
    public Loan execute(Loan loan) {
        // ... lógica de criação
        notificationServices.forEach(service -> 
            service.notify(loan.getUser(), "Empréstimo criado")
        );
        return loan;
    }
}
```

### 3. Liskov Substitution Principle (LSP)
**Subtipos devem ser substituíveis por seus tipos base**

```java
// ✅ CORRETO: Implementações respeitam o contrato
public interface BookRepository {
    Book save(Book book);
    Optional<Book> findById(Long id);
}

// Ambas implementações respeitam o contrato
@Singleton
public class JdbcBookRepository implements BookRepository {
    public Book save(Book book) {
        // Sempre retorna Book salvo
        // Nunca retorna null
    }
}

@Singleton
public class InMemoryBookRepository implements BookRepository {
    public Book save(Book book) {
        // Também sempre retorna Book salvo
        // Comportamento consistente
    }
}
```

**Regras LSP:**
- Não enfraqueça pré-condições (não exija mais do que a interface)
- Não fortaleça pós-condições (não prometa menos do que a interface)
- Não lance exceções não declaradas no contrato

### 4. Interface Segregation Principle (ISP)
**Clientes não devem depender de interfaces que não usam**

```java
// ❌ ERRADO: Interface muito grande
public interface BookService {
    Book create(Book book);
    Book update(Book book);
    void delete(Long id);
    List<Book> findAll();
    List<Book> findByGenre(String genre);
    void generateReport();
    void exportToCsv();
    void sendEmailNotification();
}

// ✅ CORRETO: Interfaces segregadas
public interface BookWriter {
    Book save(Book book);
    void delete(Long id);
}

public interface BookReader {
    Optional<Book> findById(Long id);
    List<Book> findAll();
    List<Book> findByGenre(String genre);
}

public interface BookReporter {
    void generateReport();
    void exportToCsv();
}

public interface BookNotifier {
    void sendEmailNotification(Book book);
}
```

### 5. Dependency Inversion Principle (DIP) ✅
**Dependa de abstrações, não de implementações concretas**

```java
// ❌ ERRADO: Dependência de implementação concreta
@Singleton
public class CreateLoanUseCase {
    private final JdbcLoanRepository repository; // Implementação concreta!
    
    public Loan execute(Loan loan) {
        return repository.save(loan);
    }
}

// ✅ CORRETO: Dependência de abstração
@Singleton
public class CreateLoanUseCase {
    private final LoanRepository repository; // Interface!
    
    public CreateLoanUseCase(LoanRepository repository) {
        this.repository = repository;
    }
    
    public Loan execute(Loan loan) {
        return repository.save(loan);
    }
}
```

---

## 🧹 Clean Code - Práticas Essenciais

### Nomenclatura

**✅ Nomes Reveladores de Intenção**
```java
// ❌ ERRADO
int d; // dias
List<Book> list1;
public void proc(Book b) { }

// ✅ CORRETO
int daysUntilDue;
List<Book> availableBooks;
public void processLoanReturn(Book book) { }
```

**✅ Evite Desinformação**
```java
// ❌ ERRADO: "List" no nome mas não é uma List
Book[] bookList;

// ✅ CORRETO
Book[] books;
List<Book> bookList;
```

**✅ Use Nomes Pronunciáveis e Buscáveis**
```java
// ❌ ERRADO
int dta; // data
String genModYmd; // generation modification year month day

// ✅ CORRETO
LocalDate creationDate;
LocalDateTime lastModificationTimestamp;
```

### Funções

**✅ Funções Pequenas (Máximo 20 linhas)**
```java
// ❌ ERRADO: Função muito grande
public Loan createLoan(CreateLoanRequest request) {
    // Validar usuário
    User user = userRepository.findById(request.getUserId())
        .orElseThrow(() -> new UserNotFoundException());
    if (!user.isActive()) {
        throw new InactiveUserException();
    }
    
    // Validar livro
    Book book = bookRepository.findById(request.getBookId())
        .orElseThrow(() -> new BookNotFoundException());
    if (book.getQuantidadeDisponivel() <= 0) {
        throw new BookUnavailableException();
    }
    
    // Verificar empréstimos ativos
    List<Loan> activeLoans = loanRepository.findActiveByUserId(user.getId());
    if (activeLoans.size() >= 3) {
        throw new MaxLoansExceededException();
    }
    
    // Criar empréstimo
    Loan loan = new Loan();
    loan.setUser(user);
    loan.setBook(book);
    loan.setDataEmprestimo(LocalDate.now());
    loan.setDataDevolucaoPrevista(LocalDate.now().plusDays(14));
    
    // Atualizar livro
    book.setQuantidadeDisponivel(book.getQuantidadeDisponivel() - 1);
    bookRepository.save(book);
    
    return loanRepository.save(loan);
}

// ✅ CORRETO: Funções pequenas e focadas
public Loan createLoan(CreateLoanRequest request) {
    User user = validateAndGetUser(request.getUserId());
    Book book = validateAndGetBook(request.getBookId());
    validateUserCanBorrow(user);
    
    Loan loan = buildLoan(user, book);
    decreaseBookAvailability(book);
    
    return loanRepository.save(loan);
}

private User validateAndGetUser(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new UserNotFoundException(userId));
    if (!user.isActive()) {
        throw new InactiveUserException(userId);
    }
    return user;
}

private Book validateAndGetBook(Long bookId) {
    Book book = bookRepository.findById(bookId)
        .orElseThrow(() -> new BookNotFoundException(bookId));
    if (!book.isAvailable()) {
        throw new BookUnavailableException(bookId);
    }
    return book;
}

private void validateUserCanBorrow(User user) {
    long activeLoansCount = loanRepository.countActiveByUserId(user.getId());
    if (activeLoansCount >= MAX_LOANS_PER_USER) {
        throw new MaxLoansExceededException(user.getId(), activeLoansCount);
    }
}
```

**✅ Faça Uma Coisa (Single Level of Abstraction)**
```java
// ❌ ERRADO: Mistura níveis de abstração
public void processLoan(Long loanId) {
    Loan loan = loanRepository.findById(loanId).orElseThrow();
    loan.setStatus("RETURNED");
    loanRepository.save(loan);
    
    // Baixo nível misturado com alto nível
    String subject = "Devolução confirmada";
    String body = "Olá " + loan.getUser().getName() + ", seu livro foi devolvido.";
    emailService.send(loan.getUser().getEmail(), subject, body);
}

// ✅ CORRETO: Mesmo nível de abstração
public void processLoan(Long loanId) {
    Loan loan = returnLoan(loanId);
    notifyUserAboutReturn(loan);
}

private Loan returnLoan(Long loanId) {
    Loan loan = loanRepository.findById(loanId)
        .orElseThrow(() -> new LoanNotFoundException(loanId));
    loan.markAsReturned();
    return loanRepository.save(loan);
}

private void notifyUserAboutReturn(Loan loan) {
    emailService.sendReturnConfirmation(loan.getUser(), loan.getBook());
}
```

**✅ Evite Efeitos Colaterais**
```java
// ❌ ERRADO: Função que faz mais do que promete
public boolean checkPassword(String username, String password) {
    User user = userRepository.findByUsername(username);
    if (user.getPassword().equals(password)) {
        Session.initialize(); // Efeito colateral!
        return true;
    }
    return false;
}

// ✅ CORRETO: Função faz apenas o que promete
public boolean checkPassword(String username, String password) {
    User user = userRepository.findByUsername(username);
    return user.getPassword().equals(password);
}

public void authenticateUser(String username, String password) {
    if (checkPassword(username, password)) {
        Session.initialize(); // Explícito
    }
}
```

### Comentários

**✅ Código deve ser autoexplicativo**
```java
// ❌ ERRADO: Comentário desnecessário
// Verifica se o usuário está ativo
if (user.isActive()) { }

// ✅ CORRETO: Código autoexplicativo (sem comentário)
if (user.isActive()) { }

// ✅ BOM: Comentário explica "porquê", não "o quê"
// ISBN-10 e ISBN-13 têm algoritmos de validação diferentes
// Referência: https://en.wikipedia.org/wiki/ISBN
if (isbn.length() == 10) {
    return validateIsbn10(isbn);
} else {
    return validateIsbn13(isbn);
}
```

---

## 🧪 Estratégias de Teste

### Pirâmide de Testes

```
        /\        E2E (poucos)
       /  \       
      /____\      Integration (alguns)
     /      \     
    /________\    Unit (muitos)
```

### 1. Testes Unitários (JUnit 5 + Mockito)

**Use Cases devem ter testes unitários**

```java
package mn_react.core.usecase;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CreateBookUseCaseTest {
    
    @Mock
    private BookRepository bookRepository;
    
    @Mock
    private IsbnValidator isbnValidator;
    
    @InjectMocks
    private CreateBookUseCase createBookUseCase;
    
    @Test
    @DisplayName("Deve criar livro com dados válidos")
    void shouldCreateBookWithValidData() {
        // Given
        Book book = new Book();
        book.setTitle("Clean Code");
        book.setIsbn("9780132350884");
        
        when(bookRepository.save(any(Book.class))).thenReturn(book);
        
        // When
        Book result = createBookUseCase.execute(book);
        
        // Then
        assertNotNull(result);
        assertEquals("Clean Code", result.getTitle());
        verify(isbnValidator).validate("9780132350884");
        verify(bookRepository).save(book);
    }
    
    @Test
    @DisplayName("Deve lançar exceção quando ISBN inválido")
    void shouldThrowExceptionWhenIsbnInvalid() {
        // Given
        Book book = new Book();
        book.setIsbn("invalid");
        
        doThrow(new InvalidIsbnException())
            .when(isbnValidator).validate("invalid");
        
        // When & Then
        assertThrows(InvalidIsbnException.class, () -> {
            createBookUseCase.execute(book);
        });
        
        verify(bookRepository, never()).save(any());
    }
}
```

### 2. Testes de Integração (Micronaut Test)

**Controllers e Repositories devem ter testes de integração**

```java
package mn_react.adapter.api;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

@MicronautTest
class BookControllerTest {
    
    @Inject
    @Client("/")
    HttpClient client;
    
    @Test
    @DisplayName("POST /books deve criar livro e retornar 201")
    void shouldCreateBook() {
        // Given
        CreateBookRequest request = new CreateBookRequest();
        request.setTitle("Clean Code");
        request.setAutor("Robert C. Martin");
        request.setIsbn("9780132350884");
        request.setQuantidadeTotal(5);
        
        // When
        var response = client.toBlocking().exchange(
            HttpRequest.POST("/books", request),
            BookResponse.class
        );
        
        // Then
        assertEquals(HttpStatus.CREATED, response.getStatus());
        assertNotNull(response.body());
        assertEquals("Clean Code", response.body().getTitle());
    }
    
    @Test
    @DisplayName("POST /books deve retornar 400 quando dados inválidos")
    void shouldReturn400WhenInvalidData() {
        // Given
        CreateBookRequest request = new CreateBookRequest();
        // title é obrigatório, não definido
        
        // When & Then
        var exception = assertThrows(Exception.class, () -> {
            client.toBlocking().exchange(
                HttpRequest.POST("/books", request),
                BookResponse.class
            );
        });
        
        assertTrue(exception.getMessage().contains("title"));
    }
}
```

### 3. Testes de Repository (Testcontainers)

```java
package mn_react.adapter.persistence;

import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import io.micronaut.test.support.TestPropertyProvider;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@MicronautTest
@Testcontainers
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class BookRepositoryTest implements TestPropertyProvider {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");
    
    @Inject
    BookRepository bookRepository;
    
    @Override
    public Map<String, String> getProperties() {
        return Map.of(
            "datasources.default.url", postgres.getJdbcUrl(),
            "datasources.default.username", postgres.getUsername(),
            "datasources.default.password", postgres.getPassword()
        );
    }
    
    @Test
    void shouldSaveAndFindBook() {
        // Given
        Book book = new Book();
        book.setTitle("Test Book");
        book.setIsbn("1234567890");
        
        // When
        Book saved = bookRepository.save(book);
        Book found = bookRepository.findById(saved.getId()).orElse(null);
        
        // Then
        assertNotNull(found);
        assertEquals("Test Book", found.getTitle());
    }
}
```

### Princípios F.I.R.S.T

- **F**ast: Testes devem rodar rapidamente (< 1s cada)
- **I**ndependent: Testes não devem depender uns dos outros
- **R**epeatable: Devem funcionar em qualquer ambiente
- **S**elf-validating: Resultado claro (pass/fail)
- **T**imely: Escrever testes ANTES ou JUNTO com o código

---

## ⚠️ Tratamento de Erros e Exceções

### Hierarquia de Exceções

```java
package mn_react.core.exception;

// Exceção base da aplicação
public abstract class BusinessException extends RuntimeException {
    private final String errorCode;
    
    protected BusinessException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public String getErrorCode() {
        return errorCode;
    }
}

// Exceções específicas de domínio
public class BookNotFoundException extends BusinessException {
    public BookNotFoundException(Long bookId) {
        super("BOOK_NOT_FOUND", "Livro não encontrado: " + bookId);
    }
}

public class BookUnavailableException extends BusinessException {
    public BookUnavailableException(Long bookId) {
        super("BOOK_UNAVAILABLE", "Livro indisponível: " + bookId);
    }
}

public class InvalidIsbnException extends BusinessException {
    public InvalidIsbnException(String isbn) {
        super("INVALID_ISBN", "ISBN inválido: " + isbn);
    }
}

public class MaxLoansExceededException extends BusinessException {
    public MaxLoansExceededException(Long userId, long currentLoans) {
        super("MAX_LOANS_EXCEEDED", 
              String.format("Usuário %d já possui %d empréstimos ativos", userId, currentLoans));
    }
}
```

### Global Exception Handler

```java
package mn_react.adapter.api.exception;

import io.micronaut.context.annotation.Requires;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;
import mn_react.core.exception.BusinessException;

@Produces
@Singleton
@Requires(classes = {BusinessException.class, ExceptionHandler.class})
public class BusinessExceptionHandler 
    implements ExceptionHandler<BusinessException, HttpResponse<ErrorResponse>> {
    
    @Override
    public HttpResponse<ErrorResponse> handle(HttpRequest request, BusinessException exception) {
        ErrorResponse errorResponse = new ErrorResponse(
            exception.getErrorCode(),
            exception.getMessage(),
            request.getPath()
        );
        
        return HttpResponse.badRequest(errorResponse);
    }
}

@Serdeable
public record ErrorResponse(
    String errorCode,
    String message,
    String path,
    LocalDateTime timestamp
) {
    public ErrorResponse(String errorCode, String message, String path) {
        this(errorCode, message, path, LocalDateTime.now());
    }
}
```

### Validação em Camadas

**1. Validação de Entrada (DTOs)**
```java
@Serdeable
public class CreateBookRequest {
    @NotBlank(message = "Título é obrigatório")
    @Size(min = 1, max = 255, message = "Título deve ter entre 1 e 255 caracteres")
    private String title;
    
    @Pattern(regexp = "^(97(8|9))?\\d{9}(\\d|X)$", message = "ISBN inválido")
    private String isbn;
    
    @Min(value = 1, message = "Quantidade deve ser maior que zero")
    private int quantidadeTotal;
}
```

**2. Validação de Negócio (Use Cases)**
```java
@Singleton
public class CreateLoanUseCase {
    public Loan execute(Loan loan) {
        validateBusinessRules(loan);
        return loanRepository.save(loan);
    }
    
    private void validateBusinessRules(Loan loan) {
        if (!loan.getBook().isAvailable()) {
            throw new BookUnavailableException(loan.getBook().getId());
        }
        
        if (hasOverdueLoans(loan.getUser())) {
            throw new UserHasOverdueLoansException(loan.getUser().getId());
        }
    }
}
```

---

## 📊 Qualidade de Código

### Métricas e Limites

| Métrica | Limite Recomendado |
|---------|-------------------|
| Linhas por método | < 20 |
| Parâmetros por método | < 4 |
| Complexidade ciclomática | < 10 |
| Cobertura de testes | > 80% |
| Linhas por classe | < 300 |

### Code Smells a Evitar

**❌ Long Method**
- Métodos com mais de 20 linhas
- Solução: Extrair métodos menores

**❌ Large Class**
- Classes com muitas responsabilidades
- Solução: Aplicar SRP, dividir em classes menores

**❌ Primitive Obsession**
```java
// ❌ ERRADO
public void createUser(String email, String cpf, String phone) { }

// ✅ CORRETO: Use Value Objects
public void createUser(Email email, Cpf cpf, PhoneNumber phone) { }
```

**❌ Feature Envy**
```java
// ❌ ERRADO: Método usa mais dados de outra classe
public class LoanService {
    public boolean isOverdue(Loan loan) {
        return loan.getDataDevolucaoPrevista().isBefore(LocalDate.now())
            && loan.getStatus().equals("ACTIVE");
    }
}

// ✅ CORRETO: Mover para a classe Loan
public class Loan {
    public boolean isOverdue() {
        return dataDevolucaoPrevista.isBefore(LocalDate.now()) 
            && status == LoanStatus.ACTIVE;
    }
}
```

**❌ Data Clumps**
```java
// ❌ ERRADO: Mesmos parâmetros sempre juntos
public void method1(String street, String city, String zipCode) { }
public void method2(String street, String city, String zipCode) { }

// ✅ CORRETO: Criar objeto
public record Address(String street, String city, String zipCode) { }
public void method1(Address address) { }
public void method2(Address address) { }
```

---

## 🔄 Refatoração Comum

### Extract Method
```java
// Antes
public void printOwing() {
    printBanner();
    System.out.println("name: " + name);
    System.out.println("amount: " + getOutstanding());
}

// Depois
public void printOwing() {
    printBanner();
    printDetails(getOutstanding());
}

private void printDetails(double outstanding) {
    System.out.println("name: " + name);
    System.out.println("amount: " + outstanding);
}
```

### Replace Conditional with Polymorphism
```java
// Antes
public double calculateFine(Loan loan) {
    if (loan.getType().equals("STUDENT")) {
        return loan.getDaysOverdue() * 0.5;
    } else if (loan.getType().equals("REGULAR")) {
        return loan.getDaysOverdue() * 1.0;
    } else if (loan.getType().equals("PREMIUM")) {
        return 0; // Sem multa
    }
    return 0;
}

// Depois
public interface LoanType {
    double calculateFine(int daysOverdue);
}

public class StudentLoan implements LoanType {
    public double calculateFine(int daysOverdue) {
        return daysOverdue * 0.5;
    }
}

public class RegularLoan implements LoanType {
    public double calculateFine(int daysOverdue) {
        return daysOverdue * 1.0;
    }
}

public class PremiumLoan implements LoanType {
    public double calculateFine(int daysOverdue) {
        return 0;
    }
}
```

---

## 📚 Recursos Adicionais

### Livros Recomendados
- **Clean Code** - Robert C. Martin
- **Clean Architecture** - Robert C. Martin
- **Refactoring** - Martin Fowler
- **Domain-Driven Design** - Eric Evans
- **Effective Java** - Joshua Bloch

### Links Úteis
- [Micronaut Documentation](https://docs.micronaut.io)
- [Baeldung - Java Tutorials](https://www.baeldung.com)
- [Refactoring Guru](https://refactoring.guru)
- [SOLID Principles](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
