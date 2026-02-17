package mn_react.core.usecase.user.impl;

import mn_react.core.domain.entities.User;
import mn_react.core.domain.exception.ConflictException;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.domain.exception.ValidationException;
import mn_react.core.domain.message.UserMessages;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.user.UpdateUserUseCase;

public class UpdateUserUseCaseImpl implements UpdateUserUseCase {

    private final UserRepository userRepository;

    public UpdateUserUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User execute(Long id, String name, String email, Boolean active) {
        User existingUser = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException(UserMessages.notFound(id)));

        validateName(name);
        validateEmail(email);

        String normalizedEmail = email.trim().toLowerCase();
        
        if (!existingUser.getEmail().equalsIgnoreCase(normalizedEmail)) {
            if (userRepository.existsByEmailAndIdNot(normalizedEmail, id)) {
                throw new ConflictException(UserMessages.duplicateEmail(normalizedEmail));
            }
        }

        User updatedUser = User.builder()
            .id(id)
            .name(name.trim())
            .email(normalizedEmail)
            .active(active != null ? active : existingUser.getActive())
            .createdAt(existingUser.getCreatedAt())
            .build();

        return userRepository.update(updatedUser);
    }

    private void validateName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new ValidationException(UserMessages.NAME_REQUIRED);
        }
    }

    private void validateEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new ValidationException(UserMessages.EMAIL_REQUIRED);
        }
        if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new ValidationException(UserMessages.EMAIL_INVALID);
        }
    }
}
