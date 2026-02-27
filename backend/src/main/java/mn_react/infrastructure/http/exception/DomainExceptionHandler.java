package mn_react.infrastructure.http.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.micronaut.context.annotation.Requires;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;
import mn_react.domain.exception.*;

@Produces
@Singleton
@SuppressWarnings("rawtypes")
@Requires(classes = {DomainException.class, ExceptionHandler.class})
public class DomainExceptionHandler 
        implements ExceptionHandler<DomainException, HttpResponse<ErrorResponse>> {

    private static final Logger LOG = LoggerFactory.getLogger(DomainExceptionHandler.class);
    private final ErrorResponseFactory errorResponseFactory;

    public DomainExceptionHandler(ErrorResponseFactory errorResponseFactory) {
        this.errorResponseFactory = errorResponseFactory;
    }

    @Override
    public HttpResponse<ErrorResponse> handle(HttpRequest request, DomainException exception) {
        HttpStatus status = mapToHttpStatus(exception);
        
        if (status.getCode() >= 500) {
            LOG.error("Domain exception on path: {} - {}", 
                request.getPath(), exception.getMessage(), exception);
        } else {
            LOG.warn("Domain exception on path: {} - {} ({})", 
                request.getPath(), exception.getMessage(), status.getReason());
        }
        
        ErrorResponse error = errorResponseFactory.create(request, status, exception);
        return HttpResponse.status(status).body(error);
    }

    private HttpStatus mapToHttpStatus(DomainException exception) {
        return switch (exception) {
            case NotFoundException e -> HttpStatus.NOT_FOUND;
            case ValidationException e -> HttpStatus.BAD_REQUEST;
            case ConflictException e -> HttpStatus.CONFLICT;
            case UnprocessableEntityException e -> HttpStatus.UNPROCESSABLE_ENTITY;
            case UnauthorizedException e -> HttpStatus.UNAUTHORIZED;
            case ForbiddenException e -> HttpStatus.FORBIDDEN;
        };
    }
}
