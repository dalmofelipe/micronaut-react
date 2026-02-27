package mn_react.application.usecase.loan;

import java.time.LocalDate;

import mn_react.domain.entities.Loan;

public interface CreateLoanUseCase {
    Loan execute(Long userId, Long bookId, LocalDate dataPrevistaDevolucao);
}
