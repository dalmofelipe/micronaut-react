package mn_react.adapter.api.dto.request;

import java.math.BigDecimal;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.core.domain.entities.User;

@Serdeable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {

    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 150, message = "Nome não pode exceder 150 caracteres")
    private String name;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(
        regexp = "\\(\\d{2}\\) \\d{5}-\\d{4}",
        message = "Formato esperado: (XX) XXXXX-XXXX"
    )
    private String phone;

    public User toUser() {
        return User.builder()
            .name(this.name)
            .email(this.email)
            .phone(this.phone)
            .accumulatedFines(BigDecimal.ZERO)
            .active(true)
            .build();
    }
}
