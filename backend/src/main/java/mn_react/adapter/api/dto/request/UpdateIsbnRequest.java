package mn_react.adapter.api.dto.request;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.adapter.api.validation.ValidIsbn;

@Serdeable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateIsbnRequest {

    @NotBlank(message = "ISBN é obrigatório")
    @ValidIsbn
    private String isbn;
}
