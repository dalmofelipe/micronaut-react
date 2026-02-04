package mn_react.adapter.persistence;

import jakarta.inject.Singleton;
import mn_react.adapter.persistence.entity.UserEntity;
import mn_react.adapter.persistence.jdbc.UserJdbcRepository;
import mn_react.core.domain.entities.User;
import mn_react.core.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Singleton
public class UserRepositoryImpl implements UserRepository {

    private final UserJdbcRepository jdbcRepository;

    public UserRepositoryImpl(UserJdbcRepository jdbcRepository) {
        this.jdbcRepository = jdbcRepository;
    }

    @Override
    public List<User> findAll() {
        return jdbcRepository.findAll().stream()
            .map(UserEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public List<User> findAll(int page, int size, String search) {
        int offset = page * size;
        return jdbcRepository.findAllPaginated(offset, size, search).stream()
            .map(UserEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public long count() {
        return jdbcRepository.count();
    }

    @Override
    public long count(String search) {
        return jdbcRepository.countWithSearch(search);
    }

    @Override
    public Optional<User> findById(Long id) {
        return jdbcRepository.findById(id).map(UserEntity::toDomain);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jdbcRepository.findByEmail(email).map(UserEntity::toDomain);
    }

    @Override
    public List<User> findByActive(Boolean active) {
        return jdbcRepository.findByActive(active).stream()
            .map(UserEntity::toDomain)
            .collect(Collectors.toList());
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
    public void deleteById(Long id) {
        jdbcRepository.deleteById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return jdbcRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByEmailAndIdNot(String email, Long id) {
        return jdbcRepository.findAll().stream()
            .anyMatch(user -> user.getEmail().equalsIgnoreCase(email) && !user.getId().equals(id));
    }
}
