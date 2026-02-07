package mn_react.core.usecase.user.impl;

import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.domain.exception.UnprocessableEntityException;
import mn_react.core.repository.LoanRepository;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.user.DeleteUserUseCase;

public class DeleteUserUseCaseImpl implements DeleteUserUseCase {

    private final UserRepository userRepository;
    private final LoanRepository loanRepository;

    public DeleteUserUseCaseImpl(
        UserRepository userRepository, 
        LoanRepository loanRepository
    ) {
        this.userRepository = userRepository;
        this.loanRepository = loanRepository;
    }

    @Override
    public void execute(Long id) {
        if (!userRepository.findById(id).isPresent()) {
            throw new NotFoundException("User not found with id: " + id);
        }

        long activeLoans = loanRepository.findByUserId(id).stream()
            .filter(loan -> loan.getStatus().name().equals("ATIVO"))
            .count();

        if (activeLoans > 0) {
            throw new UnprocessableEntityException("Cannot delete user with active loans");
        }

        userRepository.deleteById(id);
    }
}
