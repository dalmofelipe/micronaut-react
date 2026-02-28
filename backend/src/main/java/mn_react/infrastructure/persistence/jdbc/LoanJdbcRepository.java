package mn_react.infrastructure.persistence.jdbc;

import java.time.LocalDate;
import java.util.List;

import io.micronaut.core.annotation.Nullable;
import io.micronaut.data.annotation.Query;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import mn_react.infrastructure.persistence.entity.LoanEntity;

@JdbcRepository(dialect = Dialect.H2)
public interface LoanJdbcRepository extends CrudRepository<LoanEntity, Long> {
    
    List<LoanEntity> findByUserId(Long userId);
    
    List<LoanEntity> findByBookId(Long bookId);
    
    List<LoanEntity> findByStatus(String status);
    
    long countByStatus(String status);
    
    @Query("""
    SELECT * FROM loans 
    WHERE data_prevista_devolucao < :currentDate 
        AND status = 'ATIVO'
    """)
    List<LoanEntity> findOverdue(LocalDate currentDate);
    
    @Query("""
    SELECT * FROM loans 
    WHERE (:status IS NULL OR status = :status) 
    ORDER BY data_emprestimo 
    DESC LIMIT :size 
    OFFSET :offset
    """)
    List<LoanEntity> findAllPaginated(int offset, int size, @Nullable String status);
    
    @Query("""
    SELECT COUNT(*) FROM loans 
    WHERE (:status IS NULL OR status = :status)
    """)
    Integer countWithFilters(@Nullable String status);
}
