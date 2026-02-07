package mn_react.core.usecase.user;

import mn_react.core.domain.entities.User;

public interface UpdateUserUseCase {
    User execute(Long id, String name, String email, Boolean active);
}
