package mn_react.core.usecase.impl;

import java.math.BigDecimal;

import jakarta.inject.Singleton;
import mn_react.core.domain.entities.User;
import mn_react.core.domain.exception.ConflictException;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.CreateUserUseCase;

@Singleton
public class CreateUserUseCaseImpl implements CreateUserUseCase {

    private final UserRepository userRepository;

    public CreateUserUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User execute(User user) {
        userRepository.findByEmail(user.getEmail()).ifPresent(existing -> {
            throw new ConflictException("Já existe um usuário com email: " + user.getEmail());
        });

        user.setActive(true);
        user.setAccumulatedFines(BigDecimal.ZERO);
        
        return userRepository.save(user);
    }
}
