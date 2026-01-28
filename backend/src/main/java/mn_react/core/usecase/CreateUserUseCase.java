package mn_react.core.usecase;

import mn_react.core.domain.entities.User;

public interface CreateUserUseCase {
    User execute(User user);
}
