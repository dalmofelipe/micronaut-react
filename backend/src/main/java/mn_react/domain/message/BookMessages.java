package mn_react.domain.message;

public final class BookMessages {

    private BookMessages() {}

    // --- NotFoundException ---

    public static String notFound(Long id) {
        return "Livro não encontrado com id: %d".formatted(id);
    }

    // --- ValidationException ---

    public static final String TITLE_REQUIRED = "Título não pode estar vazio";

    public static String titleTooLong(int maxLength) {
        return "Título não pode exceder %d caracteres".formatted(maxLength);
    }

    public static final String PAGES_POSITIVE = "Número de páginas deve ser maior que 0";

    public static String pagesTooMany(int maxLength) {
        return "Número de páginas não pode exceder %d".formatted(maxLength);
    }

    // --- ConflictException ---

    public static String duplicateTitle(String title) {
        return "Já existe um livro com o título '%s'".formatted(title);
    }
}
