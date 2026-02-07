package mn_react.core.usecase;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import mn_react.core.domain.entities.Content;
import mn_react.core.repository.ContentRepository;

class CreateContentUseCaseTest {

    private ContentRepository contentRepository;
    private CreateContentUseCase createContentUseCase;

    @BeforeEach
    void setup() {
        contentRepository = mock(ContentRepository.class);
        when(contentRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        createContentUseCase = new CreateContentUseCase(contentRepository);
    }

    @Test
    void shouldRemoveScriptTagsAndJavascriptUris() {
        Content c = new Content();
        c.setTitulo("XSS test");
        c.setAutorId(1L);
        c.setConteudo("<p>safe</p><script>alert(1)</script><a href=\"javascript:alert(1)\">bad</a>");

        Content saved = createContentUseCase.execute(c);

        assertNotNull(saved.getConteudo());
        assertFalse(saved.getConteudo().contains("script"), "script tags must be removed");
        assertFalse(saved.getConteudo().toLowerCase().contains("javascript:"), "javascript: URIs must be stripped");
        assertTrue(saved.getConteudo().contains("<p>safe</p>"), "allowed HTML should remain");
    }

    @Test
    void shouldAllowBasicFormattingAndImages() {
        Content c = new Content();
        c.setTitulo("Formatting");
        c.setAutorId(1L);
        c.setConteudo("<p><strong>bold</strong> <em>italic</em></p><img src=\"/media/foo.jpg\" alt=\"x\" />");

        Content saved = createContentUseCase.execute(c);

        assertTrue(saved.getConteudo().contains("<strong>bold</strong>"));
        assertTrue(saved.getConteudo().contains("img"));
    }
}