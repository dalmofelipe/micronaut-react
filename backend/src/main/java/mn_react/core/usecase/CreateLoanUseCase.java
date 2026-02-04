package mn_react.core.usecase;

import mn_react.core.domain.entities.Loan;

import java.time.LocalDate;

public interface CreateLoanUseCase {
    Loan execute(Long userId, Long bookId, LocalDate dataPrevistaDevolucao);
}
