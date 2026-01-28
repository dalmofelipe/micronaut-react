package mn_react.adapter.persistence.jdbc;

import java.util.List;
import java.util.Optional;

import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;
import mn_react.adapter.persistence.entity.UserEntity;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface UserJdbcRepository extends CrudRepository<UserEntity, Long> {
    
    List<UserEntity> findByActiveTrue();
    Optional<UserEntity> findByIdAndActiveTrue(Long id);
    Optional<UserEntity> findByEmailAndActiveTrue(String email);
}
