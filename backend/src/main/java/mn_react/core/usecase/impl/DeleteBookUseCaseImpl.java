package mn_react.core.usecase.impl;

import jakarta.inject.Singleton;
import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.DeleteBookUseCase;

@Singleton
public class DeleteBookUseCaseImpl implements DeleteBookUseCase {

    private final BookRepository bookRepository;

    public DeleteBookUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public void execute(Long id) {
        Book book = bookRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Livro não encontrado com ID: " + id));

        bookRepository.softDelete(id);
    }
}
