package mn_react.core.usecase.content;

import mn_react.core.domain.entities.Content;

public interface CreateContentUseCase {
    Content execute(Content content);
}
