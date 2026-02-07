package mn_react.core.domain.entities;

import java.time.LocalDateTime;
import java.util.List;
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
public class Content {
    private Long id;
    private String titulo;
    private String conteudo;  // Rich text
    private String conteudoJson; // optional ProseMirror JSON (serialized)
    private String categoria;
    private String status;  // rascunho, publicado
    private Long autorId;
    private List<String> mediaUrls;
    private boolean ativo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}