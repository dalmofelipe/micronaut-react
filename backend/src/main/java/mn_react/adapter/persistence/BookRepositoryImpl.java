package mn_react.adapter.persistence;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jakarta.inject.Singleton;
import mn_react.adapter.persistence.entity.BookEntity;
import mn_react.adapter.persistence.jdbc.BookJdbcRepository;
import mn_react.core.domain.entities.Book;
import mn_react.core.repository.BookRepository;

@Singleton
public class BookRepositoryImpl implements BookRepository {

    private final BookJdbcRepository jdbcRepository;

    public BookRepositoryImpl(BookJdbcRepository jdbcRepository) {
        this.jdbcRepository = jdbcRepository;
    }

    @Override
    public List<Book> findAll() {
        return jdbcRepository.findAll().stream()
            .map(BookEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public List<Book> findAll(int page, int size, String search) {
        int offset = page * size;
        return jdbcRepository.findAllPaginated(offset, size, search).stream()
            .map(BookEntity::toDomain)
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
    public Optional<Book> findById(Long id) {
        return jdbcRepository.findById(id).map(BookEntity::toDomain);
    }

    @Override
    public Book save(Book book) {
        BookEntity entity = BookEntity.fromDomain(book);
        BookEntity saved = jdbcRepository.save(entity);
        return saved.toDomain();
    }

    @Override
    public Book update(Book book) {
        BookEntity entity = BookEntity.fromDomain(book);
        BookEntity updated = jdbcRepository.update(entity);
        return updated.toDomain();
    }

    @Override
    public void deleteById(Long id) {
        jdbcRepository.deleteById(id);
    }

    @Override
    public boolean existsByTitleIgnoreCase(String title) {
        return jdbcRepository.existsByTitleIgnoreCase(title);
    }

    @Override
    public boolean existsByTitleIgnoreCaseAndIdNot(String title, Long id) {
        return jdbcRepository.findAll().stream()
            .anyMatch(book -> book.getTitle().equalsIgnoreCase(title) && !book.getId().equals(id));
    }
}
