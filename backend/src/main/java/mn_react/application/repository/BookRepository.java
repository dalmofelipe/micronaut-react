package mn_react.application.repository;

import java.util.List;
import java.util.Optional;

import mn_react.domain.entities.Book;

public interface BookRepository {
    List<Book> findAll();
    List<Book> findAll(int page, int size, String search);
    long count();
    long count(String search);
    Optional<Book> findById(Long id);
    Book save(Book book);
    Book update(Book book);
    void deleteById(Long id);
    boolean existsByTitleIgnoreCase(String title);
    boolean existsByTitleIgnoreCaseAndIdNot(String title, Long id);
}
