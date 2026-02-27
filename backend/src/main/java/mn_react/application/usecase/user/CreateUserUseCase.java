package mn_react.application.usecase.user;

import mn_react.domain.entities.User;

public interface CreateUserUseCase {
    User execute(String name, String email, Boolean active);
}
