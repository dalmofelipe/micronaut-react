package mn_react.adapter.persistence.jdbc;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import mn_react.adapter.persistence.entity.ContentEntity;
import java.util.List;

@JdbcRepository(dialect = Dialect.H2)
public interface ContentJdbcRepository extends CrudRepository<ContentEntity, Long> {

    @Query("SELECT * FROM contents WHERE autor_id = :autorId")
    List<ContentEntity> findByAutorId(Long autorId);

    @Query("SELECT * FROM contents WHERE status = :status")
    List<ContentEntity> findByStatus(String status);
}