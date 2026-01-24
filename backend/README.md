## Micronaut 

```sh
export FRONTEND_URL=http://localhost:5173 && \
    mvn clean mn:run -Dmicronaut.test.resources.enabled=false
```

---

## 🏗️ Arquitetura: Clean Architecture Simplificada

Esta implementação segue **Clean Architecture** adaptada para projetos pequenos/médios, equilibrando **pureza arquitetural** com **velocidade de desenvolvimento**.

### 📂 Estrutura de Camadas

```
src/main/java/mn_react/
├── core/                           # ❤️ CORE (regras de negócio, 100% puro)
│   ├── domain/entities/            # Entidades de domínio (POJOs puros, sem anotações)
│   │   └── Book.java
│   ├── repository/                 # Interfaces (contratos de persistência)
│   │   └── BookRepository.java
│   └── usecase/                    # Lógica de negócio complexa
│       ├── CreateBookUseCase.java  # Interface
│       └── impl/
│           └── CreateBookUseCaseImpl.java  # Implementação (sem @Singleton)
│
├── adapter/                        # 🔌 ADAPTERS (detalhes de infraestrutura)
│   ├── api/                        # Controllers REST
│   │   ├── BookController.java
│   │   └── dto/                    # DTOs/Views (podem ter @Serdeable)
│   │       ├── BookResponse.java
│   │       └── CreateBookRequest.java
│   └── persistence/                # Acesso ao banco de dados
│       ├── BookRepositoryImpl.java # Implementa interface do core + mapeia Entity↔Domain
│       ├── entity/                 # Entidades JPA/JDBC (com anotações framework)
│       │   └── BookEntity.java
│       └── jdbc/                   # Repositórios JDBC do Micronaut Data
│           └── BookJdbcRepository.java
│
└── config/                         # ⚙️ CONFIGURAÇÃO (beans, factories, loaders)
    ├── DataLoader.java             # Seed de dados iniciais
    └── UseCaseFactory.java         # Factory para UseCases (mantém core puro)
```

---

### 🔄 Fluxo de Dados

#### **Operação Simples (CRUD direto):**
```
GET /books
    ↓
Controller → Repository (interface) → RepositoryImpl → JDBC → BD
    ↓              ↓ (Book domain)         ↓ (mapeia)      ↓ (BookEntity)
BookResponse
```

#### **Operação Complexa (com lógica de negócio):**
```
POST /books
    ↓
Controller → UseCase → Repository → RepositoryImpl → JDBC → BD
    ↓          ↓           ↓              ↓             ↓
DTO      validações   Book domain    mapeia      BookEntity
         normalização
         duplicatas
```

---

### 🎯 Quando Usar Cada Camada

| Operação | Camada | Motivo |
|----------|--------|--------|
| **CRUD simples** (findAll, findById) | Controller → Repository | Sem lógica de negócio |
| **Criar/Atualizar** com validações | Controller → **UseCase** → Repository | Validações, normalização, duplicatas |
| **Operações complexas** | Controller → **UseCase** → Repository | Múltiplas entidades, transações, workflows |

**Exemplo prático:**
- ✅ `GET /books` → Controller chama `bookRepository.findAll()` direto
- ✅ `POST /books` → Controller chama `createBookUseCase.execute()` (validações + normalização)

---

### 🧩 Responsabilidades por Camada

#### **1. Core (100% puro)**
- **domain/entities:** POJOs sem anotações de framework
- **repository:** Interfaces que definem contratos de persistência
- **usecase:** Lógica de negócio complexa (validações, regras, orquestrações)

**Regra:** Core NÃO conhece frameworks (Micronaut, JPA, Jackson). É portável e testável.

#### **2. Adapter (detalhes técnicos)**
- **api/dto:** DTOs para request/response (podem ter `@Serdeable`, validações)
- **api/controllers:** Endpoints REST, conversão DTO ↔ Domain
- **persistence/entity:** Entidades de BD (com `@MappedEntity`, `@Id`, etc)
- **persistence/impl:** Implementa interfaces do core, mapeia Entity ↔ Domain

