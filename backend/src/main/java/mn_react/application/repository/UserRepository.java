package mn_react.application.repository;

import java.util.List;
import java.util.Optional;

import mn_react.domain.entities.User;

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
