# ADR-011: Clean Code Function Rules

**Status:** Accepted

**Tags:** `[backend, clean-code, functions]`

**Date:** 2026-02-07

---

## Context

Funções grandes e complexas criam problemas:
- Difícil entender o que fazem (cognitive load alto)
- Difícil testar (múltiplos caminhos lógicos)
- Difícil reutilizar (muita responsabilidade)
- Bugs escondem-se em complexidade

## Decision

Enforcement de **limites estritos** para funções/métodos.

### Regras Obrigatórias

#### 1. Máximo 20 Linhas por Método

```java
// ❌ ERRADO: Método de 50+ linhas
public Loan createLoan(CreateLoanRequest request) {
    User user = userRepository.findById(request.getUserId()).orElseThrow();
    if (!user.isActive()) throw new InactiveUserException();
    
    Book book = bookRepository.findById(request.getBookId()).orElseThrow();
    if (book.getQuantidadeDisponivel() <= 0) throw new BookUnavailableException();
    
    List<Loan> activeLoans = loanRepository.findActiveByUserId(user.getId());
    if (activeLoans.size() >= 3) throw new MaxLoansExceededException();
    
    Loan loan = new Loan();
    loan.setUser(user);
    loan.setBook(book);
    // ... mais 30 linhas
}

// ✅ CORRETO: Métodos pequenos e focados
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
```

#### 2. Máximo 4 Parâmetros

```java
// ❌ ERRADO: Muitos parâmetros
public void updateBook(Long id, String title, String author, 
                       String isbn, int qty, String genre) { }

// ✅ CORRETO: Usar objeto
public void updateBook(Long id, BookUpdateData data) { }

public record BookUpdateData(
    String title, String author, String isbn, int qty, String genre
) {}
```

#### 3. Single Level of Abstraction

Todos os statements do método devem estar no **mesmo nível de abstração**:

```java
// ❌ ERRADO: Mistura alto e baixo nível
public void processLoan(Long loanId) {
    Loan loan = loanRepository.findById(loanId).orElseThrow();
    loan.setStatus("RETURNED");
    
    // Baixo nível misturado
    String subject = "Devolução confirmada";
    String body = "Olá " + loan.getUser().getName();
    emailService.send(loan.getUser().getEmail(), subject, body);
}

// ✅ CORRETO: Mesmo nível de abstração
public void processLoan(Long loanId) {
    Loan loan = returnLoan(loanId);
    notifyUserAboutReturn(loan);
}

private Loan returnLoan(Long loanId) {
    Loan loan = findLoan(loanId);
    loan.markAsReturned();
    return loanRepository.save(loan);
}

private void notifyUserAboutReturn(Loan loan) {
    emailService.sendReturnConfirmation(loan.getUser(), loan.getBook());
}
```

#### 4. Faça Uma Coisa (Do One Thing)

Método deve fazer **apenas uma coisa** e fazê-la bem.

```java
// ❌ ERRADO: Faz múltiplas coisas
public Book createAndNotify(Book book) {
    validateIsbn(book.getIsbn());
    Book saved = repository.save(book);
    emailService.sendAdminNotification(saved); // Responsabilidade extra!
    return saved;
}

// ✅ CORRETO: Uma responsabilidade
public Book create(Book book) {
    validateIsbn(book.getIsbn());
    return repository.save(book);
}
```

#### 5. Evite Efeitos Colaterais

Método não deve fazer coisas "escondidas":

```java
// ❌ ERRADO: Efeito colateral escondido
public boolean checkPassword(String username, String password) {
    User user = userRepository.findByUsername(username);
    if (user.getPassword().equals(password)) {
        Session.initialize(); // Efeito colateral!
        return true;
    }
    return false;
}

// ✅ CORRETO: Separar responsabilidades
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

#### 6. Nomes Reveladores de Intenção

```java
// ❌ ERRADO
int d; // dias
public void proc(Book b) { }

// ✅ CORRETO
int daysUntilDue;
public void processLoanReturn(Book book) { }
```

## Consequences

### Positive

- **Legibilidade:** Código fácil de ler e entender
- **Testabilidade:** Métodos pequenos fáceis de testar
- **Manutenibilidade:** Mudanças localizadas
- **Reutilização:** Métodos focados podem ser reutilizados

### Negative

- **Mais métodos:** Crescimento no número de métodos privados
- **Navegação:** Precisa navegar entre métodos para entender fluxo

### Neutral

- Limite de 20 linhas é guideline (use bom senso para casos simples)
- Código autoexplicativo > Comentários
