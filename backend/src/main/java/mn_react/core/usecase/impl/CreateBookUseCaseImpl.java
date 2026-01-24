package mn_react.core.usecase.impl;

import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.ConflictException;
import mn_react.core.domain.exception.ValidationException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.CreateBookUseCase;

public class CreateBookUseCaseImpl implements CreateBookUseCase {

    private final BookRepository bookRepository;

    public CreateBookUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book execute(String title, int pages) {
        validateTitle(title);
        validatePages(pages);
        
        String normalizedTitle = normalizeTitle(title);
        
        checkForDuplicates(normalizedTitle);
        
        Book newBook = Book.builder()
            .title(normalizedTitle)
            .pages(pages)
            .build();
        
        return bookRepository.save(newBook);
    }

    private void validateTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new ValidationException("Title cannot be empty");
        }
        if (title.length() > 200) {
            throw new ValidationException("Title cannot exceed 200 characters");
        }
    }

    private void validatePages(int pages) {
        if (pages <= 0) {
            throw new ValidationException("Pages must be greater than 0");
        }
        if (pages > 10000) {
            throw new ValidationException("Pages cannot exceed 10000 (unrealistic book size)");
        }
    }

    private String normalizeTitle(String title) {
        String trimmed = title.trim().replaceAll("\\s+", " ");
        return trimmed.substring(0, 1).toUpperCase() + trimmed.substring(1);
    }

    private void checkForDuplicates(String title) {
        boolean exists = bookRepository.findAll().stream()
            .anyMatch(book -> book.getTitle().equalsIgnoreCase(title));
        
        if (exists) {
            throw new ConflictException("A book with title '" + title + "' already exists");
        }
    }
}
