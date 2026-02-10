package mn_react.adapter.api.exception;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Serdeable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorField {
    private String field;
    private String message;
}
