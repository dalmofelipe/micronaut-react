package mn_react.core.usecase.media.impl;

import java.io.InputStream;

import io.micronaut.http.multipart.CompletedFileUpload;
import mn_react.adapter.api.dto.responses.MediaUploadResponse;
import mn_react.core.domain.exception.ValidationException;
import mn_react.core.repository.MediaStorage;
import mn_react.core.usecase.media.UploadMediaUseCase;

public class UploadMediaUseCaseImpl implements UploadMediaUseCase {

    private static final long MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
    private static final String[] FORBIDDEN_TYPES = {"image/svg+xml", "application/x-shockwave-flash"};

    private final MediaStorage mediaStorage;

    public UploadMediaUseCaseImpl(MediaStorage mediaStorage) {
        this.mediaStorage = mediaStorage;
    }

    @Override
    public MediaUploadResponse execute(CompletedFileUpload file) {
        validateFile(file);

        try (InputStream is = file.getInputStream()) {
            String contentType = file.getContentType()
                .map(Object::toString)
                .orElse("application/octet-stream");

            String key = mediaStorage.store(is, contentType, file.getFilename());
            String url = mediaStorage.getUrl(key);
            
            MediaUploadResponse res = new MediaUploadResponse();
            res.setKey(key);
            res.setUrl(url);
            res.setType(contentType);
            res.setSize(file.getSize());
            
            return res;
        } catch (Exception e) {
            throw new ValidationException("Failed to upload file: " + e.getMessage());
        }
    }

    private void validateFile(CompletedFileUpload file) {
        if (file.getSize() <= 0) {
            throw new ValidationException("File is empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new ValidationException("File size exceeds maximum allowed size of 1MB");
        }

        String contentType = file.getContentType()
            .map(Object::toString)
            .orElse("");

        for (String forbiddenType : FORBIDDEN_TYPES) {
            if (forbiddenType.equalsIgnoreCase(contentType)) {
                throw new ValidationException("File type '" + contentType + "' is not allowed");
            }
        }

        if (file.getFilename().isEmpty()) {
            throw new ValidationException("Filename is required");
        }
    }
}
