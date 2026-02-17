package mn_react.core.domain.exception;

public abstract sealed class DomainException extends RuntimeException
        permits NotFoundException, ValidationException, ConflictException,
                UnprocessableEntityException, UnauthorizedException, ForbiddenException {

    public DomainException(String message) {
        super(message);
    }

    public DomainException(String message, Throwable cause) {
        super(message, cause);
    }
}
