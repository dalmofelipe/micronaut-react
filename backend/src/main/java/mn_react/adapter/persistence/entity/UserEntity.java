package mn_react.adapter.persistence.entity;

import java.math.BigDecimal;

import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.data.annotation.MappedProperty;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mn_react.core.domain.entities.User;

@Serdeable
@MappedEntity(value = "tb_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity extends BaseEntity {
    
    @MappedProperty("name")
    private String name;
    
    @MappedProperty("email")
    private String email;
    
    @MappedProperty("phone")
    private String phone;
    
    @MappedProperty("accumulated_fines")
    private BigDecimal accumulatedFines;

    public User toDomain() {
        return User.builder()
            .id(this.getId())
            .name(this.name)
            .email(this.email)
            .phone(this.phone)
            .accumulatedFines(this.accumulatedFines != null ? this.accumulatedFines : BigDecimal.ZERO)
            .active(this.getActive())
            .createdAt(this.getCreatedAt())
            .updatedAt(this.getUpdatedAt())
            .build();
    }

    public static UserEntity fromDomain(User user) {
        UserEntity entity = UserEntity.builder()
            .name(user.getName())
            .email(user.getEmail())
            .phone(user.getPhone())
            .accumulatedFines(user.getAccumulatedFines() != null ? user.getAccumulatedFines() : BigDecimal.ZERO)
            .build();
        
        entity.setId(user.getId());
        entity.setActive(user.getActive() != null ? user.getActive() : true);
        entity.setCreatedAt(user.getCreatedAt());
        entity.setUpdatedAt(user.getUpdatedAt());
        
        return entity;
    }
}
