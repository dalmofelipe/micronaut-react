package mn_react.infrastructure.config;

import io.micronaut.core.annotation.Nullable;
import io.micronaut.core.order.Ordered;
import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpMethod;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.RequestFilter;
import io.micronaut.http.annotation.ResponseFilter;
import io.micronaut.http.annotation.ServerFilter;
import io.micronaut.http.filter.ServerFilterPhase;

/**
 * Filtro CORS customizado.
 *
 * Justificativa: o suporte nativo do Micronaut retorna 403 em preflights OPTIONS
 * que nao enviam o header Access-Control-Request-Headers (comportamento do Chrome
 * para requisicoes sem headers customizados). Este filtro contorna esse bug.
 *
 * Referencia: ADR-015 / Micronaut Docs 6.24 - HTTP Filters
 */
@ServerFilter(ServerFilter.MATCH_ALL_PATTERN)
public class CorsFilter implements Ordered {

    @Override
    public int getOrder() {
        return ServerFilterPhase.SECURITY.before();
    }

    private static final String ALLOWED_METHODS = "GET, POST, PUT, PATCH, DELETE, OPTIONS";
    private static final String ALLOWED_HEADERS = "Content-Type, Authorization, Accept, X-Requested-With, Origin";
    private static final String MAX_AGE = "1800";

    /**
     * Intercepta preflights OPTIONS e responde imediatamente com 200 + headers CORS.
     * Para demais metodos, retorna null para continuar o processamento normal.
     */
    @RequestFilter
    public @Nullable HttpResponse<?> handlePreflight(HttpRequest<?> request) {
        String origin = request.getHeaders().getOrigin().orElse(null);

        if (!HttpMethod.OPTIONS.equals(request.getMethod())) {
            return null; // continua o processamento normal
        }

        MutableHttpResponse<?> response = HttpResponse.ok();
        if (origin != null) {
            addCorsHeaders(response, origin);

            // Ecoa os headers solicitados pelo browser no preflight (quando presentes)
            String requestedHeaders = request.getHeaders().get(HttpHeaders.ACCESS_CONTROL_REQUEST_HEADERS);
            if (requestedHeaders != null && !requestedHeaders.isBlank()) {
                response.header(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, requestedHeaders);
            }
        }
        return response;
    }

    /**
     * Adiciona headers CORS a todas as respostas nao-OPTIONS.
     */
    @ResponseFilter
    public void addCorsHeaders(HttpRequest<?> request, MutableHttpResponse<?> response) {
        if (HttpMethod.OPTIONS.equals(request.getMethod())) {
            return; // preflight ja foi tratado em handlePreflight
        }
        String origin = request.getHeaders().getOrigin().orElse(null);
        if (origin != null) {
            addCorsHeaders(response, origin);
        }
    }

    private void addCorsHeaders(MutableHttpResponse<?> response, String origin) {
        response.header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, origin);
        response.header(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, ALLOWED_METHODS);
        response.header(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, ALLOWED_HEADERS);
        response.header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true");
        response.header(HttpHeaders.ACCESS_CONTROL_MAX_AGE, MAX_AGE);
        response.header(HttpHeaders.VARY, "Origin");
    }
}
