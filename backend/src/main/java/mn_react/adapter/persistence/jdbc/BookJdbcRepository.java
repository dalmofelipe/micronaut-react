package mn_react.adapter.persistence.jdbc;

import java.util.List;
import java.util.Optional;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import mn_react.adapter.persistence.entity.BookEntity;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface BookJdbcRepository extends CrudRepository<BookEntity, Long> {
    
    List<BookEntity> findByActiveTrue();
    Optional<BookEntity> findByIdAndActiveTrue(Long id);
    Optional<BookEntity> findByIsbnAndActiveTrue(String isbn);
    
    List<BookEntity> findByGenreAndActiveTrue(String genre);
    List<BookEntity> findByAuthorContainingIgnoreCaseAndActiveTrue(String author);
    
    @Query("UPDATE books SET active = false WHERE id = :id AND active = true")
    int softDeleteById(Long id);
}
