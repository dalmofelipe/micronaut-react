package mn_react.application.usecase.media;

import io.micronaut.http.multipart.CompletedFileUpload;
import mn_react.infrastructure.http.dto.responses.MediaUploadResponse;

public interface UploadMediaUseCase {
    MediaUploadResponse execute(CompletedFileUpload file);
}
