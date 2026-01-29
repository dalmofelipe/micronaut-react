package mn_react.adapter.api.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.micronaut.context.annotation.Requires;
import io.micronaut.context.annotation.Value;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;

@Produces
@Singleton
@SuppressWarnings("rawtypes")
@Requires(classes = {Exception.class, ExceptionHandler.class})
public class GenericExceptionHandler 
        implements ExceptionHandler<Exception, HttpResponse<ErrorResponse>> {

    private static final Logger LOG = LoggerFactory.getLogger(GenericExceptionHandler.class);
    private final ErrorResponseFactory errorResponseFactory;

    @Value("${micronaut.environments:dev}")
    private String environment;

    public GenericExceptionHandler(ErrorResponseFactory errorResponseFactory) {
        this.errorResponseFactory = errorResponseFactory;
    }

    @Override
    public HttpResponse<ErrorResponse> handle(HttpRequest request, Exception exception) {
        LOG.error("Unexpected error on path: {}", request.getPath(), exception);
        
        String message = isDevelopment() && exception.getMessage() != null 
            ? exception.getMessage() 
            : "An unexpected error occurred";
        
        ErrorResponse error = errorResponseFactory
            .create(request, HttpStatus.INTERNAL_SERVER_ERROR, message);
        return HttpResponse.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    private boolean isDevelopment() {
        return environment != null && (environment.contains("dev") || environment.contains("test"));
    }
}
