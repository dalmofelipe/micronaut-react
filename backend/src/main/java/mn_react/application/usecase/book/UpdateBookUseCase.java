package mn_react.application.usecase.book;

import mn_react.domain.entities.Book;

public interface UpdateBookUseCase {
    Book execute(Long id, String title, Integer pages);
}
