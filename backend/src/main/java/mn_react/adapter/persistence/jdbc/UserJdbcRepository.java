package mn_react.adapter.persistence.jdbc;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import mn_react.adapter.persistence.entity.UserEntity;

import java.util.List;
import java.util.Optional;

@JdbcRepository(dialect = Dialect.H2)
public interface UserJdbcRepository extends CrudRepository<UserEntity, Long> {
    
    Optional<UserEntity> findByEmail(String email);
    
    List<UserEntity> findByActive(Boolean active);
    
    boolean existsByEmail(String email);
    
    @Query("""
    SELECT * FROM users 
    WHERE (:search IS NULL OR :search = '' OR LOWER(name) 
    LIKE LOWER(CONCAT('%', :search, '%')) 
        OR LOWER(email) LIKE LOWER(CONCAT('%', :search, '%'))) 
    ORDER BY created_at 
    DESC LIMIT :size 
    OFFSET :offset
    """)
    List<UserEntity> findAllPaginated(int offset, int size, String search);
    
    @Query("""
    SELECT COUNT(*) FROM users 
    WHERE (:search IS NULL OR :search = '' OR LOWER(name) 
    LIKE LOWER(CONCAT('%', :search, '%')) 
        OR LOWER(email) 
    LIKE LOWER(CONCAT('%', :search, '%')))
    """)
    long countWithSearch(String search);
}
