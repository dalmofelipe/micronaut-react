package mn_react.core.usecase.media.impl;

import java.io.InputStream;

import io.micronaut.http.multipart.CompletedFileUpload;
import mn_react.adapter.api.dto.responses.MediaUploadResponse;
import mn_react.core.repository.MediaStorage;
import mn_react.core.usecase.media.UploadMediaUseCase;

public class UploadMediaUseCaseImpl implements UploadMediaUseCase {

    private final MediaStorage mediaStorage;

    public UploadMediaUseCaseImpl(MediaStorage mediaStorage) {
        this.mediaStorage = mediaStorage;
    }

    @Override
    public MediaUploadResponse execute(CompletedFileUpload file) {
        try (InputStream is = file.getInputStream()) {
            // basic validations (MVP)
            String contentType = file.getContentType()
                .map(Object::toString)
                .orElse("application/octet-stream");

            long size = file.getSize();
            if ("image/svg+xml".equalsIgnoreCase(contentType)) {
                throw new IllegalArgumentException("SVG uploads are not allowed");
            }
            if (size <= 0) {
                throw new IllegalArgumentException("Empty file");
            }

            String key = mediaStorage.store(is, contentType, file.getFilename());
            String url = mediaStorage.getUrl(key);
            
            MediaUploadResponse res = new MediaUploadResponse();
            res.setKey(key);
            res.setUrl(url);
            res.setType(contentType);
            res.setSize(size);
            
            return res;
        } catch (IllegalArgumentException iae) {
            throw iae;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
