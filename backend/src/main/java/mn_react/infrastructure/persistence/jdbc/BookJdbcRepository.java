package mn_react.infrastructure.persistence.jdbc;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import mn_react.infrastructure.persistence.entity.BookEntity;

import java.util.List;

@JdbcRepository(dialect = Dialect.H2)
public interface BookJdbcRepository extends CrudRepository<BookEntity, Long> {
    
    boolean existsByTitleIgnoreCase(String title);
    
    @Query("""
    SELECT * FROM books
    WHERE (
        :search IS NULL 
        OR :search = '' 
        OR LOWER(title) 
        LIKE LOWER(CONCAT('%', :search, '%'))
    ) 
    ORDER BY id 
    DESC LIMIT :size 
    OFFSET :offset
    """)
    List<BookEntity> findAllPaginated(int offset, int size, String search);
    
    @Query("""
    SELECT COUNT(*) 
    FROM books 
    WHERE (
        :search IS NULL 
        OR :search = '' 
        OR LOWER(title) 
        LIKE LOWER(CONCAT('%', :search, '%'))
    )
    """)
    long countWithSearch(String search);
}
