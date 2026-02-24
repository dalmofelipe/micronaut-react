package mn_react.infrastructure.persistence;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import jakarta.inject.Singleton;
import mn_react.application.repository.BookRepository;
import mn_react.domain.entities.Book;
import mn_react.infrastructure.persistence.entity.BookEntity;
import mn_react.infrastructure.persistence.jdbc.BookJdbcRepository;

@Singleton
public class BookRepositoryImpl implements BookRepository {

    private final BookJdbcRepository repository;

    public BookRepositoryImpl(BookJdbcRepository jdbcRepository) {
        this.repository = jdbcRepository;
    }

    @Override
    public List<Book> findAll() {
        return repository.findAll().stream()
            .map(BookEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public List<Book> findAll(int page, int size, String search) {
        int offset = page * size;
        return repository.findAllPaginated(offset, size, search).stream()
            .map(BookEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public long count() {
        return repository.count();
    }

    @Override
    public long count(String search) {
        return repository.countWithSearch(search);
    }

    @Override
    public Optional<Book> findById(Long id) {
        return repository.findById(id).map(BookEntity::toDomain);
    }

    @Override
    public Book save(Book book) {
        BookEntity entity = BookEntity.fromDomain(book);
        BookEntity saved = repository.save(entity);
        return saved.toDomain();
    }

    @Override
    public Book update(Book book) {
        BookEntity entity = BookEntity.fromDomain(book);
        BookEntity updated = repository.update(entity);
        return updated.toDomain();
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public boolean existsByTitleIgnoreCase(String title) {
        return repository.existsByTitleIgnoreCase(title);
    }

    @Override
    public boolean existsByTitleIgnoreCaseAndIdNot(String title, Long id) {
        return repository.findAll().stream()
            .anyMatch(book -> book.getTitle().equalsIgnoreCase(title) && !book.getId().equals(id));
    }
}
