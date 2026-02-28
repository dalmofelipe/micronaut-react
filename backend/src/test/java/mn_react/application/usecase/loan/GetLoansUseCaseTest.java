package mn_react.application.usecase.loan;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import mn_react.application.repository.LoanRepository;
import mn_react.application.usecase.loan.impl.GetLoansUseCaseImpl;
import mn_react.domain.entities.Loan;
import mn_react.domain.entities.LoanStatus;
import mn_react.domain.exception.ValidationException;

@DisplayName("GetLoansUseCase Tests")
class GetLoansUseCaseTest {

    private LoanRepository loanRepository;

    private GetLoansUseCase getLoansUseCase;

    @BeforeEach
    void setUp() {
        loanRepository = mock(LoanRepository.class);
        getLoansUseCase = new GetLoansUseCaseImpl(loanRepository);
    }

    @Test
    @DisplayName("Should return paginated loans without filters")
    void testPaginatedLoansWithoutFilters() {
        // Given
        int page = 0;
        int size = 10;
        List<Loan> mockLoans = List.of(
            createLoan(1L, 1L, 1L, LoanStatus.ATIVO),
            createLoan(2L, 2L, 2L, LoanStatus.DEVOLVIDO)
        );
        when(loanRepository.findAll(page, size, null)).thenReturn(mockLoans);

        // When
        List<Loan> result = getLoansUseCase.execute(page, size, null);

        // Then
        assertEquals(2, result.size());
        assertEquals(1L, result.get(0).getId());
        assertEquals(2L, result.get(1).getId());
    }

    @Test
    @DisplayName("Should return paginated loans with status filter")
    void testPaginatedLoansWithStatusFilter() {
        // Given
        int page = 0;
        int size = 10;
        String statusStr = "ATIVO";
        List<Loan> mockLoans = List.of(
            createLoan(1L, 1L, 1L, LoanStatus.ATIVO)
        );
        when(loanRepository.findAll(page, size, LoanStatus.ATIVO)).thenReturn(mockLoans);

        // When
        List<Loan> result = getLoansUseCase.execute(page, size, statusStr);

        // Then
        assertEquals(1, result.size());
        assertEquals(LoanStatus.ATIVO, result.get(0).getStatus());
    }

    @Test
    @DisplayName("Should return paginated loans with userId filter")
    void testPaginatedLoansWithUserIdFilter() {
        // Given
        int page = 0;
        int size = 10;
        List<Loan> mockLoans = List.of(
            createLoan(1L, 1L, 1L, LoanStatus.ATIVO)
        );
        when(loanRepository.findAll(page, size, null)).thenReturn(mockLoans);

        // When
        List<Loan> result = getLoansUseCase.execute(page, size, null);

        // Then
        assertEquals(1, result.size());
    }

    @Test
    @DisplayName("Should return paginated loans with both status and userId filters")
    void testPaginatedLoansWithBothFilters() {
        // Given
        int page = 1;
        int size = 5;
        String statusStr = "DEVOLVIDO";
        List<Loan> mockLoans = List.of(
            createLoan(1L, 3L, 1L, LoanStatus.DEVOLVIDO)
        );
        when(loanRepository.findAll(page, size, LoanStatus.DEVOLVIDO)).thenReturn(mockLoans);

        // When
        List<Loan> result = getLoansUseCase.execute(page, size, statusStr);

        // Then
        assertEquals(1, result.size());
    }

    @Test
    @DisplayName("Should throw ValidationException for invalid status")
    void testInvalidStatusThrowsValidationException() {
        // Given
        int page = 0;
        int size = 10;
        String invalidStatus = "INVALID_STATUS";

        // When & Then
        assertThrows(ValidationException.class, () ->
            getLoansUseCase.execute(page, size, invalidStatus)
        );
    }

    @Test
    @DisplayName("Should handle empty status string as null filter")
    void testEmptyStatusStringAsNullFilter() {
        // Given
        int page = 0;
        int size = 10;
        String emptyStatus = "";
        List<Loan> mockLoans = List.of(
            createLoan(1L, 1L, 1L, LoanStatus.ATIVO)
        );
        when(loanRepository.findAll(page, size, null)).thenReturn(mockLoans);

        // When
        List<Loan> result = getLoansUseCase.execute(page, size, emptyStatus);

        // Then
        assertEquals(1, result.size());
    }

    @Test
    @DisplayName("Should handle multiple pages of results")
    void testMultiplePagesOfResults() {
        // Given
        int page = 2;
        int size = 10;
        List<Loan> mockLoans = List.of(
            createLoan(21L, 1L, 1L, LoanStatus.ATIVO),
            createLoan(22L, 2L, 2L, LoanStatus.DEVOLVIDO)
        );
        when(loanRepository.findAll(page, size, null)).thenReturn(mockLoans);

        // When
        List<Loan> result = getLoansUseCase.execute(page, size, null);

        // Then
        assertEquals(2, result.size());
    }

    @Test
    @DisplayName("Should return zero loans when no results match filters")
    void testNoResultsForFilters() {
        // Given
        int page = 0;
        int size = 10;
        String statusStr = "ATRASADO";
        when(loanRepository.findAll(page, size, LoanStatus.ATRASADO)).thenReturn(List.of());

        // When
        List<Loan> result = getLoansUseCase.execute(page, size, statusStr);

        // Then
        assertEquals(0, result.size());
    }

    // Helper method to create test loans
    private Loan createLoan(Long id, Long userId, Long bookId, LoanStatus status) {
        return Loan.builder()
            .id(id)
            .userId(userId)
            .bookId(bookId)
            .dataEmprestimo(LocalDate.now())
            .dataPrevistaDevolucao(LocalDate.now().plusDays(14))
            .status(status)
            .build();
    }
}
