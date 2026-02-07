package mn_react.core.usecase;

import jakarta.inject.Singleton;
import mn_react.core.domain.entities.Content;
import mn_react.core.repository.ContentRepository;
import java.time.LocalDateTime;

@Singleton
public class CreateContentUseCase {
    private final ContentRepository contentRepository;

    public CreateContentUseCase(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public Content execute(Content content) {
        // Validações
        validateContent(content);

        // Set timestamps
        content.setCreatedAt(LocalDateTime.now());
        content.setUpdatedAt(LocalDateTime.now());
        if (content.getStatus() == null) {
            content.setStatus("rascunho");
        }

        return contentRepository.save(content);
    }

    private void validateContent(Content content) {
        if (content.getTitulo() == null || content.getTitulo().trim().isEmpty()) {
            throw new IllegalArgumentException("Título é obrigatório");
        }
        if (content.getConteudo() == null || content.getConteudo().trim().isEmpty()) {
            throw new IllegalArgumentException("Conteúdo é obrigatório");
        }
        if (content.getAutorId() == null) {
            throw new IllegalArgumentException("Autor é obrigatório");
        }
    }
}