package mn_react.adapter.api.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.micronaut.context.annotation.Requires;
import io.micronaut.context.env.Environment;
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
    private final boolean isDevelopment;

    public GenericExceptionHandler(ErrorResponseFactory errorResponseFactory, Environment environment) {
        this.errorResponseFactory = errorResponseFactory;
        this.isDevelopment = environment.getActiveNames().contains("dev")
                || environment.getActiveNames().contains("test");
    }

    @Override
    public HttpResponse<ErrorResponse> handle(HttpRequest request, Exception exception) {
        LOG.error("Unexpected error on path: {}", request.getPath(), exception);
        
        String message = isDevelopment && exception.getMessage() != null 
            ? exception.getMessage() 
            : "Ocorreu um erro inesperado";
        
        ErrorResponse error = errorResponseFactory
            .create(request, HttpStatus.INTERNAL_SERVER_ERROR, message);
        return HttpResponse.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
