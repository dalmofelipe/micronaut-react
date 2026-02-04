package mn_react.config;

import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.runtime.server.event.ServerStartupEvent;
import jakarta.inject.Singleton;
import mn_react.adapter.persistence.jdbc.*;
import mn_react.adapter.persistence.entity.*;
import mn_react.core.domain.entities.LoanStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Singleton
public class DataLoader implements ApplicationEventListener<ServerStartupEvent> {
    
    private final BookJdbcRepository bookJdbcRepository;
    private final UserJdbcRepository userJdbcRepository;
    private final LoanJdbcRepository loanJdbcRepository;

    public DataLoader(BookJdbcRepository bookJdbcRepository, UserJdbcRepository userJdbcRepository, LoanJdbcRepository loanJdbcRepository) {
        this.bookJdbcRepository = bookJdbcRepository;
        this.userJdbcRepository = userJdbcRepository;
        this.loanJdbcRepository = loanJdbcRepository;
    }

    @Override
    public void onApplicationEvent(ServerStartupEvent event) {
        if(bookJdbcRepository.count() == 0) {
            bookJdbcRepository.save(BookEntity.builder().title("The Lord of the Rings").pages(1178).build());
            bookJdbcRepository.save(BookEntity.builder().title("The Hobbit").pages(310).build());
            bookJdbcRepository.save(BookEntity.builder().title("Harry Potter").pages(223).build());
            bookJdbcRepository.save(BookEntity.builder().title("1984").pages(328).build());
            bookJdbcRepository.save(BookEntity.builder().title("Clean Code").pages(464).build());
        }

        if(userJdbcRepository.count() == 0) {
            userJdbcRepository.save(UserEntity.builder().name("João Silva").email("joao@example.com").active(true).createdAt(LocalDateTime.now()).build());
            userJdbcRepository.save(UserEntity.builder().name("Maria Santos").email("maria@example.com").active(true).createdAt(LocalDateTime.now()).build());
            userJdbcRepository.save(UserEntity.builder().name("Pedro Oliveira").email("pedro@example.com").active(true).createdAt(LocalDateTime.now()).build());
            userJdbcRepository.save(UserEntity.builder().name("Ana Costa").email("ana@example.com").active(false).createdAt(LocalDateTime.now()).build());
            userJdbcRepository.save(UserEntity.builder().name("Carlos Ferreira").email("carlos@example.com").active(true).createdAt(LocalDateTime.now()).build());
        }

        if(loanJdbcRepository.count() == 0) {
            loanJdbcRepository.save(LoanEntity.builder().userId(1L).bookId(1L).dataEmprestimo(LocalDate.now().minusDays(5)).dataPrevistaDevolucao(LocalDate.now().plusDays(9)).status(LoanStatus.ATIVO.name()).build());
            loanJdbcRepository.save(LoanEntity.builder().userId(2L).bookId(2L).dataEmprestimo(LocalDate.now().minusDays(10)).dataPrevistaDevolucao(LocalDate.now().minusDays(3)).status(LoanStatus.ATRASADO.name()).build());
            loanJdbcRepository.save(LoanEntity.builder().userId(3L).bookId(3L).dataEmprestimo(LocalDate.now().minusDays(20)).dataPrevistaDevolucao(LocalDate.now().minusDays(6)).dataRealDevolucao(LocalDate.now().minusDays(5)).status(LoanStatus.DEVOLVIDO.name()).build());
            loanJdbcRepository.save(LoanEntity.builder().userId(1L).bookId(4L).dataEmprestimo(LocalDate.now().minusDays(2)).dataPrevistaDevolucao(LocalDate.now().plusDays(12)).status(LoanStatus.ATIVO.name()).build());
        }
    }
}
