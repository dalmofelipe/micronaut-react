package mn_react.core.usecase.user.impl;

import mn_react.core.domain.entities.User;
import mn_react.core.domain.exception.ConflictException;
import mn_react.core.domain.exception.ValidationException;
import mn_react.core.domain.message.UserMessages;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.user.CreateUserUseCase;

import java.time.LocalDateTime;

public class CreateUserUseCaseImpl implements CreateUserUseCase {

    private final UserRepository userRepository;

    public CreateUserUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User execute(String name, String email, Boolean active) {
        validateName(name);
        validateEmail(email);

        String normalizedEmail = email.trim().toLowerCase();
        
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new ConflictException(UserMessages.duplicateEmail(normalizedEmail));
        }

        User newUser = User.builder()
            .name(name.trim())
            .email(normalizedEmail)
            .active(active != null ? active : true)
            .createdAt(LocalDateTime.now())
            .build();

        return userRepository.save(newUser);
    }

    private void validateName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new ValidationException(UserMessages.NAME_REQUIRED);
        }
        if (name.length() > 255) {
            throw new ValidationException(UserMessages.NAME_TOO_LONG);
        }
    }

    private void validateEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new ValidationException(UserMessages.EMAIL_REQUIRED);
        }
        if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new ValidationException(UserMessages.EMAIL_INVALID);
        }
        if (email.length() > 255) {
            throw new ValidationException(UserMessages.EMAIL_TOO_LONG);
        }
    }
}
