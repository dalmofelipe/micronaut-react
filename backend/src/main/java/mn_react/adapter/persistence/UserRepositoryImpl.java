package mn_react.adapter.persistence;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jakarta.inject.Singleton;
import mn_react.adapter.persistence.entity.UserEntity;
import mn_react.adapter.persistence.jdbc.UserJdbcRepository;
import mn_react.core.domain.entities.User;
import mn_react.core.repository.UserRepository;

@Singleton
public class UserRepositoryImpl implements UserRepository {

    private final UserJdbcRepository jdbcRepository;

    public UserRepositoryImpl(UserJdbcRepository jdbcRepository) {
        this.jdbcRepository = jdbcRepository;
    }

    @Override
    public List<User> findAll() {
        return jdbcRepository.findByActiveTrue().stream()
            .map(UserEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public Optional<User> findById(Long id) {
        return jdbcRepository.findByIdAndActiveTrue(id)
            .map(UserEntity::toDomain);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jdbcRepository.findByEmailAndActiveTrue(email)
            .map(UserEntity::toDomain);
    }

    @Override
    public User save(User user) {
        UserEntity entity = UserEntity.fromDomain(user);
        UserEntity saved = jdbcRepository.save(entity);
        return saved.toDomain();
    }

    @Override
    public User update(User user) {
        UserEntity entity = UserEntity.fromDomain(user);
        UserEntity updated = jdbcRepository.update(entity);
        return updated.toDomain();
    }

    @Override
    public void softDelete(Long id) {
        jdbcRepository.findById(id).ifPresent(entity -> {
            entity.setActive(false);
            jdbcRepository.update(entity);
        });
    }
}
