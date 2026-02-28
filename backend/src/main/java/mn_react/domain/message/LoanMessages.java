package mn_react.domain.message;

public final class LoanMessages {
    private LoanMessages() {}

    public static final String INVALID_STATUS 
        = "Invalid loan status. Must be one of: ATIVO, DEVOLVIDO, ATRASADO";

    public static String notFound(Long id) {
        return "Loan not found with id: %d".formatted(id);
    }
}
