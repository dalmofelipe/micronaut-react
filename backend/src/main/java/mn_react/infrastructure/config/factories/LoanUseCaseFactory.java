package mn_react.infrastructure.config.factories;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.application.repository.BookRepository;
import mn_react.application.repository.LoanRepository;
import mn_react.application.repository.UserRepository;
import mn_react.application.usecase.loan.CreateLoanUseCase;
import mn_react.application.usecase.loan.GetLoansUseCase;
import mn_react.application.usecase.loan.ReturnLoanUseCase;
import mn_react.application.usecase.loan.impl.CreateLoanUseCaseImpl;
import mn_react.application.usecase.loan.impl.GetLoansUseCaseImpl;
import mn_react.application.usecase.loan.impl.ReturnLoanUseCaseImpl;

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
    GetLoansUseCase getLoansUseCase(LoanRepository loanRepository) {
        return new GetLoansUseCaseImpl(loanRepository);
    }

    @Singleton
    ReturnLoanUseCase returnLoanUseCase(LoanRepository loanRepository) {
        return new ReturnLoanUseCaseImpl(loanRepository);
    }
}
