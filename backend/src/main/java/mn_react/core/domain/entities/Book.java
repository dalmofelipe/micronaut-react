package mn_react.core.domain.entities;

import java.time.LocalDateTime;

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

    public boolean isAvailable() {
        return active && availableQuantity != null && availableQuantity > 0;
    }

    public boolean isQuantityValid() {
        return availableQuantity != null 
            && totalQuantity != null 
            && availableQuantity >= 0 
            && availableQuantity <= totalQuantity;
    }
}

