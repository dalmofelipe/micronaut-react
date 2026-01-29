package mn_react.core.usecase.book.impl;

import jakarta.inject.Singleton;
import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.ConflictException;
import mn_react.core.domain.exception.ValidationException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.book.CreateBookUseCase;

@Singleton
public class CreateBookUseCaseImpl implements CreateBookUseCase {

    private final BookRepository bookRepository;

    public CreateBookUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book execute(Book book) {
        validateBook(book);
        
        if (book.getIsbn() != null && !book.getIsbn().isBlank()) {
            bookRepository.findByIsbn(book.getIsbn()).ifPresent(existing -> {
                throw new ConflictException("Já existe um livro com ISBN: " + book.getIsbn());
            });
        }
        
        book.setActive(true);
        
        return bookRepository.save(book);
    }

    private void validateBook(Book book) {

        if (book.getAvailableQuantity() > book.getTotalQuantity()) {
            throw new ValidationException(
                String.format(
                    "Quantidade disponível (%d) não pode ser maior que a quantidade total (%d)",
                    book.getAvailableQuantity(),
                    book.getTotalQuantity()
                )
            );
        }
    }
}
