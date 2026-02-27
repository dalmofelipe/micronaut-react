package mn_react.application.usecase.loan.impl;

import mn_react.application.repository.LoanRepository;
import mn_react.application.usecase.loan.ReturnLoanUseCase;
import mn_react.domain.entities.Loan;
import mn_react.domain.entities.LoanStatus;
import mn_react.domain.exception.NotFoundException;

import java.time.LocalDate;

public class ReturnLoanUseCaseImpl implements ReturnLoanUseCase {

    private final LoanRepository loanRepository;

    public ReturnLoanUseCaseImpl(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    @Override
    public Loan execute(Long loanId) {
        Loan existingLoan = loanRepository.findById(loanId)
            .orElseThrow(() -> new NotFoundException("Loan not found with id: " + loanId));

        Loan returnedLoan = Loan.builder()
            .id(existingLoan.getId())
            .userId(existingLoan.getUserId())
            .bookId(existingLoan.getBookId())
            .dataEmprestimo(existingLoan.getDataEmprestimo())
            .dataPrevistaDevolucao(existingLoan.getDataPrevistaDevolucao())
            .dataRealDevolucao(LocalDate.now())
            .status(LoanStatus.DEVOLVIDO)
            .build();

        return loanRepository.update(returnedLoan);
    }
}
