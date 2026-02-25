# ADR-008: Domain Entity vs Persistence Entity Separation

**Status:** Accepted

**Tags:** `[backend, entities, clean-architecture, jpa]`

**Date:** 2026-02-07

**Updated:** 2026-02-24

---

## Context

Usar **uma única classe** como entidade de domínio E entidade JPA cria problemas:
- Anotações JPA poluem modelo de negócio (`@Column`, `@ManyToOne`, etc.)
- Mudanças no schema quebram lógica de negócio
- Dificulta testes unitários (JPA precisa de contexto)
- Viola Clean Architecture (core dependendo de infraestrutura)

## Decision

Separamos **Domain Entities** (core) de **Persistence Entities** (adapter).

### Domain Entity (domain/entities)

**Modelo de negócio puro** sem anotações de infraestrutura:

```java
package mn_react.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

**Características:**
- Zero anotações JPA ou Micronaut Data
- **Lombok permitido:** `@Getter`, `@Setter`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor`
- **Lombok proibido:** `@Data` (equals/hashCode pode causar bugs), `@Value` (entidades precisam ser mutáveis)
- Métodos de lógica de negócio
- Pode ter validações de domínio

### JPA Entity (infrastructure/persistence/entity)

**Mapeamento para banco de dados** com conversores:

```java
package mn_react.infrastructure.persistence.entity;

import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.domain.entities.Book;

@Serdeable
@MappedEntity(value = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookEntity {
    @Id
    @GeneratedValue(GeneratedValue.Type.IDENTITY)
    private Long id;
    
    private String title;
    
    private int pages;
    
    // Conversores OBRIGATÓRIOS
    public Book toDomain() {
        return Book.builder()
            .id(this.id)
            .title(this.title)
            .pages(this.pages)
            .build();
    }
    
    public static BookEntity fromDomain(Book book) {
        return BookEntity.builder()
            .id(book.getId())
            .title(book.getTitle())
            .pages(book.getPages())
            .build();
    }
}
```

**Características:**
- Anotações Micronaut Data (`@MappedEntity`, `@Id`, `@GeneratedValue`)
- Anotação `@Serdeable` para serialização JSON
- **Lombok obrigatório:** Mesmas anotações do Domain Entity (`@Getter`, `@Setter`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor`)
- Sufixo `Entity` obrigatório no nome da classe
- Métodos `toDomain()` e `fromDomain()` **obrigatórios**
- Sem lógica de negócio

### Conversão em Repositories

```java
// infrastructure/persistence/BookRepositoryImpl.java
@Singleton
public class BookRepositoryImpl implements BookRepository {
    private final BookJdbcRepository repository;
    
    @Override
    public Book save(Book book) {
        BookEntity entity = BookEntity.fromDomain(book);
        BookEntity saved = repository.save(entity);
        return saved.toDomain();
    }
    
    @Override
    public Optional<Book> findById(Long id) {
        return repository.findById(id)
            .map(BookEntity::toDomain);
    }
}
```

### Nomenclatura

| Tipo | Localização | Nome | Exemplo |
|------|-------------|------|---------|
| Domain Entity | `domain/entities` | Sem sufixo | `Book.java` |
| JPA Entity | `infrastructure/persistence/entity` | Sufixo `Entity` | `BookEntity.java` |
| Repository Interface | `application/repository` | Sem sufixo | `BookRepository.java` |
| Repository Impl | `infrastructure/persistence` | Sufixo `Impl` | `BookRepositoryImpl.java` |

## Consequences

### Positive

- **Separação de concerns:** Negócio vs Persistência
- **Testabilidade:** Domain entities testados sem banco
- **Flexibilidade:** Trocar ORM sem afetar core
- **Clean Architecture:** Core independente de infraestrutura

### Negative

- **Código duplicado:** Mesmos campos em duas classes
- **Mappers necessários:** `toDomain()` / `fromDomain()` em todos entities
- **Mais arquivos:** 2 classes por entidade

### Neutral

- Trade-off aceito: duplicação vs separação de concerns
- Mappers podem ser automatizados (MapStruct) se necessário
