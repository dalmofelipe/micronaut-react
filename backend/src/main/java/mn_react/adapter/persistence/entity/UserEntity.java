package mn_react.adapter.persistence.entity;

import io.micronaut.data.annotation.DateCreated;
import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.data.annotation.MappedProperty;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.core.domain.entities.User;

import java.time.LocalDateTime;

@Serdeable
@MappedEntity(value = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    
    @Id
    @GeneratedValue(GeneratedValue.Type.IDENTITY)
    private Long id;
    
    private String name;
    
    private String email;
    
    private Boolean active;
    
    @DateCreated
    @MappedProperty("created_at")
    private LocalDateTime createdAt;

    public User toDomain() {
        return User.builder()
            .id(this.id)
            .name(this.name)
            .email(this.email)
            .active(this.active)
            .createdAt(this.createdAt)
            .build();
    }

    public static UserEntity fromDomain(User user) {
        return UserEntity.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .active(user.getActive())
            .createdAt(user.getCreatedAt())
            .build();
    }
}
