package mn_react.adapter.api.exception;

import java.time.LocalDateTime;

import io.micronaut.context.annotation.Requires;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;
import mn_react.core.domain.exception.ConflictException;
import mn_react.core.domain.exception.ForbiddenException;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.domain.exception.UnauthorizedException;
import mn_react.core.domain.exception.UnprocessableEntityException;
import mn_react.core.domain.exception.ValidationException;

@Produces
@Singleton
@SuppressWarnings("rawtypes")
@Requires(classes = {NotFoundException.class, ExceptionHandler.class})
public class GlobalExceptionHandler implements ExceptionHandler<Exception, HttpResponse<ErrorResponse>> {

    @Override
    public HttpResponse<ErrorResponse> handle(HttpRequest request, Exception exception) {

        return switch (exception) {
            case NotFoundException e -> 
                createErrorResponse(request, HttpStatus.NOT_FOUND, e.getMessage());
            
            case ValidationException e -> 
                createErrorResponse(request, HttpStatus.BAD_REQUEST, e.getMessage());
            
            case ConflictException e -> 
                createErrorResponse(request, HttpStatus.CONFLICT, e.getMessage());
            
            case UnprocessableEntityException e -> 
                createErrorResponse(request, HttpStatus.UNPROCESSABLE_ENTITY, e.getMessage());
            
            case UnauthorizedException e -> 
                createErrorResponse(request, HttpStatus.UNAUTHORIZED, e.getMessage());
            
            case ForbiddenException e -> 
                createErrorResponse(request, HttpStatus.FORBIDDEN, e.getMessage());
            
            default -> 
                createErrorResponse(request, HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred: " + exception.getMessage());
        };
    }

    private HttpResponse<ErrorResponse> createErrorResponse(
        HttpRequest<?> request,
        HttpStatus status,
        String message
    ) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(status.getCode())
            .error(status.getReason())
            .message(message)
            .path(request.getPath())
            .build();
        
        return HttpResponse.status(status).body(error);
    }
}
