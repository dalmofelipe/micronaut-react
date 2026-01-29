package mn_react.core.usecase.book.impl;

import jakarta.inject.Singleton;
import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.ConflictException;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.book.UpdateBookIsbnUseCase;

@Singleton
public class UpdateBookIsbnUseCaseImpl implements UpdateBookIsbnUseCase {

    private final BookRepository bookRepository;

    public UpdateBookIsbnUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book execute(Long id, String isbn) {
        Book book = bookRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Livro não encontrado com ID: " + id));

        if (isbn != null && !isbn.isBlank()) {
            bookRepository.findByIsbn(isbn).ifPresent(existingBook -> {
                if (!existingBook.getId().equals(id)) {
                    throw new ConflictException("Já existe outro livro com ISBN: " + isbn);
                }
            });
        }

        book.setIsbn(isbn);
        
        return bookRepository.update(book);
    }
}
