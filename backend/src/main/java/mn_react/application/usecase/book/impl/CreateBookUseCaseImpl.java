package mn_react.application.usecase.book.impl;

import mn_react.application.repository.BookRepository;
import mn_react.application.usecase.book.CreateBookUseCase;
import mn_react.domain.entities.Book;
import mn_react.domain.exception.ConflictException;
import mn_react.domain.exception.ValidationException;
import mn_react.domain.message.BookMessages;

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
            throw new ValidationException(BookMessages.TITLE_REQUIRED);
        }
        if (title.length() > 200) {
            throw new ValidationException(BookMessages.titleTooLong(200));
        }
    }

    private void validatePages(int pages) {
        if (pages <= 0) {
            throw new ValidationException(BookMessages.PAGES_POSITIVE);
        }
        if (pages > 10000) {
            throw new ValidationException(BookMessages.pagesTooMany(10000));
        }
    }

    private String normalizeTitle(String title) {
        return title.trim().replaceAll("\\s+", " ");
    }

    private void checkForDuplicates(String title) {
        if (bookRepository.existsByTitleIgnoreCase(title)) {
            throw new ConflictException(BookMessages.duplicateTitle(title));
        }
    }
}
