package mn_react.adapter.api.exception;

import static java.util.Collections.emptyList;

import java.time.LocalDateTime;
import java.util.List;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpStatus;
import jakarta.inject.Singleton;

@Singleton
public class ErrorResponseFactory {

    public ErrorResponse create(HttpRequest<?> request, HttpStatus status, String message) {
        return create(request, status, message, emptyList());
    }

    public ErrorResponse create(HttpRequest<?> request, HttpStatus status, Exception exception) {
        return create(request, status, exception.getMessage());
    }

    public ErrorResponse create(HttpRequest<?> request, HttpStatus status, List<ErrorField> errors) {
        String message = errors == null || errors.isEmpty() ? status.getReason() : errors.get(0).getMessage();
        return create(request, status, message, errors);
    }

    public ErrorResponse create(
        HttpRequest<?> request, 
        HttpStatus status, 
        String message, 
        List<ErrorField> errors
    ) {
        return ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(status.getCode())
            .error(status.getReason())
            .message(message)
            .path(request.getPath())
            .errors(errors == null ? emptyList() : errors)
            .build();
    }
} 
