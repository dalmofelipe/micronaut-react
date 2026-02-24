package mn_react.domain.exception;

public class NotFoundException extends DomainException {
    
    public NotFoundException(String message) {
        super(message);
    }
    
    public NotFoundException(String entityName, Object id) {
        super(entityName + " not found with ID: " + id);
    }
}
