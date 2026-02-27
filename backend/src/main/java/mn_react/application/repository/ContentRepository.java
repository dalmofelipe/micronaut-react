package mn_react.application.repository;

import java.util.List;
import java.util.Optional;

import mn_react.domain.entities.Content;

public interface ContentRepository {
    Content save(Content content);
    Optional<Content> findById(Long id);
    List<Content> findAll();
    List<Content> findByAutorId(Long autorId);
    List<Content> findByStatus(String status);
    void deleteById(Long id);
}