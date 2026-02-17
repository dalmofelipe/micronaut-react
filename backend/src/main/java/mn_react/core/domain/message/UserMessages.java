package mn_react.core.domain.message;

public final class UserMessages {

    private UserMessages() {}

    // --- NotFoundException ---

    public static String notFound(Long id) {
        return "Usuário não encontrado com id: %d".formatted(id);
    }

    // --- ValidationException ---

    public static final String NAME_REQUIRED = "Nome não pode estar vazio";
    public static final String NAME_TOO_LONG = "Nome não pode exceder 255 caracteres";
    public static final String EMAIL_REQUIRED = "Email não pode estar vazio";
    public static final String EMAIL_INVALID = "Formato de email inválido";
    public static final String EMAIL_TOO_LONG = "Email não pode exceder 255 caracteres";

    // --- ConflictException ---

    public static String duplicateEmail(String email) {
        return "Já existe um usuário com o email '%s'".formatted(email);
    }

    // --- UnprocessableEntityException ---

    public static final String HAS_ACTIVE_LOANS = "Não é possível excluir usuário com empréstimos ativos";
}
