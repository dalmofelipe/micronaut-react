package mn_react.application.usecase.user.impl;

import mn_react.application.repository.LoanRepository;
import mn_react.application.repository.UserRepository;
import mn_react.application.usecase.user.DeleteUserUseCase;
import mn_react.domain.exception.NotFoundException;
import mn_react.domain.exception.UnprocessableEntityException;
import mn_react.domain.message.UserMessages;

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
            throw new NotFoundException(UserMessages.notFound(id));
        }

        long activeLoans = loanRepository.findByUserId(id).stream()
            .filter(loan -> loan.getStatus().name().equals("ATIVO"))
            .count();

        if (activeLoans > 0) {
            throw new UnprocessableEntityException(UserMessages.HAS_ACTIVE_LOANS);
        }

        userRepository.deleteById(id);
    }
}
