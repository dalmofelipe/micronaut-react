package mn_react.infrastructure.http.controllers;

import java.util.List;
import java.util.stream.Collectors;

import io.micronaut.core.annotation.Nullable;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Patch;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.QueryValue;
import jakarta.validation.Valid;
import mn_react.application.repository.LoanRepository;
import mn_react.application.usecase.loan.CreateLoanUseCase;
import mn_react.application.usecase.loan.ReturnLoanUseCase;
import mn_react.domain.entities.Loan;
import mn_react.domain.entities.LoanStatus;
import mn_react.domain.exception.NotFoundException;
import mn_react.infrastructure.http.dto.requests.CreateLoanRequest;
import mn_react.infrastructure.http.dto.responses.LoanResponse;
import mn_react.infrastructure.http.dto.responses.PagedResponse;

@Controller("/loans")
public class LoanController {

    private final LoanRepository loanRepository;
    private final CreateLoanUseCase createLoanUseCase;
    private final ReturnLoanUseCase returnLoanUseCase;

    public LoanController(
        LoanRepository loanRepository, 
        CreateLoanUseCase createLoanUseCase,
        ReturnLoanUseCase returnLoanUseCase
    ) {
        this.loanRepository = loanRepository;
        this.createLoanUseCase = createLoanUseCase;
        this.returnLoanUseCase = returnLoanUseCase;
    }

    @Get
    HttpResponse<?> getAllLoans(
        @QueryValue(defaultValue = "0") int page, 
        @QueryValue(defaultValue = "10") int size, 
        @Nullable @QueryValue String status, 
        @Nullable @QueryValue Long userId
    ) {
        if (page == -1) {
            return HttpResponse.ok(loanRepository.findAll().stream()
                .map(LoanResponse::fromDomain).collect(Collectors.toList()));
        }

        LoanStatus loanStatus = status != null && !status.isEmpty() 
            ? LoanStatus.valueOf(status) 
            : null;

        List<Loan> loans = loanRepository.findAll(page, size, loanStatus, userId);
        Long total = loanRepository.count(loanStatus, userId);

        List<LoanResponse> content = loans.stream()
            .map(LoanResponse::fromDomain)
            .collect(Collectors.toList());

        PagedResponse<LoanResponse> response = PagedResponse.<LoanResponse>builder()
            .content(content)
            .page(page)
            .size(size)
            .totalElements(total)
            .build();

        return HttpResponse.ok(response);
    }

    @Get("/count")
    HttpResponse<Long> count(@Nullable @QueryValue String status) {
        if (status == null || status.isEmpty()) {
            return HttpResponse.ok(loanRepository.count());
        }
        return HttpResponse.ok(loanRepository.countByStatus(LoanStatus.valueOf(status)));
    }

    @Get("/{id}")
    HttpResponse<LoanResponse> getLoan(@PathVariable Long id) {
        LoanResponse response = LoanResponse.fromDomain(loanRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Loan", id)));

        return HttpResponse.ok(response);
    }

    @Post
    HttpResponse<LoanResponse> createLoan(@Valid @Body CreateLoanRequest request) {
        Loan created = createLoanUseCase
            .execute(request.getUserId(), request.getBookId(), request.getDataPrevistaDevolucao());

        return HttpResponse.created(LoanResponse.fromDomain(created));
    }

    @Patch("/{id}/return")
    HttpResponse<LoanResponse> returnLoan(@PathVariable Long id) {
        Loan returned = returnLoanUseCase.execute(id);

        return HttpResponse.ok(LoanResponse.fromDomain(returned));
    }

    @Delete("/{id}")
    HttpResponse<Void> deleteLoan(@PathVariable Long id) {
        loanRepository.deleteById(id);

        return HttpResponse.noContent();
    }
}
