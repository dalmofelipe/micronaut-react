package mn_react.infrastructure.persistence;

import jakarta.inject.Singleton;
import mn_react.application.repository.LoanRepository;
import mn_react.domain.entities.Loan;
import mn_react.domain.entities.LoanStatus;
import mn_react.infrastructure.persistence.entity.LoanEntity;
import mn_react.infrastructure.persistence.jdbc.LoanJdbcRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Singleton
public class LoanRepositoryImpl implements LoanRepository {

    private final LoanJdbcRepository jdbcRepository;

    public LoanRepositoryImpl(LoanJdbcRepository jdbcRepository) {
        this.jdbcRepository = jdbcRepository;
    }

    @Override
    public List<Loan> findAll() {
        return jdbcRepository.findAll().stream()
            .map(LoanEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public List<Loan> findAll(int page, int size, LoanStatus status) {
        int offset = page * size;
        String statusStr = status != null ? status.name() : null;
        return jdbcRepository.findAllPaginated(offset, size, statusStr).stream()
            .map(LoanEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public long count() {
        return jdbcRepository.count();
    }

    @Override
    public long count(LoanStatus status) {
        String statusStr = status != null ? status.name() : null;
        return jdbcRepository.countWithFilters(statusStr);
    }

    @Override
    public Optional<Loan> findById(Long id) {
        return jdbcRepository.findById(id).map(LoanEntity::toDomain);
    }

    @Override
    public List<Loan> findByUserId(Long userId) {
        return jdbcRepository.findByUserId(userId).stream()
            .map(LoanEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public List<Loan> findByBookId(Long bookId) {
        return jdbcRepository.findByBookId(bookId).stream()
            .map(LoanEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public List<Loan> findByStatus(LoanStatus status) {
        return jdbcRepository.findByStatus(status.name()).stream()
            .map(LoanEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public List<Loan> findOverdue(LocalDate currentDate) {
        return jdbcRepository.findOverdue(currentDate).stream()
            .map(LoanEntity::toDomain)
            .collect(Collectors.toList());
    }

    @Override
    public long countByStatus(LoanStatus status) {
        return jdbcRepository.countByStatus(status.name());
    }

    @Override
    public Loan save(Loan loan) {
        LoanEntity entity = LoanEntity.fromDomain(loan);
        LoanEntity saved = jdbcRepository.save(entity);
        return saved.toDomain();
    }

    @Override
    public Loan update(Loan loan) {
        LoanEntity entity = LoanEntity.fromDomain(loan);
        LoanEntity updated = jdbcRepository.update(entity);
        return updated.toDomain();
    }

    @Override
    public void deleteById(Long id) {
        jdbcRepository.deleteById(id);
    }
}
