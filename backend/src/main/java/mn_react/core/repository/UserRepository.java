package mn_react.core.repository;

import java.util.List;
import java.util.Optional;

import mn_react.core.domain.entities.User;

public interface UserRepository {
    List<User> findAll();
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    User save(User user);
    User update(User user);
    void softDelete(Long id);
}
