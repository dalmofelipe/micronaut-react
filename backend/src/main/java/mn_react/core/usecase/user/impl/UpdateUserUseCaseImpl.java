package mn_react.core.usecase.user.impl;

import jakarta.inject.Singleton;
import mn_react.core.domain.entities.User;
import mn_react.core.domain.exception.ConflictException;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.user.UpdateUserUseCase;

@Singleton
public class UpdateUserUseCaseImpl implements UpdateUserUseCase {

    private final UserRepository userRepository;

    public UpdateUserUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User execute(Long id, User user) {
        User existingUser = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Usuário não encontrado com ID: " + id));

        if (!existingUser.getEmail().equals(user.getEmail())) {
            userRepository.findByEmail(user.getEmail()).ifPresent(existing -> {
                throw new ConflictException("Já existe um usuário com email: " + user.getEmail());
            });
        }

        user.setId(id);
        user.setActive(existingUser.getActive());
        user.setAccumulatedFines(existingUser.getAccumulatedFines());
        
        return userRepository.update(user);
    }
}
