package mn_react.adapter.api.dto;

import java.time.LocalDate;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.core.domain.entities.Loan;

@Serdeable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanResponse {
    private Long id;
    private Long userId;
    private Long bookId;
    private LocalDate dataEmprestimo;
    private LocalDate dataPrevistaDevolucao;
    private LocalDate dataRealDevolucao;
    private String status;

    public static LoanResponse fromDomain(Loan loan) {
        LoanResponse response = new LoanResponse();
        response.setId(loan.getId());
        response.setUserId(loan.getUserId());
        response.setBookId(loan.getBookId());
        response.setDataEmprestimo(loan.getDataEmprestimo());
        response.setDataPrevistaDevolucao(loan.getDataPrevistaDevolucao());
        response.setDataRealDevolucao(loan.getDataRealDevolucao());
        response.setStatus(loan.getStatus() != null ? loan.getStatus().name() : null);
        return response;
    }
}
