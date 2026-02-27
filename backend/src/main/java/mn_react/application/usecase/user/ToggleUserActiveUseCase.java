package mn_react.application.usecase.user;

import mn_react.domain.entities.User;

public interface ToggleUserActiveUseCase {
    User execute(Long id);
}
