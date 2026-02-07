package mn_react.adapter.api;

import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@MicronautTest
class ContentCorsTest {

    @Inject
    @Client("/")
    HttpClient client;

    @Test
    void preflightToContents_shouldReturnCorsHeaders() {
        HttpRequest<?> req = HttpRequest.OPTIONS("/contents")
            .header(HttpHeaders.ORIGIN, "http://localhost:5173")
            .header("Access-Control-Request-Method", "POST")
            .header("Access-Control-Request-Headers", "content-type,authorization");

        HttpResponse<?> rsp = client.toBlocking().exchange(req);

        assertTrue(rsp.getStatus().equals(HttpStatus.NO_CONTENT) || rsp.getStatus().equals(HttpStatus.OK));
        assertEquals("http://localhost:5173", rsp.getHeaders().get(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN));
        assertNotNull(rsp.getHeaders().get(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS));
        assertTrue(rsp.getHeaders().get(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS).toString().toUpperCase().contains("POST"));
        assertNotNull(rsp.getHeaders().get(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS));
    }
}
