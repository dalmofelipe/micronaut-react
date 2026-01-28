package mn_react.adapter.persistence.entity;

import io.micronaut.data.annotation.DateCreated;
import io.micronaut.data.annotation.DateUpdated;
import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Serdeable
@MappedEntity
public abstract class BaseEntity {

    @Id
    @GeneratedValue(GeneratedValue.Type.IDENTITY)
    private Long id;

    private Boolean active = true;

    @DateCreated
    private LocalDateTime createdAt;

    @DateUpdated
    private LocalDateTime updatedAt;
}
