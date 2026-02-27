package mn_react.application.usecase.content;

import mn_react.domain.entities.Content;

public interface CreateContentUseCase {
    Content execute(Content content);
}
