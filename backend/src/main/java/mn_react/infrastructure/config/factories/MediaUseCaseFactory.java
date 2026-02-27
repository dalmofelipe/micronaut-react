package mn_react.infrastructure.config.factories;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.application.repository.MediaStorage;
import mn_react.application.usecase.media.UploadMediaUseCase;
import mn_react.application.usecase.media.impl.UploadMediaUseCaseImpl;

@Factory
public class MediaUseCaseFactory {

    @Singleton
    UploadMediaUseCase uploadMediaUseCase(MediaStorage mediaStorage) {
        return new UploadMediaUseCaseImpl(mediaStorage);
    }
}
