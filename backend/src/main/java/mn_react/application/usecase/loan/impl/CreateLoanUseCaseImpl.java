package mn_react.application.usecase.loan.impl;

import java.time.LocalDate;

import mn_react.application.repository.BookRepository;
import mn_react.application.repository.LoanRepository;
import mn_react.application.repository.UserRepository;
import mn_react.application.usecase.loan.CreateLoanUseCase;
import mn_react.domain.entities.Loan;
import mn_react.domain.entities.LoanStatus;
import mn_react.domain.exception.NotFoundException;
import mn_react.domain.message.BookMessages;
import mn_react.domain.message.UserMessages;

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
