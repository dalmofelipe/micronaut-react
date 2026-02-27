package mn_react.infrastructure.http.exception;

import java.time.LocalDateTime;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpStatus;
import jakarta.inject.Singleton;

@Singleton
public class ErrorResponseFactory {

    public ErrorResponse create(HttpRequest<?> request, HttpStatus status, String message) {
        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(status.getCode())
            .error(status.getReason())
            .message(message)
            .path(request.getPath())
            .build();
    }

    public ErrorResponse create(HttpRequest<?> request, HttpStatus status, Exception exception) {
        return create(request, status, exception.getMessage());
    }
}
