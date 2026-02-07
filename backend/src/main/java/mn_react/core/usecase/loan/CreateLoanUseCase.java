package mn_react.core.usecase.loan;

import java.time.LocalDate;
import mn_react.core.domain.entities.Loan;

public interface CreateLoanUseCase {
    Loan execute(Long userId, Long bookId, LocalDate dataPrevistaDevolucao);
}
