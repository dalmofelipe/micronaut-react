# ADR-012: Layered Exception Handling Strategy

**Status:** Accepted `[UPDATED 2026-02-17]`

**Tags:** `[backend, exceptions, error-handling]`

**Date:** 2026-02-07

---

## Context

Tratamento de erros inconsistente causa problemas:
- Exceções genéricas (`RuntimeException`) sem contexto
- Stack traces expostos ao cliente (segurança)
- Difícil rastrear origem de erros
- Códigos HTTP inconsistentes

### Abordagens Avaliadas

**Opção A: Error Codes em String**
```java
throw new BusinessException("NOT_FOUND", "Livro não encontrado");
```
❌ Problema: Typos em runtime, sem validação em compile-time

**Opção B: Enum de Error Codes**
```java
throw new BusinessException(ErrorCode.NOT_FOUND, "...");
```
❌ Problema: Necessita mapeamento ErrorCode → HttpStatus, mais acoplamento

**Opção C: Type-Based (escolhida)**
```java
throw new NotFoundException("Book", bookId);
```
✅ Vantagens:
- **Type Safety:** Impossível criar exceção inválida (compile-time)
- **Pattern Matching:** Switch expressions com exhaustiveness checking (Java 21+)
- **DDD Alignment:** Exceções são conceitos de domínio, não códigos HTTP
- **Semântica explícita:** Nome da classe É o contrato
- **Menos acoplamento:** Sem enums/constantes compartilhadas entre camadas

## Decision

Estratégia de **exceções em camadas** com hierarquia customizada.

### 1. Hierarquia de Exceções

**Estrutura:** `DomainException` (base abstrata **sealed**) → 6 exceções específicas (**final**)

```java
// core/domain/exception/DomainException.java
public abstract sealed class DomainException extends RuntimeException
        permits NotFoundException, ValidationException, ConflictException,
                UnprocessableEntityException, UnauthorizedException, ForbiddenException { /* ... */ }

// Exceções específicas (todas final, estendem DomainException):
NotFoundException           // 404
ValidationException         // 400
ConflictException          // 409
UnprocessableEntityException // 422
UnauthorizedException      // 401
ForbiddenException         // 403
```

**Localização:** `core/domain/exception/` (domínio, não infraestrutura)

**Regras:**
- `DomainException` é `sealed` — o compilador garante que o switch no handler é exaustivo
- Todas as subclasses são `final` — impede sub-hierarquias não mapeadas
- Ao criar nova exceção: adicionar ao `permits` de `DomainException` e ao switch no `DomainExceptionHandler`

### 2. Global Exception Handler

**Responsabilidades:**
- Captura `DomainException` e mapeia para HTTP
- Log automático por severidade (5xx = error, 4xx = warn)
- Produz `ErrorResponse` padronizado via Factory

```java
// adapter/api/exception/DomainExceptionHandler.java
@Produces @Singleton
public class DomainExceptionHandler 
    implements ExceptionHandler<DomainException, HttpResponse<ErrorResponse>> {
    
    private HttpStatus mapToHttpStatus(DomainException exception) {
        return switch (exception) {
            case NotFoundException e -> HttpStatus.NOT_FOUND;
            case ValidationException e -> HttpStatus.BAD_REQUEST;
            case ConflictException e -> HttpStatus.CONFLICT;
            case UnprocessableEntityException e -> HttpStatus.UNPROCESSABLE_ENTITY;
            case UnauthorizedException e -> HttpStatus.UNAUTHORIZED;
            case ForbiddenException e -> HttpStatus.FORBIDDEN;
            // Sem default — sealed class garante exhaustiveness em compile-time
        };
    }
}
```

**Componentes auxiliares:**
- `ErrorResponse`: DTO com `timestamp`, `status`, `error`, `message`, `path`
- `ErrorResponseFactory`: Centraliza criação do ErrorResponse

### 3. Validação em Duas Camadas

**Camada 1: Bean Validation (DTOs)** - Validação de estrutura
```java
@Serdeable
public class CreateBookRequest {
    @NotBlank @Size(max = 255) private String title;
    @Pattern(regexp = "^(97(8|9))?\\d{9}(\\d|X)$") private String isbn;
}
```

**Camada 2: Business Validation (Use Cases)** - Regras de negócio
```java
if (!loan.getBook().isAvailable()) {
    throw new UnprocessableEntityException(BookMessages.unavailableForLoan(bookId));
}
if (hasOverdueLoans(loan.getUser())) {
    throw new ConflictException(LoanMessages.userHasOverdueLoans(userId));
}
```

**Quando usar:**
- `NotFoundException`: Recurso inexistente (404)
- `ValidationException`: Entrada inválida (400)
- `ConflictException`: Estado inconsistente (409)
- `UnprocessableEntityException`: Regra de negócio violada (422)

### 4. Mapeamento de Códigos HTTP

