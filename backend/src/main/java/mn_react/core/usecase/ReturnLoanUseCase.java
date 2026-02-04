package mn_react.core.usecase;

import mn_react.core.domain.entities.Loan;

public interface ReturnLoanUseCase {
    Loan execute(Long loanId);
}