**Regra:** Adapters fazem a ponte entre core puro e frameworks externos.

#### **3. Config (glue code)**
- **UseCaseFactory:** Instancia UseCases sem poluir core com `@Singleton`
- **DataLoader:** Seeds de dados, bootstrapping

---

### ✨ Benefícios Desta Abordagem

| Aspecto | Clean Arch Tradicional | Nossa Implementação | MVC Puro |
|---------|----------------------|---------------------|----------|
| **Velocidade dev** | 🐢 Lenta | ⚡ Rápida | ⚡⚡ Muito rápida |
| **Testabilidade** | ✅ Excelente | ✅ Excelente | ⚠️ Média |
| **Manutenibilidade** | ✅ Alta | ✅ Alta | ⚠️ Baixa (código cresce) |
| **Portabilidade** | ✅ Máxima | ✅ Alta | ❌ Baixa |
| **Curva aprendizado** | 📈 Alta | 📊 Média | 📉 Baixa |

**Trade-offs aceitos:**
- ✅ CRUD simples vai direto ao Repository (sem UseCase desnecessário)
- ✅ `@Factory` em config ao invés de anotar UseCases
- ✅ Menos camadas que Clean Arch purista (sem interactors, gateways, etc)

---

### 📖 Exemplo Completo: Criar Livro

**1. DTO de entrada (adapter/api/dto):**
```java
@Serdeable
public class CreateBookRequest {
    @NotBlank
    private String title;
    @Min(1)
    private int pages;
}
```

**2. Controller (adapter/api):**
```java
@Post
HttpResponse<BookResponse> createBook(@Valid @Body CreateBookRequest request) {
    Book created = createBookUseCase.execute(request.getTitle(), request.getPages());
    return HttpResponse.created(toResponse(created));
}
```

**3. UseCase (core/usecase):**
```java
public Book execute(String title, int pages) {
    validateTitle(title);           // Lógica de negócio
    String normalized = normalize(title);
    checkDuplicates(normalized);    // Regra: sem livros duplicados
    return bookRepository.save(...);
}
```

**4. Repository (adapter/persistence):**
```java
public Book save(Book book) {
    BookEntity entity = toEntity(book);      // Converte Domain → Entity
    BookEntity saved = jdbcRepo.save(entity);
    return toDomain(saved);                  // Converte Entity → Domain
}
```

---

### 🧪 Testabilidade

**Core isolado (fácil de testar):**
```java
@Test
void shouldRejectDuplicateBooks() {
    BookRepository mockRepo = mock(BookRepository.class);
    CreateBookUseCaseImpl useCase = new CreateBookUseCaseImpl(mockRepo);
    
    when(mockRepo.findAll()).thenReturn(List.of(existingBook));
    
    assertThrows(IllegalStateException.class, 
        () -> useCase.execute("Existing Book", 300));
}
```

**Sem dependência de BD, Micronaut, HTTP!**

---

### 🚀 Próximos Passos (quando necessário)

1. **Adicionar UseCase complexo:**
   - Criar interface em `core/usecase/`
   - Implementar em `core/usecase/impl/` (sem anotações)
   - Registrar em `config/UseCaseFactory.java`

2. **Nova entidade:**
   - Criar `core/domain/entities/Author.java` (POJO puro)
   - Criar `adapter/persistence/entity/AuthorEntity.java` (com anotações)
   - Criar `adapter/persistence/AuthorRepositoryImpl.java` (mapper)

3. **Validação customizada:**
   - Criar em `core/domain/validation/` (regras de negócio)
   - Usar nos UseCases

---

### 📚 Referências

- [Clean Architecture (Uncle Bob)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Micronaut Framework](https://micronaut.io)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)

---

**Resumo:** Esta arquitetura mantém o **core puro e testável** sem sacrificar **velocidade de desenvolvimento**. Perfeita para projetos que precisam crescer de forma organizada! 🎯