| Exceção | Código HTTP | Uso | Exemplo |
|---------|-------------|-----|---------|
| `NotFoundException` | 404 | Recurso não encontrado | `new NotFoundException(BookMessages.notFound(id))` |
| `ValidationException` | 400 | Entrada inválida | `new ValidationException(BookMessages.TITLE_REQUIRED)` |
| `ConflictException` | 409 | Estado inconsistente | `new ConflictException(BookMessages.duplicateTitle(title))` |
| `UnprocessableEntityException` | 422 | Regra de negócio | `new UnprocessableEntityException(UserMessages.HAS_ACTIVE_LOANS)` |
| `UnauthorizedException` | 401 | Não autenticado | `new UnauthorizedException("Token inválido")` |
| `ForbiddenException` | 403 | Sem permissão | `new ForbiddenException("Acesso negado")` |

> **Nota:** Não existe mais fallback `default → 500` no switch. O uso de `sealed class` garante que
> toda nova exceção será obrigatoriamente mapeada em compile-time.

### 5. Logs Automáticos

Handler faz log baseado na severidade:
- **5xx (≥500):** `LOG.error()` com stack trace
- **4xx (<500):** `LOG.warn()` apenas mensagem

**Regra:** Não faça try/catch nos Use Cases apenas para log - deixe propagar até o handler.

Use log manual apenas para auditoria ou eventos de negócio (não erros).

## Consequences

### Positive

- **Type Safety (Compile-time):** Impossível mapear exceção para HTTP status inválido
- **Sealed + Exhaustiveness:** `sealed class` + switch sem `default` = compilador **obriga** mapeamento de novas exceções
- **Domain-Driven Design:** Exceções expressam conceitos de negócio, não detalhes HTTP
- **Consistência:** Respostas de erro padronizadas via Factory
- **Message Catalogs:** Mensagens centralizadas por domínio em `core/domain/message/`
- **Logs automáticos:** Handler centraliza logging por severidade
- **Segurança:** Stack traces apenas em logs, nunca na resposta
- **Menos código:** Não precisa de enums ou tabelas de mapeamento
- **Semântica clara:** `throw new NotFoundException()` é autoexplicativo

### Negative

- **Mais classes:** 6 exceções + 1 catálogo de mensagens por domínio
- **Switch expression manual:** Precisa adicionar case para cada nova exceção (compilador garante via sealed)
- **Decisão necessária:** Dev precisa escolher qual exceção usar (trade-off aceito pela clareza)
- **`permits` explícito:** Ao criar nova exceção, precisa atualizar `DomainException.permits`

### Neutral

- **Princípio:** "Make Illegal States Unrepresentable" (Martin Fowler)
- Exceções vivem em `core/domain/exception` (conceitos de domínio, não infraestrutura)
- Handler vive em `adapter/api/exception` (tradução domínio → HTTP)
- Use `Optional` para queries (ex: `findById`) - reserve exceções para violações de regras
- `NotFoundException` tem construtor conveniente: `new NotFoundException("Book", id)`
- Abordagem orientada a **tipos** em vez de **strings/enums** (mais verbosa, mas muito mais segura)

### 6. Message Catalogs

Mensagens de erro são centralizadas em **catálogos por domínio** em `core/domain/message/`.

**Convenção:** Código (nomes de classes, constantes e métodos) em **inglês**. Valores das mensagens (texto para o usuário final) em **PT-BR**.

**Estrutura:**
```
core/domain/message/
├── BookMessages.java      ← Mensagens do domínio Book
├── UserMessages.java      ← Mensagens do domínio User
├── MediaMessages.java     ← Mensagens do domínio Media
└── ContentMessages.java   ← Mensagens do domínio Content
```

**Padrão do catálogo:**
```java
public final class BookMessages {
    private BookMessages() {}

    // Constantes para mensagens fixas
    public static final String TITLE_REQUIRED = "Título não pode estar vazio";
    public static final String PAGES_POSITIVE = "Número de páginas deve ser maior que 0";

    // Métodos estáticos para mensagens parametrizadas
    public static String notFound(Long id) {
        return "Livro não encontrado com id: %d".formatted(id);
    }
    public static String duplicateTitle(String title) {
        return "Já existe um livro com o título '%s'".formatted(title);
    }
}
```

**Uso nos Use Cases:**
```java
throw new ValidationException(BookMessages.TITLE_REQUIRED);
throw new NotFoundException(BookMessages.notFound(id));
throw new ConflictException(BookMessages.duplicateTitle(title));
```

**Regras:**
- Nunca usar strings inline em `throw new XxxException("...")` — sempre usar o catálogo
- Ao criar nova entidade de domínio, criar catálogo de mensagens correspondente
- Constantes (`static final String`) para mensagens sem parâmetros
- Métodos estáticos para mensagens com parâmetros (usando `String.formatted()`)

### 7. GenericExceptionHandler

`GenericExceptionHandler` captura exceções não-domínio e retorna HTTP 500.

**Detecção de ambiente:** Via `io.micronaut.context.env.Environment` injetado por construtor (nunca `@Value`).

```java
public GenericExceptionHandler(ErrorResponseFactory errorResponseFactory, Environment environment) {
    this.errorResponseFactory = errorResponseFactory;
    this.isDevelopment = environment.getActiveNames().contains("dev")
            || environment.getActiveNames().contains("test");
}
```

**Comportamento:**
- **Dev/Test:** Retorna message real da exceção (para debug)
- **Produção:** Retorna mensagem genérica `"Ocorreu um erro inesperado"` (segurança)
