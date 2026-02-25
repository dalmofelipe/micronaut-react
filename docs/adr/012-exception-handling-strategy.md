# ADR-012: Layered Exception Handling Strategy

**Status:** Accepted

**Tags:** `[backend, exceptions, error-handling]`

**Date:** 2026-02-07

**Updated:** 2026-02-24

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

**Estrutura:** `DomainException` (base abstrata) → 6 exceções específicas

```java
// domain/exception/DomainException.java
public abstract class DomainException extends RuntimeException { /* ... */ }

// Exceções específicas (todas estendem DomainException):
NotFoundException           // 404
ValidationException         // 400
ConflictException          // 409
UnprocessableEntityException // 422
UnauthorizedException      // 401
ForbiddenException         // 403
```

**Localização:** `domain/exception/` (domínio, não infraestrutura)

### 2. Global Exception Handler

**Responsabilidades:**
- Captura `DomainException` e mapeia para HTTP
- Log automático por severidade (5xx = error, 4xx = warn)
- Produz `ErrorResponse` padronizado via Factory

```java
// infrastructure/http/exception/DomainExceptionHandler.java
@Produces @Singleton
@Requires(classes = {DomainException.class, ExceptionHandler.class})
public class DomainExceptionHandler 
    implements ExceptionHandler<DomainException, HttpResponse<ErrorResponse>> {
    
    private HttpStatus mapToHttpStatus(DomainException exception) {
        return switch (exception) {
            case NotFoundException e -> HttpStatus.NOT_FOUND;
            case ValidationException e -> HttpStatus.BAD_REQUEST;
            case ConflictException e -> HttpStatus.CONFLICT;
            case UnprocessableEntityException e -> HttpStatus.UNPROCESSABLE_ENTITY;
            // ... demais exceções
            default -> HttpStatus.INTERNAL_SERVER_ERROR;
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
    throw new UnprocessableEntityException("Livro indisponível");
}
if (hasOverdueLoans(loan.getUser())) {
    throw new ConflictException("Usuário possui empréstimos em atraso");
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
| `NotFoundException` | 404 | Recurso não encontrado | `new NotFoundException("Book", bookId)` |
| `ValidationException` | 400 | Entrada inválida | `new ValidationException("ISBN inválido")` |
| `ConflictException` | 409 | Estado inconsistente | `new ConflictException("ISBN já cadastrado")` |
| `UnprocessableEntityException` | 422 | Regra de negócio | `new UnprocessableEntityException("Livro indisponível")` |
| `UnauthorizedException` | 401 | Não autenticado | `new UnauthorizedException("Token inválido")` |
| `ForbiddenException` | 403 | Sem permissão | `new ForbiddenException("Acesso negado")` |
| `DomainException` (base) | 500 | Fallback genérico | Erros não mapeados |

### 5. Logs Automáticos

Handler faz log baseado na severidade:
- **5xx (≥500):** `LOG.error()` com stack trace
- **4xx (<500):** `LOG.warn()` apenas mensagem

**Regra:** Não faça try/catch nos Use Cases apenas para log - deixe propagar até o handler.

Use log manual apenas para auditoria ou eventos de negócio (não erros).

## Consequences

### Positive

- **Type Safety (Compile-time):** Impossível mapear exceção para HTTP status inválido
- **Pattern Matching:** Compilador avisa se esquecer de mapear nova exceção no switch
- **Domain-Driven Design:** Exceções expressam conceitos de negócio, não detalhes HTTP
- **Consistência:** Respostas de erro padronizadas via Factory
- **Logs automáticos:** Handler centraliza logging por severidade
- **Segurança:** Stack traces apenas em logs, nunca na resposta
- **Menos código:** Não precisa de enums ou tabelas de mapeamento
- **Semântica clara:** `throw new NotFoundException()` é autoexplicativo

### Negative

- **Mais classes:** 6 exceções em vez de 1 genérica com error code
- **Switch expression manual:** Precisa adicionar case para cada nova exceção (mas compilador avisa)
- **Decisão necessária:** Dev precisa escolher qual exceção usar (trade-off aceito pela clareza)

### Neutral

- **Princípio:** "Make Illegal States Unrepresentable" (Martin Fowler)
- Exceções vivem em `domain/exception` (conceitos de domínio, não infraestrutura)
- Handler vive em `infrastructure/http/exception` (tradução domínio → HTTP)
- Use `Optional` para queries (ex: `findById`) - reserve exceções para violações de regras
- `NotFoundException` tem construtor conveniente: `new NotFoundException("Book", id)`
- Abordagem orientada a **tipos** em vez de **strings/enums** (mais verbosa, mas muito mais segura)
