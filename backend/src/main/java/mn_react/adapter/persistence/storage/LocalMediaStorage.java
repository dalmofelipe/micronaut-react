package mn_react.adapter.persistence.storage;

import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.UUID;

import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import mn_react.core.repository.MediaStorage;

@Singleton
public class LocalMediaStorage implements MediaStorage {

    private final Path uploadDir;
    private final String baseUrl;

    public LocalMediaStorage(
            @Value("${media.upload.dir:./uploads/media}") String uploadDir,
            @Value("${media.base-url:http://localhost:8080/media/}") String baseUrl) 
                throws Exception {

        this.uploadDir = Path.of(uploadDir).toAbsolutePath();
        Files.createDirectories(this.uploadDir);
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    }

    @Override
    public String store(InputStream input, String contentType, String keyHint) 
            throws Exception {

        String ext = "bin";
        if (contentType != null && contentType.contains("/")) {
            ext = contentType.substring(contentType.indexOf('/') + 1).replaceAll("[^a-zA-Z0-9]", "");
        }
        LocalDate d = LocalDate.now();
        String key = String
            .format("%d/%02d/%02d/%s.%s", d.getYear(), d.getMonthValue(), d.getDayOfMonth(), UUID.randomUUID(), ext);
        Path target = uploadDir.resolve(key);
        Files.createDirectories(target.getParent());
        try (OutputStream os = Files.newOutputStream(target)) {
            input.transferTo(os);
        }
        return key;
    }

    @Override
    public String getUrl(String key) {
        return baseUrl + key;
    }

    @Override
    public void delete(String key) throws Exception {
        Path target = uploadDir.resolve(key);
        Files.deleteIfExists(target);
    }
}
