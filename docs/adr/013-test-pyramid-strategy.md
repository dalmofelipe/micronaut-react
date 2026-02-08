# ADR-013: Test Pyramid Strategy

**Status:** Accepted

**Tags:** `[backend, testing, quality]`

**Date:** 2026-02-07

---

## Context

Testes mal estruturados causam problemas:
- Testes E2E lentos dominam a suite (pirâmide invertida)
- Baixa cobertura de lógica de negócio
- Testes frágeis (quebram com mudanças de UI)
- Feedback lento (minutos para rodar testes)

## Decision

Adotamos a **Pirâmide de Testes** com foco em testes unitários.

### Pirâmide de Testes

```
        /\        E2E (poucos, críticos)
       /  \       5-10% dos testes
      /____\      Integration (alguns, camadas)
     /      \     20-30% dos testes
    /________\    Unit (muitos, lógica de negócio)
                  60-70% dos testes
```

### 1. Testes Unitários (JUnit 5 + Mockito)

**Alvo:** Use Cases (lógica de negócio isolada)

```java
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
        Book book = Book.builder()
            .title("Clean Code")
            .isbn("9780132350884")
            .build();
        
        when(bookRepository.save(any())).thenReturn(book);
        
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
        Book book = Book.builder().isbn("invalid").build();
        doThrow(new InvalidIsbnException("invalid"))
            .when(isbnValidator).validate("invalid");
        
        // When & Then
        assertThrows(InvalidIsbnException.class, 
                     () -> createBookUseCase.execute(book));
        verify(bookRepository, never()).save(any());
    }
}
```

**Características:**
- Sem banco, sem HTTP, sem framework
- Muito rápidos (< 1s cada)
- Foco em lógica de negócio
- Cobrem casos extremos (edge cases)

### 2. Testes de Integração (Micronaut Test)

**Alvo:** Controllers e Repositories (camadas + framework)

```java
@MicronautTest
class BookControllerTest {
    
    @Inject
    @Client("/")
    HttpClient client;
    
    @Test
    @DisplayName("POST /books deve criar livro e retornar 201")
    void shouldCreateBook() {
        // Given
        CreateBookRequest request = CreateBookRequest.builder()
            .title("Clean Code")
            .isbn("9780132350884")
            .quantidadeTotal(5)
            .build();
        
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
}
```

**Características:**
- Framework completo (Micronaut)
- Banco em memória (H2) ou Testcontainers
- Validam integração entre camadas
- Mais lentos que unitários (1-5s cada)

### 3. Testes de Repository (Testcontainers)

```java
@MicronautTest
@Testcontainers
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class BookRepositoryTest implements TestPropertyProvider {
    
    @Container
    static PostgreSQLContainer<?> postgres = 
        new PostgreSQLContainer<>("postgres:15");
    
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
        Book book = Book.builder().title("Test Book").build();
        
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

- **F**ast: Testes rápidos (< 1s cada unitário)
- **I**ndependent: Testes não dependem uns dos outros
- **R**epeatable: Funcionam em qualquer ambiente
- **S**elf-validating: Resultado claro (pass/fail)
- **T**imely: Escrever antes/junto com código (TDD ou junto)

### Cobertura de Código

**Meta:** > 80% de cobertura

```bash
./mvnw test jacoco:report
```

**Priorizar cobertura de:**
1. Use Cases (100% ideal)
2. Domain entities (métodos de lógica)
3. Exception handling (cenários de erro)

**Não priorizar:**
- DTOs (POJOs simples)
- Getters/Setters gerados
- Configurações (@Configuration)

## Consequences

### Positive

- **Feedback rápido:** Testes unitários rodam em segundos
- **Confiança:** Alta cobertura de lógica de negócio
- **Refatoração segura:** Testes garantem comportamento
- **Documentação viva:** Testes mostram como usar o código

### Negative

- **Mais código:** Testes são código adicional para manter
- **Setup inicial:** Testcontainers requer Docker

### Neutral

- TDD (Test-Driven Development) é recomendado mas não obrigatório
- Testes devem rodar em CI/CD (falha = build quebrado)
