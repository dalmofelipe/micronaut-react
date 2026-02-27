package mn_react.application.usecase.book.impl;

import mn_react.application.repository.BookRepository;
import mn_react.application.usecase.book.DeleteBookUseCase;
import mn_react.domain.exception.NotFoundException;
import mn_react.domain.message.BookMessages;

public class DeleteBookUseCaseImpl implements DeleteBookUseCase {

    private final BookRepository bookRepository;

    public DeleteBookUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public void execute(Long id) {
        if (!bookRepository.findById(id).isPresent()) {
            throw new NotFoundException(BookMessages.notFound(id));
        }
        bookRepository.deleteById(id);
    }
}
