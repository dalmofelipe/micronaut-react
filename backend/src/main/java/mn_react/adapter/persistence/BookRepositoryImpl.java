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
        return jdbcRepository.findByActiveTrue().stream()
            .map(BookEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public Optional<Book> findById(Long id) {
        return jdbcRepository.findByIdAndActiveTrue(id)
            .map(BookEntity::toDomain);
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
    public int softDelete(Long id) {
        return jdbcRepository.softDeleteById(id);
    }

    @Override
    public Optional<Book> findByIsbn(String isbn) {
        return jdbcRepository.findByIsbnAndActiveTrue(isbn)
            .map(BookEntity::toDomain);
    }

}
