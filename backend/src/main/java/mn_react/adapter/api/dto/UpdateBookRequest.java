package mn_react.adapter.api.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
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
public class UpdateBookRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @Min(value = 1, message = "Pages must be at least 1")
    private int pages;
}
