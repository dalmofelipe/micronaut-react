package mn_react.core.repository;

import java.util.List;
import java.util.Optional;

import mn_react.core.domain.entities.Book;

public interface BookRepository {
    List<Book> findAll();
    Optional<Book> findById(Long id);
    Optional<Book> findByIsbn(String isbn);
    Book save(Book book);
    Book update(Book book);
    int softDelete(Long id);
}
