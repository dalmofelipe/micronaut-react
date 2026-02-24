package mn_react.infrastructure.http.exception;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.micronaut.context.annotation.Requires;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@Produces
@Singleton
@io.micronaut.context.annotation.Primary
@SuppressWarnings("rawtypes")
@Requires(classes = {ConstraintViolationException.class, ExceptionHandler.class})
public class ConstraintViolationExceptionHandler
        implements ExceptionHandler<ConstraintViolationException, HttpResponse<ErrorResponse>> {

    private static final Logger LOG =
        LoggerFactory.getLogger(ConstraintViolationExceptionHandler.class);

    private final ErrorResponseFactory errorResponseFactory;

    public ConstraintViolationExceptionHandler(ErrorResponseFactory errorResponseFactory) {
        this.errorResponseFactory = errorResponseFactory;
    }

    @Override
    public HttpResponse<ErrorResponse> handle(HttpRequest request,
            ConstraintViolationException exception) {
        Set<ConstraintViolation<?>> violations = exception.getConstraintViolations();

        List<ErrorField> errors = violations.stream()
            .map(v -> ErrorField.builder()
                .field(v.getPropertyPath() == null ? null : v.getPropertyPath().toString())
                .message(v.getMessage()).build())
            .collect(Collectors.toList());

        LOG.warn("Validation failed on path: {} - {}", request.getPath(), errors);

        ErrorResponse error = errorResponseFactory.create(request, HttpStatus.BAD_REQUEST,
            "Validation failed", errors);

        return HttpResponse.status(HttpStatus.BAD_REQUEST).body(error);
    }
}
