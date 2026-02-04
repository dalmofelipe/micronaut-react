package mn_react.adapter.persistence.jdbc;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import mn_react.adapter.persistence.entity.LoanEntity;

import java.time.LocalDate;
import java.util.List;

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
        AND (:userId IS NULL OR user_id = :userId) 
    ORDER BY data_emprestimo 
    DESC LIMIT :size 
    OFFSET :offset
    """)
    List<LoanEntity> findAllPaginated(int offset, int size, String status, Long userId);
    
    @Query("""
    SELECT COUNT(*) FROM loans 
    WHERE (:status IS NULL OR status = :status) 
        AND (:userId IS NULL OR user_id = :userId)
    """)
    long countWithFilters(String status, Long userId);
}
