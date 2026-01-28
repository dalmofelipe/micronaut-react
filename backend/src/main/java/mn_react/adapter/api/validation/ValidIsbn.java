package mn_react.adapter.api.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = IsbnValidator.class)
public @interface ValidIsbn {
    String message() default "ISBN inválido. Formato esperado: ISBN-10 (10 dígitos) ou ISBN-13 (13 dígitos)";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
