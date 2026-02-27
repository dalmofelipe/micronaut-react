package mn_react.infrastructure.api;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MediaType;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.http.client.multipart.MultipartBody;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import mn_react.infrastructure.http.dto.responses.MediaUploadResponse;

@MicronautTest
public class MediaControllerTest {

    @Inject
    @Client("/")
    HttpClient client;

    @Test
    void uploadImageShouldReturnUrl() {
        byte[] data = new byte[] { (byte)0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A }; // PNG header (truncated)
        MultipartBody body = MultipartBody.builder()
            .addPart("file", "test.png", MediaType.IMAGE_PNG_TYPE, data)
            .build();

        var req = HttpRequest.POST("/media", body).contentType(MediaType.MULTIPART_FORM_DATA);
        var rsp = client.toBlocking().exchange(req, MediaUploadResponse.class);

        assertEquals(HttpStatus.OK, rsp.getStatus());
        MediaUploadResponse b = rsp.getBody(MediaUploadResponse.class).orElse(null);

        assertNotNull(b);
        assertNotNull(b.getUrl());
        assertTrue(b.getKey().length() > 0);
    }
}
