package mn_react.core.usecase.book.impl;

import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.ConflictException;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.domain.exception.ValidationException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.book.UpdateBookUseCase;

public class UpdateBookUseCaseImpl implements UpdateBookUseCase {

    private final BookRepository bookRepository;

    public UpdateBookUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book execute(Long id, String title, Integer pages) {
        Book existingBook = bookRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Book not found with id: " + id));

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
            throw new ValidationException("Pages cannot exceed 10000");
        }
    }

    private String normalizeTitle(String title) {
        return title.trim().replaceAll("\\s+", " ");
    }

    private void checkForDuplicates(String title, Long excludeId) {
        if (bookRepository.existsByTitleIgnoreCaseAndIdNot(title, excludeId)) {
            throw new ConflictException("Book with title '" + title + "' already exists");
        }
    }
}
