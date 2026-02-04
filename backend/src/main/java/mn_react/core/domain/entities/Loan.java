package mn_react.core.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Loan {
    private Long id;
    private Long userId;
    private Long bookId;
    private LocalDate dataEmprestimo;
    private LocalDate dataPrevistaDevolucao;
    private LocalDate dataRealDevolucao;
    private LoanStatus status;

    public boolean isAtivo() {
        return status == LoanStatus.ATIVO;
    }

    public boolean isDevolvido() {
        return status == LoanStatus.DEVOLVIDO;
    }

    public boolean isAtrasado() {
        return status == LoanStatus.ATRASADO;
    }
}
