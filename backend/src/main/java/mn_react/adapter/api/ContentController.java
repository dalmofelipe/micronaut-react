package mn_react.adapter.api;

import java.util.List;
import java.util.stream.Collectors;

import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Status;
import jakarta.validation.Valid;
import mn_react.adapter.api.dto.requests.CreateContentRequest;
import mn_react.adapter.api.dto.responses.ContentResponse;
import mn_react.core.repository.ContentRepository;
import mn_react.core.usecase.content.CreateContentUseCase;

@Controller("/contents")
public class ContentController {
    private final CreateContentUseCase createContentUseCase;
    private final ContentRepository contentRepository;

    public ContentController(CreateContentUseCase createContentUseCase, ContentRepository contentRepository) {
        this.createContentUseCase = createContentUseCase;
        this.contentRepository = contentRepository;
    }

    @Post
    @Status(HttpStatus.CREATED)
    public ContentResponse create(@Valid @Body CreateContentRequest request) {
        var content = createContentUseCase.execute(request.toContent());
        return ContentResponse.fromDomain(content);
    }

    @Get
    public List<ContentResponse> getAll() {
        return contentRepository.findAll().stream()
                .map(ContentResponse::fromDomain)
                .collect(Collectors.toList());
    }

    @Get("/{id}")
    public ContentResponse getById(@PathVariable Long id) {
        return contentRepository.findById(id)
                .map(ContentResponse::fromDomain)
                .orElseThrow(() -> new RuntimeException("Content not found"));
    }

    @Get("/autor/{autorId}")
    public List<ContentResponse> getByAutor(@PathVariable Long autorId) {
        return contentRepository.findByAutorId(autorId).stream()
                .map(ContentResponse::fromDomain)
                .collect(Collectors.toList());
    }

    @Get("/status/{status}")
    public List<ContentResponse> getByStatus(@PathVariable String status) {
        return contentRepository.findByStatus(status).stream()
                .map(ContentResponse::fromDomain)
                .collect(Collectors.toList());
    }

    @Delete("/{id}")
    @Status(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        contentRepository.deleteById(id);
    }
}