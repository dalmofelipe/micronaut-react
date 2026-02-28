package mn_react.application.usecase.loan.impl;

import java.util.List;

import mn_react.application.repository.LoanRepository;
import mn_react.application.usecase.loan.GetLoansUseCase;
import mn_react.domain.entities.Loan;
import mn_react.domain.entities.LoanStatus;
import mn_react.domain.exception.ValidationException;
import mn_react.domain.message.LoanMessages;

public class GetLoansUseCaseImpl implements GetLoansUseCase {

    private final LoanRepository loanRepository;

    public GetLoansUseCaseImpl(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    @Override
    public List<Loan> execute(int page, int size, String status) {
        LoanStatus loanStatus = validateStatus(status);
        
        return loanRepository.findAll(page, size, loanStatus);
    }

    private LoanStatus validateStatus(String status) {
        if (status == null || status.isEmpty()) {
            return null;
        }

        try {
            return LoanStatus.valueOf(status);
        } catch (IllegalArgumentException e) {
            throw new ValidationException(LoanMessages.INVALID_STATUS);
        }
    }
}
