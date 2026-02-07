package mn_react.core.usecase.loan.impl;

import mn_react.core.domain.entities.Loan;
import mn_react.core.domain.entities.LoanStatus;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.LoanRepository;
import mn_react.core.usecase.loan.ReturnLoanUseCase;

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
