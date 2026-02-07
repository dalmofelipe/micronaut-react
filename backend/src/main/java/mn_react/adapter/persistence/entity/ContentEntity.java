package mn_react.adapter.persistence.entity;

import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.core.domain.entities.Content;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Serdeable
@MappedEntity(value = "contents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentEntity {
    
    @Id
    @GeneratedValue(GeneratedValue.Type.IDENTITY)
    private Long id;
    
    private String titulo;
    
    private String conteudo;
    
    private String conteudoJson; // optional ProseMirror JSON (serialized)
    
    private String categoria;
    
    private String status;
    
    private Long autorId;
    
    private String mediaUrlsJson;
    
    private boolean ativo = true;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public Content toDomain() {
        List<String> mediaUrls = null;
        if (mediaUrlsJson != null && !mediaUrlsJson.isEmpty()) {
            try {
                mediaUrls = objectMapper.readValue(mediaUrlsJson, new TypeReference<List<String>>() {});
            } catch (Exception e) {
                // Handle error
            }
        }
        return Content.builder()
            .id(this.id)
            .titulo(this.titulo)
            .conteudo(this.conteudo)
            .conteudoJson(this.conteudoJson)
            .categoria(this.categoria)
            .status(this.status)
            .autorId(this.autorId)
            .mediaUrls(mediaUrls)
            .ativo(this.ativo)
            .createdAt(this.createdAt)
            .updatedAt(this.updatedAt)
            .build();
    }

    public static ContentEntity fromDomain(Content content) {
        String mediaUrlsJson = null;
        if (content.getMediaUrls() != null) {
            try {
                mediaUrlsJson = objectMapper.writeValueAsString(content.getMediaUrls());
            } catch (Exception e) {
                // Handle error
            }
        }
        return ContentEntity.builder()
            .id(content.getId())
            .titulo(content.getTitulo())
            .conteudo(content.getConteudo())
            .conteudoJson(content.getConteudoJson())
            .categoria(content.getCategoria())
            .status(content.getStatus())
            .autorId(content.getAutorId())
            .mediaUrlsJson(mediaUrlsJson)
            .ativo(content.isAtivo())
            .createdAt(content.getCreatedAt())
            .updatedAt(content.getUpdatedAt())
            .build();
    }
}