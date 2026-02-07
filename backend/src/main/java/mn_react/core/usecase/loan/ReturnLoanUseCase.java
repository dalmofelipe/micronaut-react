package mn_react.core.usecase.loan;

import mn_react.core.domain.entities.Loan;

public interface ReturnLoanUseCase {
    Loan execute(Long loanId);
}
