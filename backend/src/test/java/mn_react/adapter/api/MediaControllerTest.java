package mn_react.adapter.api;

import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import io.micronaut.http.client.annotation.Client;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.client.multipart.MultipartBody;
import mn_react.adapter.api.dto.MediaUploadResponse;

@MicronautTest
public class MediaControllerTest {

    @Inject
    @Client("/")
    HttpClient client;

    @Test
    void uploadImageShouldReturnUrl() {
        byte[] data = new byte[] { (byte)0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A }; // PNG header (truncated)
        MultipartBody body = MultipartBody.builder()
                .addPart("file", "test.png", io.micronaut.http.MediaType.IMAGE_PNG_TYPE, data)
                .build();

        var req = HttpRequest.POST("/media", body).contentType("multipart/form-data");
        var rsp = client.toBlocking().exchange(req, MediaUploadResponse.class);
        assertEquals(io.micronaut.http.HttpStatus.OK, rsp.getStatus());
        MediaUploadResponse b = rsp.getBody(MediaUploadResponse.class).orElse(null);
        assertNotNull(b);
        assertNotNull(b.getUrl());
        assertTrue(b.getKey().length() > 0);
    }
}
