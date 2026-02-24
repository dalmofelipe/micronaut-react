package mn_react.adapter.api.exception;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import io.micronaut.core.type.Argument;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MutableHttpRequest;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.http.client.exceptions.HttpClientResponseException;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import mn_react.infrastructure.http.exception.ErrorResponse;

@MicronautTest
class ValidationHandlerTest {

    @Inject
    @Client("/")
    HttpClient client;

    @Test
    void invalidCreateBookReturnsBadRequestWithValidationMessage() {
        String payload = "{\"title\":\"x\",\"pages\":0}";
        MutableHttpRequest<String> req =
                HttpRequest.POST("/books", payload).accept("application/json");

        HttpClientResponseException ex =
                Assertions.assertThrows(HttpClientResponseException.class, () -> {
                    client.toBlocking().exchange(req, Argument.of(ErrorResponse.class));
                });

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, ex.getStatus());

        ErrorResponse resp = ex.getResponse().getBody(ErrorResponse.class).orElse(null);
        Assertions.assertNotNull(resp, "expected an ErrorResponse body");
        Assertions.assertNotNull(resp.getErrors(), "errors[] must be present");
        boolean containsMessage = resp.getErrors().stream()
                .anyMatch(e -> e.getMessage().contains("Pages must be at least 1"));
        Assertions.assertTrue(containsMessage,
                "response.errors[] should contain the validation message; got: "
                        + resp.getErrors());
    }
}
