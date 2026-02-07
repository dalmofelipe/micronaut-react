package mn_react.core.repository;

import mn_react.core.domain.entities.Content;
import java.util.List;
import java.util.Optional;

public interface ContentRepository {
    Content save(Content content);
    Optional<Content> findById(Long id);
    List<Content> findAll();
    List<Content> findByAutorId(Long autorId);
    List<Content> findByStatus(String status);
    void deleteById(Long id);
}