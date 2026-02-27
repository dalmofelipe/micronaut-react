package mn_react.application.usecase.book.impl;

import mn_react.application.repository.BookRepository;
import mn_react.application.usecase.book.UpdateBookUseCase;
import mn_react.domain.entities.Book;
import mn_react.domain.exception.ConflictException;
import mn_react.domain.exception.NotFoundException;
import mn_react.domain.exception.ValidationException;
import mn_react.domain.message.BookMessages;

public class UpdateBookUseCaseImpl implements UpdateBookUseCase {

    private final BookRepository bookRepository;

    public UpdateBookUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book execute(Long id, String title, Integer pages) {
        Book existingBook = bookRepository.findById(id)
            .orElseThrow(() -> new NotFoundException(BookMessages.notFound(id)));

        validateTitle(title);
        validatePages(pages);

        String normalizedTitle = normalizeTitle(title);
        
        if (!existingBook.getTitle().equalsIgnoreCase(normalizedTitle)) {
            checkForDuplicates(normalizedTitle, id);
        }

        Book updatedBook = Book.builder()
            .id(id)
            .title(normalizedTitle)
            .pages(pages)
            .build();

        return bookRepository.update(updatedBook);
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

    private void checkForDuplicates(String title, Long excludeId) {
        if (bookRepository.existsByTitleIgnoreCaseAndIdNot(title, excludeId)) {
            throw new ConflictException(BookMessages.duplicateTitle(title));
        }
    }
}
