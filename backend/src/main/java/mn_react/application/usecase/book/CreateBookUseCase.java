package mn_react.application.usecase.book;

import mn_react.domain.entities.Book;

public interface CreateBookUseCase {
    Book execute(String title, int pages);
}
