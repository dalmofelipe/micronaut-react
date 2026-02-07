package mn_react.core.usecase.media;

import io.micronaut.http.multipart.CompletedFileUpload;
import mn_react.adapter.api.dto.responses.MediaUploadResponse;

public interface UploadMediaUseCase {
    MediaUploadResponse execute(CompletedFileUpload file);
}
