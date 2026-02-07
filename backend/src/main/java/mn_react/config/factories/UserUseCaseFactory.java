package mn_react.config.factories;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.core.repository.LoanRepository;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.user.CreateUserUseCase;
import mn_react.core.usecase.user.DeleteUserUseCase;
import mn_react.core.usecase.user.UpdateUserUseCase;
import mn_react.core.usecase.user.impl.CreateUserUseCaseImpl;
import mn_react.core.usecase.user.impl.DeleteUserUseCaseImpl;
import mn_react.core.usecase.user.impl.UpdateUserUseCaseImpl;

@Factory
public class UserUseCaseFactory {

    @Singleton
    CreateUserUseCase createUserUseCase(UserRepository userRepository) {
        return new CreateUserUseCaseImpl(userRepository);
    }

    @Singleton
    UpdateUserUseCase updateUserUseCase(UserRepository userRepository) {
        return new UpdateUserUseCaseImpl(userRepository);
    }

    @Singleton
    DeleteUserUseCase deleteUserUseCase(
        UserRepository userRepository,
        LoanRepository loanRepository
    ) {
        return new DeleteUserUseCaseImpl(userRepository, loanRepository);
    }
}
