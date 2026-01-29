package mn_react.core.usecase.user;

import mn_react.core.domain.entities.User;

public interface UpdateUserUseCase {
    User execute(Long id, User user);
}
