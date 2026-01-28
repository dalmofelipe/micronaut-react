package mn_react.core.domain.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private BigDecimal accumulatedFines;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public boolean canBorrowBooks() {
        if (!active || accumulatedFines == null) {
            return false;
        }
        return accumulatedFines.compareTo(new BigDecimal("20.00")) <= 0;
    }

    public boolean hasFines() {
        return accumulatedFines != null && accumulatedFines.compareTo(BigDecimal.ZERO) > 0;
    }
}
