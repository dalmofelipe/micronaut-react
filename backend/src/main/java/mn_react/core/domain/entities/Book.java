package mn_react.core.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {
    private Long id;
    private String title;
    private int pages;
    // Future properties (Fase 1):
    private String author;
    private String isbn;
    private String genre; // Will use GenreEnum when implemented
    private Integer totalQuantity;
    private Integer availableQuantity;
    private String summary;
    private String imageUrl;
    private Boolean active;
}
