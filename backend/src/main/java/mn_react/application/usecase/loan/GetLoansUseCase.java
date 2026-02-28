package mn_react.application.usecase.loan;

import java.util.List;

import mn_react.domain.entities.Loan;

public interface GetLoansUseCase {
    List<Loan> execute(int page, int size, String status);
}
