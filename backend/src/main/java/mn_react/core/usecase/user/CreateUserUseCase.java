package mn_react.core.usecase.user;

import mn_react.core.domain.entities.User;

public interface CreateUserUseCase {
    User execute(String name, String email, Boolean active);
}
