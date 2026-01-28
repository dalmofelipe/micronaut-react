package mn_react.core.usecase;

import mn_react.core.domain.entities.User;

public interface UpdateUserUseCase {
    User execute(Long id, User user);
}
