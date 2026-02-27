package mn_react.infrastructure.persistence.entity;

import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.domain.entities.Book;

@Serdeable
@MappedEntity(value = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookEntity {
    
    @Id
    @GeneratedValue(GeneratedValue.Type.IDENTITY)
    private Long id;
    
    private String title;
    
    private int pages;

    public Book toDomain() {
        return Book.builder()
            .id(this.id)
            .title(this.title)
            .pages(this.pages)
            .build();
    }

    public static BookEntity fromDomain(Book book) {
        return BookEntity.builder()
            .id(book.getId())
            .title(book.getTitle())
            .pages(book.getPages())
            .build();
    }
}
