package mn_react.core.usecase.user.impl;

import jakarta.inject.Singleton;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.user.DeleteUserUseCase;

@Singleton
public class DeleteUserUseCaseImpl implements DeleteUserUseCase {

    private final UserRepository userRepository;

    public DeleteUserUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void execute(Long id) {
        int rowsAffected = userRepository.softDelete(id);
        
        if (rowsAffected == 0) {
            throw new NotFoundException("Usuário não encontrado ou já inativo com ID: " + id);
        }
    }
}
