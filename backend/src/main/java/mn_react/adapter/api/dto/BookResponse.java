package mn_react.adapter.api.dto;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Serdeable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookResponse {
    private Long id;
    private String title;
    private int pages;
    private String author;
    private String isbn;
    private String genre;
    private Integer totalQuantity;
    private Integer availableQuantity;
    private String summary;
    private String imageUrl;
    private Boolean active;
}
