package mn_react.core.usecase.book;

import mn_react.core.domain.entities.Book;

public interface UpdateBookDetailsUseCase {
    Book execute(Long id, Book bookDetails);
}
