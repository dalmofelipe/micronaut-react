package mn_react.core.usecase.book.impl;

import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.book.DeleteBookUseCase;

public class DeleteBookUseCaseImpl implements DeleteBookUseCase {

    private final BookRepository bookRepository;

    public DeleteBookUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public void execute(Long id) {
        if (!bookRepository.findById(id).isPresent()) {
            throw new NotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }
}
