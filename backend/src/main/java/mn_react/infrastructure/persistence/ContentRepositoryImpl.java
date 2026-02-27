package mn_react.infrastructure.persistence;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jakarta.inject.Singleton;
import mn_react.application.repository.ContentRepository;
import mn_react.domain.entities.Content;
import mn_react.infrastructure.persistence.entity.ContentEntity;
import mn_react.infrastructure.persistence.jdbc.ContentJdbcRepository;

@Singleton
public class ContentRepositoryImpl implements ContentRepository {

    private final ContentJdbcRepository jdbcRepository;

    public ContentRepositoryImpl(ContentJdbcRepository jdbcRepository) {
        this.jdbcRepository = jdbcRepository;
    }

    @Override
    public Content save(Content content) {
        ContentEntity entity = ContentEntity.fromDomain(content);
        ContentEntity saved = jdbcRepository.save(entity);
        return saved.toDomain();
    }

    @Override
    public Optional<Content> findById(Long id) {
        return jdbcRepository.findById(id).map(ContentEntity::toDomain);
    }

    @Override
    public List<Content> findAll() {
        return jdbcRepository.findAll().stream()
                .map(ContentEntity::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Content> findByAutorId(Long autorId) {
        return jdbcRepository.findByAutorId(autorId).stream()
                .map(ContentEntity::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Content> findByStatus(String status) {
        return jdbcRepository.findByStatus(status).stream()
                .map(ContentEntity::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        jdbcRepository.deleteById(id);
    }
}