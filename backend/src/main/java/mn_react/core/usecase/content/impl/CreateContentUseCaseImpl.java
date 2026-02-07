package mn_react.core.usecase.content.impl;

import java.time.LocalDateTime;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Document.OutputSettings;

import mn_react.core.domain.entities.Content;
import mn_react.core.repository.ContentRepository;
import mn_react.core.usecase.content.CreateContentUseCase;

public class CreateContentUseCaseImpl implements CreateContentUseCase {
    private final ContentRepository contentRepository;

    public CreateContentUseCaseImpl(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    @Override
    public Content execute(Content content) {
        // Sanitizar HTML WYSIWYG antes de validações e persistência
        if (content.getConteudo() != null) {
            content.setConteudo(sanitizeHtml(content.getConteudo()));
        }

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

    private String sanitizeHtml(String html) {
        if (html == null || html.trim().isEmpty()) return html;
        // Start from a relaxed safelist and tighten it for our use-case
        org.jsoup.safety.Safelist safelist = org.jsoup.safety.Safelist.relaxed()
            .removeTags("iframe", "script", "style")
            .addTags("picture", "source")
            .addAttributes("img", "loading", "decoding")
            .preserveRelativeLinks(true);

        // Allow only http/https data for src/href (Jsoup removes javascript: URIs by default in urls)
        OutputSettings outputSettings = new Document.OutputSettings();
        outputSettings.prettyPrint(false);

        String cleaned = org.jsoup.Jsoup.clean(html, "", safelist, outputSettings);
        return cleaned;
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
