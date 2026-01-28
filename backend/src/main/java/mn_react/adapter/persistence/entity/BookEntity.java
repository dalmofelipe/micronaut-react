package mn_react.adapter.persistence.entity;

import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.data.annotation.MappedProperty;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Serdeable
@MappedEntity(value = "TB_BOOKS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookEntity {
    
    @Id
    @GeneratedValue(GeneratedValue.Type.IDENTITY)
    @MappedProperty("ID")
    private Long id;
    
    @MappedProperty("TITLE")
    private String title;
    
    @MappedProperty("PAGES")
    private int pages;
    
    // Future properties (Fase 1):
    @MappedProperty("AUTHOR")
    private String author;
    
    @MappedProperty("ISBN")
    private String isbn;
    
    @MappedProperty("GENRE")
    private String genre;
    
    @MappedProperty("TOTAL_QUANTITY")
    private Integer totalQuantity;
    
    @MappedProperty("AVAILABLE_QUANTITY")
    private Integer availableQuantity;
    
    @MappedProperty("SUMMARY")
    private String summary;
    
    @MappedProperty("IMAGE_URL")
    private String imageUrl;
    
    @MappedProperty("ACTIVE")
    private Boolean active;
}
