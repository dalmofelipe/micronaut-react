package mn_react.infrastructure.config.factories;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.application.repository.ContentRepository;
import mn_react.application.usecase.content.CreateContentUseCase;
import mn_react.application.usecase.content.impl.CreateContentUseCaseImpl;

@Factory
public class ContentUseCaseFactory {

    @Singleton
    CreateContentUseCase createContentUseCase(ContentRepository contentRepository) {
        return new CreateContentUseCaseImpl(contentRepository);
    }
}
