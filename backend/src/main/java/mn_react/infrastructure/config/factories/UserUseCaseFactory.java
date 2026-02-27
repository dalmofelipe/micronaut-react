package mn_react.infrastructure.config.factories;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.application.repository.LoanRepository;
import mn_react.application.repository.UserRepository;
import mn_react.application.usecase.user.CreateUserUseCase;
import mn_react.application.usecase.user.DeleteUserUseCase;
import mn_react.application.usecase.user.UpdateUserUseCase;
import mn_react.application.usecase.user.impl.CreateUserUseCaseImpl;
import mn_react.application.usecase.user.impl.DeleteUserUseCaseImpl;
import mn_react.application.usecase.user.impl.UpdateUserUseCaseImpl;

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
