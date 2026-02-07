package mn_react.config.factories;

import io.micronaut.context.annotation.Factory;
import jakarta.inject.Singleton;
import mn_react.core.repository.ContentRepository;
import mn_react.core.usecase.content.CreateContentUseCase;
import mn_react.core.usecase.content.impl.CreateContentUseCaseImpl;

@Factory
public class ContentUseCaseFactory {

    @Singleton
    CreateContentUseCase createContentUseCase(ContentRepository contentRepository) {
        return new CreateContentUseCaseImpl(contentRepository);
    }
}
