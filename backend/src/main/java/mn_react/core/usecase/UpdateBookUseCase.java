package mn_react.core.usecase;

import mn_react.core.domain.entities.Book;

public interface UpdateBookUseCase {
    Book execute(Long id, String title, int pages);
}
