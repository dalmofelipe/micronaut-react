package mn_react.application.usecase.loan;

import mn_react.domain.entities.Loan;

public interface ReturnLoanUseCase {
    Loan execute(Long loanId);
}
