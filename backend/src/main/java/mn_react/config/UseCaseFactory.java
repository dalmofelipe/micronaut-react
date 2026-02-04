package mn_react.config;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.core.repository.BookRepository;
import mn_react.core.repository.LoanRepository;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.CreateBookUseCase;
import mn_react.core.usecase.CreateLoanUseCase;
import mn_react.core.usecase.CreateUserUseCase;
import mn_react.core.usecase.DeleteBookUseCase;
import mn_react.core.usecase.DeleteUserUseCase;
import mn_react.core.usecase.ReturnLoanUseCase;
import mn_react.core.usecase.UpdateBookUseCase;
import mn_react.core.usecase.UpdateUserUseCase;
import mn_react.core.usecase.impl.CreateBookUseCaseImpl;
import mn_react.core.usecase.impl.CreateLoanUseCaseImpl;
import mn_react.core.usecase.impl.CreateUserUseCaseImpl;
import mn_react.core.usecase.impl.DeleteBookUseCaseImpl;
import mn_react.core.usecase.impl.DeleteUserUseCaseImpl;
import mn_react.core.usecase.impl.ReturnLoanUseCaseImpl;
import mn_react.core.usecase.impl.UpdateBookUseCaseImpl;
import mn_react.core.usecase.impl.UpdateUserUseCaseImpl;

@Factory
public class UseCaseFactory {

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

    @Singleton
    CreateUserUseCase createUserUseCase(UserRepository userRepository) {
        return new CreateUserUseCaseImpl(userRepository);
    }

    @Singleton
    UpdateUserUseCase updateUserUseCase(UserRepository userRepository) {
        return new UpdateUserUseCaseImpl(userRepository);
    }

    @Singleton
    DeleteUserUseCase deleteUserUseCase(
        UserRepository userRepository, 
        LoanRepository loanRepository
    ) {
        return new DeleteUserUseCaseImpl(userRepository, loanRepository);
    }

    @Singleton
    CreateLoanUseCase createLoanUseCase(
        LoanRepository loanRepository, 
        UserRepository userRepository, 
        BookRepository bookRepository
    ) {
        return new CreateLoanUseCaseImpl(loanRepository, userRepository, bookRepository);
    }

    @Singleton
    ReturnLoanUseCase returnLoanUseCase(LoanRepository loanRepository) {
        return new ReturnLoanUseCaseImpl(loanRepository);
    }
}
