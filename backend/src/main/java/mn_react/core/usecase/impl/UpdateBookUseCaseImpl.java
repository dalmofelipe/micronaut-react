package mn_react.core.usecase.impl;

import jakarta.inject.Singleton;
import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.domain.exception.ValidationException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.UpdateBookUseCase;

@Singleton
public class UpdateBookUseCaseImpl implements UpdateBookUseCase {

    private final BookRepository bookRepository;

    public UpdateBookUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book execute(Long id, Book book) {
        Book existingBook = bookRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Livro não encontrado com ID: " + id));

        if (book.getAvailableQuantity() > book.getTotalQuantity()) {
            throw new ValidationException(
                "Quantidade disponível (" + book.getAvailableQuantity() + 
                ") não pode ser maior que quantidade total (" + book.getTotalQuantity() + ")"
            );
        }

        if (book.getAvailableQuantity() < 0) {
            throw new ValidationException("Quantidade disponível não pode ser negativa");
        }

        book.setId(id);
        book.setActive(existingBook.getActive());
        
        return bookRepository.update(book);
    }
}
