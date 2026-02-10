package mn_react.adapter.api;

import java.util.List;

import io.micronaut.core.annotation.Nullable;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.QueryValue;
import jakarta.validation.Valid;
import mn_react.adapter.api.dto.requests.CreateBookRequest;
import mn_react.adapter.api.dto.requests.UpdateBookRequest;
import mn_react.adapter.api.dto.responses.BookResponse;
import mn_react.adapter.api.dto.responses.PagedResponse;
import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.book.CreateBookUseCase;
import mn_react.core.usecase.book.DeleteBookUseCase;
import mn_react.core.usecase.book.UpdateBookUseCase;

@Controller("/books")
public class BookController {

    private final BookRepository bookRepository;
    private final CreateBookUseCase createBookUseCase;
    private final UpdateBookUseCase updateBookUseCase;
    private final DeleteBookUseCase deleteBookUseCase;

    public BookController(
        BookRepository bookRepository,
        CreateBookUseCase createBookUseCase,
        UpdateBookUseCase updateBookUseCase,
        DeleteBookUseCase deleteBookUseCase
    ) {
        this.bookRepository = bookRepository;
        this.createBookUseCase = createBookUseCase;
        this.updateBookUseCase = updateBookUseCase;
        this.deleteBookUseCase = deleteBookUseCase;
    }

    @Get
    HttpResponse<?> getAllBooks(
            @QueryValue(defaultValue = "0") int page,
            @QueryValue(defaultValue = "10") int size,
            @Nullable @QueryValue(defaultValue = "") String search) {

        if (page == -1) {
            List<BookResponse> response = bookRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
            return HttpResponse.ok(response);
        }

        List<Book> books = bookRepository.findAll(page, size, search);
        long total = bookRepository.count(search);
        List<BookResponse> content = books.stream()
            .map(this::toResponse)
            .toList();
        
        PagedResponse<BookResponse> response = PagedResponse.<BookResponse>builder()
            .content(content)
            .page(page)
            .size(size)
            .totalElements(total)
            .build();

        return HttpResponse.ok(response);
    }
    
    @Get("/{id}")
    HttpResponse<BookResponse> getBook(@PathVariable Long id) {
        Book response = bookRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Book", id));

        return HttpResponse.ok(this.toResponse(response));
    }

    @Post
    HttpResponse<BookResponse> createBook(@Valid @Body CreateBookRequest request) {
        Book created = createBookUseCase.execute(request.getTitle(), request.getPages());
        return HttpResponse.created(toResponse(created));
    }

    @Put("/{id}")
    HttpResponse<BookResponse> updateBook(
        @PathVariable Long id, 
        @Valid @Body UpdateBookRequest request
    ) {
        Book updated = updateBookUseCase.execute(id, request.getTitle(), request.getPages());
        return HttpResponse.ok(toResponse(updated));
    }

    @Delete("/{id}")
    HttpResponse<Void> deleteBook(@PathVariable Long id) {
        deleteBookUseCase.execute(id);
        return HttpResponse.noContent();
    }

    // Mapper: Domain → DTO
    private BookResponse toResponse(Book book) {
        return BookResponse.builder()
            .id(book.getId())
            .title(book.getTitle())
            .pages(book.getPages())
            .build();
    }
}
