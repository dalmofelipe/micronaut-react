package mn_react.config;

import io.micronaut.context.event.ApplicationEventListener;
import io.micronaut.runtime.server.event.ServerStartupEvent;
import jakarta.inject.Singleton;
import mn_react.adapter.persistence.jdbc.BookJdbcRepository;
import mn_react.adapter.persistence.entity.BookEntity;

@Singleton
public class DataLoader implements ApplicationEventListener<ServerStartupEvent> {
    
    private final BookJdbcRepository bookJdbcRepository;

    public DataLoader(BookJdbcRepository bookJdbcRepository) {
        this.bookJdbcRepository = bookJdbcRepository;
    }

    @Override
    public void onApplicationEvent(ServerStartupEvent event) {
        if(bookJdbcRepository.count() == 0) {
            bookJdbcRepository.save(BookEntity.builder().title("The Lord of the Rings").pages(1178).build());
            bookJdbcRepository.save(BookEntity.builder().title("The Hobbit").pages(310).build());
            bookJdbcRepository.save(BookEntity.builder().title("Harry Potter").pages(223).build());
        }
    }
}
