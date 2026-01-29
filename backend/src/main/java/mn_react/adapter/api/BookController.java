package mn_react.adapter.api;

import java.util.List;
import java.util.stream.Collectors;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Patch;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.http.annotation.Status;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.groups.ConvertGroup;
import mn_react.adapter.api.dto.request.AddStockRequest;
import mn_react.adapter.api.dto.request.BookRequest;
import mn_react.adapter.api.dto.request.UpdateIsbnRequest;
import mn_react.adapter.api.dto.response.BookResponse;
import mn_react.adapter.api.dto.validation.OnCreate;
import mn_react.adapter.api.dto.validation.OnUpdate;
import mn_react.core.domain.entities.Book;
import mn_react.core.domain.exception.NotFoundException;
import mn_react.core.repository.BookRepository;
import mn_react.core.usecase.book.AddBookStockUseCase;
import mn_react.core.usecase.book.CreateBookUseCase;
import mn_react.core.usecase.book.DeleteBookUseCase;
import mn_react.core.usecase.book.UpdateBookDetailsUseCase;
import mn_react.core.usecase.book.UpdateBookIsbnUseCase;

@Controller("/books")
@Tag(name = "Books")
public class BookController {

    private final BookRepository bookRepository;
    private final CreateBookUseCase createBookUseCase;
    private final UpdateBookDetailsUseCase updateBookDetailsUseCase;
    private final UpdateBookIsbnUseCase updateBookIsbnUseCase;
    private final AddBookStockUseCase addBookStockUseCase;
    private final DeleteBookUseCase deleteBookUseCase;

    public BookController(
        BookRepository bookRepository,
        CreateBookUseCase createBookUseCase,
        UpdateBookDetailsUseCase updateBookDetailsUseCase,
        UpdateBookIsbnUseCase updateBookIsbnUseCase,
        AddBookStockUseCase addBookStockUseCase,
        DeleteBookUseCase deleteBookUseCase
    ) {
        this.bookRepository = bookRepository;
        this.createBookUseCase = createBookUseCase;
        this.updateBookDetailsUseCase = updateBookDetailsUseCase;
        this.updateBookIsbnUseCase = updateBookIsbnUseCase;
        this.addBookStockUseCase = addBookStockUseCase;
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
    HttpResponse<BookResponse> createBook(
        @Valid @ConvertGroup(to = OnCreate.class) @Body BookRequest request
    ) {
        Book book = request.toBook();
        Book created = createBookUseCase.execute(book);

        return HttpResponse.created(BookResponse.fromDomain(created));
    }

    @Put("/{id}")
    HttpResponse<BookResponse> updateBook(
        @PathVariable Long id,
        @Valid @ConvertGroup(to = OnUpdate.class) @Body BookRequest request
    ) {
        Book book = request.toBook();
        Book updated = updateBookDetailsUseCase.execute(id, book);

        return HttpResponse.ok(BookResponse.fromDomain(updated));
    }

    @Patch("/{id}/isbn")
    HttpResponse<BookResponse> updateIsbn(
        @PathVariable Long id,
        @Valid @Body UpdateIsbnRequest request
    ) {
        Book book = updateBookIsbnUseCase.execute(id, request.getIsbn());
        return HttpResponse.ok(BookResponse.fromDomain(book));
    }

    @Post("/{id}/stock")
    HttpResponse<BookResponse> addStock(
        @PathVariable Long id,
        @Valid @Body AddStockRequest request
    ) {
        Book book = addBookStockUseCase.execute(id, request.getQuantity());
        return HttpResponse.ok(BookResponse.fromDomain(book));
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
