## Micronaut 

```sh
export FRONTEND_URL=http://localhost:5173 && \
    mvn clean mn:run -Dmicronaut.test.resources.enabled=false
```


    Controller (adapter/api)
        ↓ recebe BookResponse (DTO com @Serdeable)
        ↓ converte para Book (domínio)
    UseCase (core)
        ↓ trabalha com Book (puro, SEM anotações)
    Repository (core - interface)
        ↓
    RepositoryImpl (adapter/persistence)
        ↓ converte Book ↔ BookEntity
    BookEntity (adapter/persistence com @MappedEntity)