package mn_react.adapter.api;

import java.util.List;
import java.util.stream.Collectors;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import jakarta.validation.Valid;
import mn_react.adapter.api.dto.BookResponse;
import mn_react.adapter.api.dto.CreateBookRequest;
import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.CreateBookUseCase;

@Controller("/books")
public class BookController {

    private final BookRepository bookRepository;
    private final CreateBookUseCase createBookUseCase;

    public BookController(
        BookRepository bookRepository,
        CreateBookUseCase createBookUseCase
    ) {
        this.bookRepository = bookRepository;
        this.createBookUseCase = createBookUseCase;
    }

    @Get
    HttpResponse<List<BookResponse>> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        List<BookResponse> response = books.stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
        
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

    // Mapper: Domain → DTO
    private BookResponse toResponse(Book book) {
        return BookResponse.builder()
            .id(book.getId())
            .title(book.getTitle())
            .pages(book.getPages())
            .build();
    }
}
