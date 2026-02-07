package mn_react.adapter.api;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.multipart.CompletedFileUpload;
import jakarta.inject.Inject;
import mn_react.adapter.api.dto.responses.MediaUploadResponse;
import mn_react.core.usecase.media.UploadMediaUseCase;

@Controller("/media")
public class MediaController {

    private final UploadMediaUseCase uploadMediaUseCase;

    @Inject
    public MediaController(UploadMediaUseCase uploadMediaUseCase) {
        this.uploadMediaUseCase = uploadMediaUseCase;
    }

    @Post(consumes = MediaType.MULTIPART_FORM_DATA)
    public HttpResponse<MediaUploadResponse> upload(CompletedFileUpload file) {
        MediaUploadResponse res = uploadMediaUseCase.execute(file);
        return HttpResponse.ok(res);
    }
}
