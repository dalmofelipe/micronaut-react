package mn_react.core.usecase;

import mn_react.core.domain.entities.Book;

public interface CreateBookUseCase {
    Book execute(String title, int pages);
}
