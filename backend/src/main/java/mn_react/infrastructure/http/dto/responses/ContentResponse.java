package mn_react.infrastructure.http.dto.responses;

import io.micronaut.serde.annotation.Serdeable;
import mn_react.domain.entities.Content;

import java.time.LocalDateTime;
import java.util.List;

@Serdeable
public class ContentResponse {
    private Long id;
    private String titulo;
    private String conteudo;
    private String conteudoJson;
    private String categoria;
    private String status;
    private Long autorId;
    private List<String> mediaUrls;
    private boolean ativo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static ContentResponse fromDomain(Content content) {
        ContentResponse response = new ContentResponse();
        response.setId(content.getId());
        response.setTitulo(content.getTitulo());
        response.setConteudo(content.getConteudo());
        response.setConteudoJson(content.getConteudoJson());
        response.setCategoria(content.getCategoria());
        response.setStatus(content.getStatus());
        response.setAutorId(content.getAutorId());
        response.setMediaUrls(content.getMediaUrls());
        response.setAtivo(content.isAtivo());
        response.setCreatedAt(content.getCreatedAt());
        response.setUpdatedAt(content.getUpdatedAt());
        return response;
    }
}