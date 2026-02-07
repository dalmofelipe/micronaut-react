package mn_react.core.usecase.book;

import mn_react.core.domain.entities.Book;

public interface UpdateBookUseCase {
    Book execute(Long id, String title, Integer pages);
}
