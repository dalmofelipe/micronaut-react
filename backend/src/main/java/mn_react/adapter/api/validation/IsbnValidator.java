package mn_react.adapter.api.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class IsbnValidator implements ConstraintValidator<ValidIsbn, String> {

    @Override
    public boolean isValid(String isbn, ConstraintValidatorContext context) {
        if (isbn == null || isbn.isBlank()) {
            return true;
        }

        String normalized = isbn.replaceAll("[\\s-]", "");

        if (normalized.length() == 10) {
            return validateIsbn10(normalized);
        } else if (normalized.length() == 13) {
            return validateIsbn13(normalized);
        }

        return false;
    }

    private boolean validateIsbn10(String isbn) {
        if (!isbn.matches("^\\d{9}[\\dX]$")) {
            return false;
        }

        int sum = 0;
        for (int i = 0; i < 9; i++) {
            int digit = Character.getNumericValue(isbn.charAt(i));
            sum += digit * (10 - i);
        }

        char checkChar = isbn.charAt(9);
        int checkDigit = checkChar == 'X' ? 10 : Character.getNumericValue(checkChar);

        int expectedCheckDigit = (11 - (sum % 11)) % 11;

        return checkDigit == expectedCheckDigit;
    }

    private boolean validateIsbn13(String isbn) {
        if (!isbn.matches("^\\d{13}$")) {
            return false;
        }

        int sum = 0;
        for (int i = 0; i < 12; i++) {
            int digit = Character.getNumericValue(isbn.charAt(i));
            sum += digit * (i % 2 == 0 ? 1 : 3);
        }

        int checkDigit = Character.getNumericValue(isbn.charAt(12));
        int expectedCheckDigit = (10 - (sum % 10)) % 10;

        return checkDigit == expectedCheckDigit;
    }
}
