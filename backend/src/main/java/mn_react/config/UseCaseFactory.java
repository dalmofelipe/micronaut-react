package mn_react.config;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.book.CreateBookUseCase;
import mn_react.core.usecase.book.impl.CreateBookUseCaseImpl;

@Factory
public class UseCaseFactory {

    @Singleton
    CreateBookUseCase createBookUseCase(BookRepository bookRepository) {
        return new CreateBookUseCaseImpl(bookRepository);
    }
}
