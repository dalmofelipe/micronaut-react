package mn_react.adapter.api.dto;

import java.util.List;

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
public class PagedResponse<T> {
    private List<T> content;
    private Integer page;
    private Integer size;
    private Long totalElements;
    private Integer totalPages;
}
