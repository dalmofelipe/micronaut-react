package mn_react.core.usecase.book.impl;

import jakarta.inject.Singleton;
import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.domain.exception.ValidationException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.book.AddBookStockUseCase;

@Singleton
public class AddBookStockUseCaseImpl implements AddBookStockUseCase {

    private final BookRepository bookRepository;

    public AddBookStockUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book execute(Long bookId, int quantityToAdd) {
        if (quantityToAdd <= 0) {
            throw new ValidationException("Quantidade a adicionar deve ser maior que zero");
        }

        Book book = bookRepository.findById(bookId)
            .orElseThrow(() -> new NotFoundException("Livro não encontrado com ID: " + bookId));

        int newTotal = book.getTotalQuantity() + quantityToAdd;
        int newAvailable = book.getAvailableQuantity() + quantityToAdd;

        book.setTotalQuantity(newTotal);
        book.setAvailableQuantity(newAvailable);

        return bookRepository.update(book);
    }
}
