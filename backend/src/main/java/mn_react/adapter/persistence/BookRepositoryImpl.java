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
            .map(this::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public Optional<Book> findById(Long id) {
        return jdbcRepository.findById(id).map(this::toDomain);
    }

    @Override
    public Book save(Book book) {
        BookEntity entity = toEntity(book);
        BookEntity saved = jdbcRepository.save(entity);
        return toDomain(saved);
    }

    // mappers
    private Book toDomain(BookEntity entity) {
        return Book.builder()
            .id(entity.getId())
            .title(entity.getTitle())
            .pages(entity.getPages())
            .author(entity.getAuthor())
            .isbn(entity.getIsbn())
            .genre(entity.getGenre())
            .totalQuantity(entity.getTotalQuantity())
            .availableQuantity(entity.getAvailableQuantity())
            .summary(entity.getSummary())
            .imageUrl(entity.getImageUrl())
            .active(entity.getActive())
            .build();
    }

    private BookEntity toEntity(Book domain) {
        return BookEntity.builder()
            .id(domain.getId())
            .title(domain.getTitle())
            .pages(domain.getPages())
            .author(domain.getAuthor())
            .isbn(domain.getIsbn())
            .genre(domain.getGenre())
            .totalQuantity(domain.getTotalQuantity())
            .availableQuantity(domain.getAvailableQuantity())
            .summary(domain.getSummary())
            .imageUrl(domain.getImageUrl())
            .active(domain.getActive())
            .build();
    }
}
