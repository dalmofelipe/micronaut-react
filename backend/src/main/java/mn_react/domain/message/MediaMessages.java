package mn_react.domain.message;

public final class MediaMessages {

    private MediaMessages() {}

    // --- ValidationException ---

    public static final String FILE_EMPTY = "Arquivo está vazio";
    public static final String FILE_TOO_LARGE = "Tamanho do arquivo excede o limite máximo de 1MB";
    public static final String FILENAME_REQUIRED = "Nome do arquivo é obrigatório";

    public static String forbiddenType(String contentType) {
        return "Tipo de arquivo '%s' não é permitido".formatted(contentType);
    }

    public static String uploadFailed(String reason) {
        return "Falha ao enviar arquivo: %s".formatted(reason);
    }
}
