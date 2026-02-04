package mn_react.core.repository;

import mn_react.core.domain.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    List<User> findAll();
    List<User> findAll(int page, int size, String search);
    long count();
    long count(String search);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    List<User> findByActive(Boolean active);
    User save(User user);
    User update(User user);
    void deleteById(Long id);
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, Long id);
}
