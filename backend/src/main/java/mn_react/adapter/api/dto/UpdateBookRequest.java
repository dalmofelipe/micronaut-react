package mn_react.adapter.api.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.adapter.api.validation.ValidIsbn;

@Serdeable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateBookRequest {
    
    @NotBlank(message = "Título é obrigatório")
    @Size(max = 255, message = "Título não pode exceder 255 caracteres")
    private String title;
    
    @Size(max = 150, message = "Autor não pode exceder 150 caracteres")
    private String author;
    
    @ValidIsbn
    private String isbn;
    
    @NotBlank(message = "Gênero é obrigatório")
    private String genre;
    
    @Min(value = 1, message = "Páginas deve ser no mínimo 1")
    @Max(value = 10000, message = "Páginas não pode exceder 10000")
    private Integer pages;
    
    @NotNull(message = "Quantidade total é obrigatória")
    @Min(value = 1, message = "Quantidade total deve ser no mínimo 1")
    private Integer totalQuantity;
    
    @NotNull(message = "Quantidade disponível é obrigatória")
    @Min(value = 0, message = "Quantidade disponível não pode ser negativa")
    private Integer availableQuantity;
    
    @Size(max = 1000, message = "Resumo não pode exceder 1000 caracteres")
    private String summary;
    
    @Pattern(
        regexp = "^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$", 
        message = "URL da imagem inválida", 
        flags = Pattern.Flag.CASE_INSENSITIVE
    )
    private String imageUrl;
}
