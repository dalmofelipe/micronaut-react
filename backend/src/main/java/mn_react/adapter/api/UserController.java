package mn_react.adapter.api;

import java.util.List;
import java.util.stream.Collectors;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.Status;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.groups.ConvertGroup;
import mn_react.adapter.api.dto.request.UserRequest;
import mn_react.adapter.api.dto.response.UserResponse;
import mn_react.adapter.api.dto.validation.OnCreate;
import mn_react.adapter.api.dto.validation.OnUpdate;
import mn_react.core.domain.entities.User;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.UserRepository;
import mn_react.core.usecase.user.CreateUserUseCase;
import mn_react.core.usecase.user.DeleteUserUseCase;
import mn_react.core.usecase.user.UpdateUserUseCase;

@Controller("/users")
@Tag(name = "Users")
public class UserController {

    private final UserRepository userRepository;
    private final CreateUserUseCase createUserUseCase;
    private final UpdateUserUseCase updateUserUseCase;
    private final DeleteUserUseCase deleteUserUseCase;

    public UserController(
        UserRepository userRepository,
        CreateUserUseCase createUserUseCase,
        UpdateUserUseCase updateUserUseCase,
        DeleteUserUseCase deleteUserUseCase
    ) {
        this.userRepository = userRepository;
        this.createUserUseCase = createUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }

    @Get
    HttpResponse<List<UserResponse>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserResponse> response = users.stream()
            .map(UserResponse::fromDomain)
            .collect(Collectors.toList());
        
        return HttpResponse.ok(response);
    }
    
    @Get("/{id}")
    HttpResponse<UserResponse> getUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Usuário não encontrado com ID: " + id));

        return HttpResponse.ok(UserResponse.fromDomain(user));
    }

    @Post
    @Status(HttpStatus.CREATED)
    HttpResponse<UserResponse> createUser(
        @Valid @ConvertGroup(to = OnCreate.class) @Body UserRequest request
    ) {
        User user = request.toUser();
        User created = createUserUseCase.execute(user);

        return HttpResponse.created(UserResponse.fromDomain(created));
    }

    @Put("/{id}")
    HttpResponse<UserResponse> updateUser(
        @PathVariable Long id,
        @Valid @ConvertGroup(to = OnUpdate.class) @Body UserRequest request
    ) {
        User user = request.toUser();
        User updated = updateUserUseCase.execute(id, user);

        return HttpResponse.ok(UserResponse.fromDomain(updated));
    }

    @Delete("/{id}")
    @Status(HttpStatus.NO_CONTENT)
    void deleteUser(@PathVariable Long id) {
        deleteUserUseCase.execute(id);
    }
}
