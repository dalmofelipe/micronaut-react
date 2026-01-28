package mn_react.adapter.persistence.jdbc;

import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import mn_react.adapter.persistence.entity.BookEntity;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface BookJdbcRepository extends CrudRepository<BookEntity, Long> {
    boolean existsByTitleIgnoreCase(String title);
}
