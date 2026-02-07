package mn_react.config.factories;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.core.repository.MediaStorage;
import mn_react.core.usecase.media.UploadMediaUseCase;
import mn_react.core.usecase.media.impl.UploadMediaUseCaseImpl;

@Factory
public class MediaUseCaseFactory {

    @Singleton
    UploadMediaUseCase uploadMediaUseCase(MediaStorage mediaStorage) {
        return new UploadMediaUseCaseImpl(mediaStorage);
    }
}
