package mn_react.config.factories;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.book.CreateBookUseCase;
import mn_react.core.usecase.book.DeleteBookUseCase;
import mn_react.core.usecase.book.UpdateBookUseCase;
import mn_react.core.usecase.book.impl.CreateBookUseCaseImpl;
import mn_react.core.usecase.book.impl.DeleteBookUseCaseImpl;
import mn_react.core.usecase.book.impl.UpdateBookUseCaseImpl;

@Factory
public class BookUseCaseFactory {

    @Singleton
    CreateBookUseCase createBookUseCase(BookRepository bookRepository) {
        return new CreateBookUseCaseImpl(bookRepository);
    }

    @Singleton
    UpdateBookUseCase updateBookUseCase(BookRepository bookRepository) {
        return new UpdateBookUseCaseImpl(bookRepository);
    }

    @Singleton
    DeleteBookUseCase deleteBookUseCase(BookRepository bookRepository) {
        return new DeleteBookUseCaseImpl(bookRepository);
    }
}
