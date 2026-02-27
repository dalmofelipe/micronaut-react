package mn_react.application.usecase.user.impl;

import mn_react.application.repository.UserRepository;
import mn_react.application.usecase.user.ToggleUserActiveUseCase;
import mn_react.domain.entities.User;
import mn_react.domain.exception.NotFoundException;

public class ToggleUserActiveUseCaseImpl implements ToggleUserActiveUseCase {

    private final UserRepository userRepository;

    public ToggleUserActiveUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
   
    @Override
    public User execute(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Usuario não encontrado com ID: " + id));
        
        User updatedUser = User.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .active(!user.getActive())
            .build();

        return userRepository.update(updatedUser);
    }
}
