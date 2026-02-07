package mn_react.adapter.api.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.*;
import mn_react.core.domain.entities.Content;
import java.util.List;

@Serdeable
public class CreateContentRequest {
    @NotBlank
    private String titulo;

    @NotBlank
    private String conteudo;
    private String conteudoJson;

    private String categoria;

    private String status;

    @NotNull
    private Long autorId;

    private List<String> mediaUrls;

    // Getters and setters
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }

    public String getConteudoJson() { return conteudoJson; }
    public void setConteudoJson(String conteudoJson) { this.conteudoJson = conteudoJson; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getAutorId() { return autorId; }
    public void setAutorId(Long autorId) { this.autorId = autorId; }

    public List<String> getMediaUrls() { return mediaUrls; }
    public void setMediaUrls(List<String> mediaUrls) { this.mediaUrls = mediaUrls; }

    public Content toContent() {
        Content content = new Content();
        content.setTitulo(this.titulo);
        content.setConteudo(this.conteudo);
        content.setConteudoJson(this.conteudoJson);
        content.setCategoria(this.categoria);
        content.setStatus(this.status);
        content.setAutorId(this.autorId);
        content.setMediaUrls(this.mediaUrls);
        content.setAtivo(true);
        return content;
    }
}