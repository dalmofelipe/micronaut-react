package mn_react.adapter.persistence.entity;

import io.micronaut.data.annotation.DateCreated;
import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.data.annotation.MappedProperty;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.core.domain.entities.Loan;
import mn_react.core.domain.entities.LoanStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Serdeable
@MappedEntity(value = "loans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanEntity {
    
    @Id
    @GeneratedValue(GeneratedValue.Type.IDENTITY)
    private Long id;
    
    @MappedProperty("user_id")
    private Long userId;
    
    @MappedProperty("book_id")
    private Long bookId;
    
    @MappedProperty("data_emprestimo")
    private LocalDate dataEmprestimo;
    
    @MappedProperty("data_prevista_devolucao")
    private LocalDate dataPrevistaDevolucao;
    
    @MappedProperty("data_real_devolucao")
    private LocalDate dataRealDevolucao;
    
    private String status;
    
    @DateCreated
    @MappedProperty("created_at")
    private LocalDateTime createdAt;

    public Loan toDomain() {
        return Loan.builder()
            .id(this.id)
            .userId(this.userId)
            .bookId(this.bookId)
            .dataEmprestimo(this.dataEmprestimo)
            .dataPrevistaDevolucao(this.dataPrevistaDevolucao)
            .dataRealDevolucao(this.dataRealDevolucao)
            .status(this.status != null ? LoanStatus.valueOf(this.status) : null)
            .build();
    }

    public static LoanEntity fromDomain(Loan loan) {
        return LoanEntity.builder()
            .id(loan.getId())
            .userId(loan.getUserId())
            .bookId(loan.getBookId())
            .dataEmprestimo(loan.getDataEmprestimo())
            .dataPrevistaDevolucao(loan.getDataPrevistaDevolucao())
            .dataRealDevolucao(loan.getDataRealDevolucao())
            .status(loan.getStatus() != null ? loan.getStatus().name() : null)
            .build();
    }
}
