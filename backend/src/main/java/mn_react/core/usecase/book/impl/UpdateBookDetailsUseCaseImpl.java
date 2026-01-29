package mn_react.core.usecase.book.impl;

import jakarta.inject.Singleton;
import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.book.UpdateBookDetailsUseCase;

@Singleton
public class UpdateBookDetailsUseCaseImpl implements UpdateBookDetailsUseCase {

    private final BookRepository bookRepository;

    public UpdateBookDetailsUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book execute(Long id, Book bookDetails) {
        Book existingBook = bookRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Livro não encontrado com ID: " + id));

        existingBook.setTitle(bookDetails.getTitle());
        existingBook.setAuthor(bookDetails.getAuthor());
        existingBook.setGenre(bookDetails.getGenre());
        existingBook.setPages(bookDetails.getPages());
        existingBook.setSummary(bookDetails.getSummary());
        existingBook.setImageUrl(bookDetails.getImageUrl());
        
        return bookRepository.update(existingBook);
    }
}
