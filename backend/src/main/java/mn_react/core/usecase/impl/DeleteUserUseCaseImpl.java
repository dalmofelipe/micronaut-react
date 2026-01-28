package mn_react.core.usecase.impl;

import jakarta.inject.Singleton;
import mn_react.core.domain.entities.User;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.DeleteUserUseCase;

@Singleton
public class DeleteUserUseCaseImpl implements DeleteUserUseCase {

    private final UserRepository userRepository;

    public DeleteUserUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void execute(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Usuário não encontrado com ID: " + id));

        userRepository.softDelete(id);
    }
}
