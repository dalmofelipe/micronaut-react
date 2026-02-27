package mn_react.infrastructure.http.controllers;

import java.util.List;

import io.micronaut.core.annotation.Nullable;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Patch;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.QueryValue;
import jakarta.validation.Valid;
import mn_react.application.repository.UserRepository;
import mn_react.application.usecase.user.CreateUserUseCase;
import mn_react.application.usecase.user.DeleteUserUseCase;
import mn_react.application.usecase.user.ToggleUserActiveUseCase;
import mn_react.application.usecase.user.UpdateUserUseCase;
import mn_react.domain.entities.User;
import mn_react.domain.exception.NotFoundException;
import mn_react.infrastructure.http.dto.requests.CreateUserRequest;
import mn_react.infrastructure.http.dto.requests.UpdateUserRequest;
import mn_react.infrastructure.http.dto.responses.PagedResponse;
import mn_react.infrastructure.http.dto.responses.UserResponse;

@Controller("/users")
public class UserController {

    private final UserRepository userRepository;
    private final CreateUserUseCase createUserUseCase;
    private final ToggleUserActiveUseCase toggleUserActiveUseCase;
    private final UpdateUserUseCase updateUserUseCase;
    private final DeleteUserUseCase deleteUserUseCase;

    public UserController(
        UserRepository userRepository, 
        CreateUserUseCase createUserUseCase,
        ToggleUserActiveUseCase toggleUserActiveUseCase,
        UpdateUserUseCase updateUserUseCase,
        DeleteUserUseCase deleteUserUseCase
    ) {
        this.userRepository = userRepository;
        this.createUserUseCase = createUserUseCase;
        this.toggleUserActiveUseCase = toggleUserActiveUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }

    @Get
    HttpResponse<?> getAllUsers(
            @QueryValue(defaultValue = "0") int page, 
            @QueryValue(defaultValue = "10") int size, 
            @Nullable @QueryValue(defaultValue = "") String search) {

        if (page == -1) {
            var response = userRepository.findAll().stream()
                .map(UserResponse::fromDomain)
                .toList();

            return HttpResponse.ok(response);
        }

        List<User> users = userRepository.findAll(page, size, search);
        long total = userRepository.count(search);
        List<UserResponse> content = users.stream().map(UserResponse::fromDomain).toList();

        PagedResponse<UserResponse> response = PagedResponse.<UserResponse>builder()
            .content(content)
            .page(page)
            .size(size)
            .totalElements(total)
            .build();

        return HttpResponse.ok(response);
    }

    @Get("/count")
    HttpResponse<Long> count() {
        return HttpResponse.ok(userRepository.count());
    }

    @Get("/{id}")
    HttpResponse<UserResponse> getUser(@PathVariable Long id) {
        var response = userRepository.findById(id)
            .map(UserResponse::fromDomain)
            .orElseThrow(() -> new NotFoundException("User", id));

        return HttpResponse.ok(response);
    }

    @Post
    HttpResponse<UserResponse> createUser(@Valid @Body CreateUserRequest request) {
        User created = createUserUseCase.execute(request.getName(), request.getEmail(), 
            request.getActive());
        
        return HttpResponse.created(UserResponse.fromDomain(created));
    }

    @Put("/{id}")
    HttpResponse<UserResponse> updateUser(
            @PathVariable Long id, 
            @Valid @Body UpdateUserRequest request) {

        User updated = updateUserUseCase.execute(id, request.getName(), request.getEmail(), 
            request.getActive());

        return HttpResponse.ok(UserResponse.fromDomain(updated));
    }

    @Patch("/{id}/active")
    HttpResponse<UserResponse> toggleActive(@PathVariable Long id) {
        return HttpResponse.ok(UserResponse
            .fromDomain(toggleUserActiveUseCase.execute(id)));
    }

    @Delete("/{id}")
    HttpResponse<Void> deleteUser(@PathVariable Long id) {
        deleteUserUseCase.execute(id);
        return HttpResponse.noContent();
    }
}
