package mn_react.core.repository;

import mn_react.core.domain.entities.Loan;
import mn_react.core.domain.entities.LoanStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface LoanRepository {
    List<Loan> findAll();
    List<Loan> findAll(int page, int size, LoanStatus status, Long userId);
    long count();
    long count(LoanStatus status, Long userId);
    Optional<Loan> findById(Long id);
    List<Loan> findByUserId(Long userId);
    List<Loan> findByBookId(Long bookId);
    List<Loan> findByStatus(LoanStatus status);
    List<Loan> findOverdue(LocalDate currentDate);
    long countByStatus(LoanStatus status);
    Loan save(Loan loan);
    Loan update(Loan loan);
    void deleteById(Long id);
}
