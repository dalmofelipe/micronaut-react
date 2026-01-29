package mn_react.core.usecase.book;

import mn_react.core.domain.entities.Book;

public interface AddBookStockUseCase {
    Book execute(Long bookId, int quantityToAdd);
}
