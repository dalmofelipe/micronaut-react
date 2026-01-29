package mn_react.core.usecase.book.impl;

import jakarta.inject.Singleton;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.book.DeleteBookUseCase;

@Singleton
public class DeleteBookUseCaseImpl implements DeleteBookUseCase {

    private final BookRepository bookRepository;

    public DeleteBookUseCaseImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public void execute(Long id) {
        int rowsAffected = bookRepository.softDelete(id);
        
        if (rowsAffected == 0) {
            throw new NotFoundException("Livro não encontrado ou já inativo com ID: " + id);
        }
    }
}
