package mn_react.adapter.api;

import java.util.List;
import java.util.stream.Collectors;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.http.annotation.Status;
import jakarta.validation.Valid;
import mn_react.adapter.api.dto.BookResponse;
import mn_react.adapter.api.dto.CreateBookRequest;
import mn_react.adapter.api.dto.UpdateBookRequest;
import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.CreateBookUseCase;
import mn_react.core.usecase.DeleteBookUseCase;
import mn_react.core.usecase.UpdateBookUseCase;

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
    HttpResponse<List<BookResponse>> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        List<BookResponse> response = books.stream()
            .map(BookResponse::fromDomain)
            .collect(Collectors.toList());
        
        return HttpResponse.ok(response);
    }
    
    @Get("/{id}")
    HttpResponse<BookResponse> getBook(@PathVariable Long id) {
        Book book = bookRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Livro não encontrado com ID: " + id));

        return HttpResponse.ok(BookResponse.fromDomain(book));
    }

    @Post
    @Status(HttpStatus.CREATED)
    HttpResponse<BookResponse> createBook(@Valid @Body CreateBookRequest request) {
        Book book = request.toBook();
        Book created = createBookUseCase.execute(book);

        return HttpResponse.created(BookResponse.fromDomain(created));
    }

    @Put("/{id}")
    HttpResponse<BookResponse> updateBook(
        @PathVariable Long id,
        @Valid @Body UpdateBookRequest request
    ) {
        Book book = Book.builder()
            .title(request.getTitle())
            .author(request.getAuthor())
            .isbn(request.getIsbn())
            .genre(request.getGenre())
            .pages(request.getPages())
            .totalQuantity(request.getTotalQuantity())
            .availableQuantity(request.getAvailableQuantity())
            .summary(request.getSummary())
            .imageUrl(request.getImageUrl())
            .build();
        
        Book updated = updateBookUseCase.execute(id, book);

        return HttpResponse.ok(BookResponse.fromDomain(updated));
    }

    @Delete("/{id}")
    @Status(HttpStatus.NO_CONTENT)
    void deleteBook(@PathVariable Long id) {
        deleteBookUseCase.execute(id);
    }

    @Get("/search")
    HttpResponse<List<BookResponse>> searchBooks(
        @QueryValue(value = "title", defaultValue = "") String title,
        @QueryValue(value = "author", defaultValue = "") String author,
        @QueryValue(value = "genre", defaultValue = "") String genre,
        @QueryValue(value = "available", defaultValue = "false") Boolean onlyAvailable
    ) {
        List<Book> books = bookRepository.findAll();

        if (!title.isBlank()) {
            String searchTerm = title.toLowerCase();
            books = books.stream()
                .filter(book -> book.getTitle().toLowerCase().contains(searchTerm))
                .collect(Collectors.toList());
        }

        if (!author.isBlank()) {
            String searchTerm = author.toLowerCase();
            books = books.stream()
                .filter(book -> book.getAuthor() != null && book.getAuthor().toLowerCase().contains(searchTerm))
                .collect(Collectors.toList());
        }

        if (!genre.isBlank()) {
            books = books.stream()
                .filter(book -> book.getGenre() != null && book.getGenre().equalsIgnoreCase(genre))
                .collect(Collectors.toList());
        }

        if (onlyAvailable) {
            books = books.stream()
                .filter(Book::isAvailable)
                .collect(Collectors.toList());
        }

        List<BookResponse> response = books.stream()
            .map(BookResponse::fromDomain)
            .collect(Collectors.toList());

        return HttpResponse.ok(response);
    }
}
