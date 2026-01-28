package mn_react.adapter.api.dto;

import java.time.LocalDateTime;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.core.domain.entities.Book;

@Serdeable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookResponse {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String genre;
    private Integer pages;
    private Integer totalQuantity;
    private Integer availableQuantity;
    private String summary;
    private String imageUrl;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static BookResponse fromDomain(Book book) {
        return BookResponse.builder()
            .id(book.getId())
            .title(book.getTitle())
            .author(book.getAuthor())
            .isbn(book.getIsbn())
            .genre(book.getGenre())
            .pages(book.getPages())
            .totalQuantity(book.getTotalQuantity())
            .availableQuantity(book.getAvailableQuantity())
            .summary(book.getSummary())
            .imageUrl(book.getImageUrl())
            .active(book.getActive())
            .createdAt(book.getCreatedAt())
            .updatedAt(book.getUpdatedAt())
            .build();
    }
}
