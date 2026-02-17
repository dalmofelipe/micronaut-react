package mn_react.core.usecase.loan.impl;

import java.time.LocalDate;

import mn_react.core.domain.entities.Loan;
import mn_react.core.domain.entities.LoanStatus;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.domain.message.BookMessages;
import mn_react.core.domain.message.UserMessages;
import mn_react.core.repository.BookRepository;
import mn_react.core.repository.LoanRepository;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.loan.CreateLoanUseCase;

public class CreateLoanUseCaseImpl implements CreateLoanUseCase {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public CreateLoanUseCaseImpl(
        LoanRepository loanRepository, 
        UserRepository userRepository, 
        BookRepository bookRepository
    ) {
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public Loan execute(Long userId, Long bookId, LocalDate dataPrevistaDevolucao) {
        if (!userRepository.findById(userId).isPresent()) {
            throw new NotFoundException(UserMessages.notFound(userId));
        }

        if (!bookRepository.findById(bookId).isPresent()) {
            throw new NotFoundException(BookMessages.notFound(bookId));
        }

        Loan newLoan = Loan.builder()
            .userId(userId)
            .bookId(bookId)
            .dataEmprestimo(LocalDate.now())
            .dataPrevistaDevolucao(dataPrevistaDevolucao != null 
                ? dataPrevistaDevolucao 
                : LocalDate.now().plusDays(14))
            .status(LoanStatus.ATIVO)
            .build();

        return loanRepository.save(newLoan);
    }
}
