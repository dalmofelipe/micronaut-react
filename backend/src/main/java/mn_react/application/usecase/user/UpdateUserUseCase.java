package mn_react.application.usecase.user;

import mn_react.domain.entities.User;

public interface UpdateUserUseCase {
    User execute(Long id, String name, String email, Boolean active);
}
