package mn_react.config.factories;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.core.repository.BookRepository;
import mn_react.core.repository.LoanRepository;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.loan.CreateLoanUseCase;
import mn_react.core.usecase.loan.ReturnLoanUseCase;
import mn_react.core.usecase.loan.impl.CreateLoanUseCaseImpl;
import mn_react.core.usecase.loan.impl.ReturnLoanUseCaseImpl;

@Factory
public class LoanUseCaseFactory {

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
