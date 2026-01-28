package mn_react.adapter.persistence.entity;

import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.data.annotation.MappedProperty;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.core.domain.entities.Book;

@Serdeable
@MappedEntity(value = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookEntity extends BaseEntity {
    
    @MappedProperty("title")
    private String title;
    
    @MappedProperty("author")
    private String author;
    
    @MappedProperty("isbn")
    private String isbn;
    
    @MappedProperty("genre")
    private String genre;
    
    @MappedProperty("pages")
    private Integer pages;
    
    @MappedProperty("total_quantity")
    private Integer totalQuantity;
    
    @MappedProperty("available_quantity")
    private Integer availableQuantity;
    
    @MappedProperty("summary")
    private String summary;
    
    @MappedProperty("image_url")
    private String imageUrl;

    public Book toDomain() {
        return Book.builder()
            .id(this.getId())
            .title(this.title)
            .author(this.author)
            .isbn(this.isbn)
            .genre(this.genre)
            .pages(this.pages)
            .totalQuantity(this.totalQuantity)
            .availableQuantity(this.availableQuantity)
            .summary(this.summary)
            .imageUrl(this.imageUrl)
            .active(this.getActive())
            .createdAt(this.getCreatedAt())
            .updatedAt(this.getUpdatedAt())
            .build();
    }

    public static BookEntity fromDomain(Book book) {
        BookEntity entity = BookEntity.builder()
            .title(book.getTitle())
            .author(book.getAuthor())
            .isbn(book.getIsbn())
            .genre(book.getGenre())
            .pages(book.getPages())
            .totalQuantity(book.getTotalQuantity())
            .availableQuantity(book.getAvailableQuantity())
            .summary(book.getSummary())
            .imageUrl(book.getImageUrl())
            .build();
        
        entity.setId(book.getId());
        entity.setActive(book.getActive() != null ? book.getActive() : true);
        entity.setCreatedAt(book.getCreatedAt());
        entity.setUpdatedAt(book.getUpdatedAt());
        
        return entity;
    }
}
