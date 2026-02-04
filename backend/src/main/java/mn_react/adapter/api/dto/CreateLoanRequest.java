package mn_react.adapter.api.dto;

import java.time.LocalDate;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotNull;
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
public class CreateLoanRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Book ID is required")
    private Long bookId;

    private LocalDate dataPrevistaDevolucao;
}
