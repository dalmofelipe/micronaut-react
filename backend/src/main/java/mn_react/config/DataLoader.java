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
            // Fantasy
            bookJdbcRepository.save(BookEntity.builder()
                .title("The Lord of the Rings")
                .author("J.R.R. Tolkien")
                .pages(1178)
                .isbn("9780544003415")
                .genre("FANTASY")
                .totalQuantity(3)
                .availableQuantity(2)
                .summary("Epic fantasy tale of hobbits, wizards, and the quest to destroy the One Ring and defeat the Dark Lord Sauron.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg")
                .active(true)
                .build());

            bookJdbcRepository.save(BookEntity.builder()
                .title("The Hobbit")
                .author("J.R.R. Tolkien")
                .pages(310)
                .isbn("9780547928227")
                .genre("FANTASY")
                .totalQuantity(2)
                .availableQuantity(0)
                .summary("Bilbo Baggins embarks on an unexpected adventure with dwarves to reclaim their homeland from the dragon Smaug.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg")
                .active(true)
                .build());

            bookJdbcRepository.save(BookEntity.builder()
                .title("Harry Potter and the Philosopher's Stone")
                .author("J.K. Rowling")
                .pages(223)
                .isbn("9780439708180")
                .genre("FANTASY")
                .totalQuantity(4)
                .availableQuantity(1)
                .summary("Harry Potter discovers he's a wizard and begins his magical education at Hogwarts School of Witchcraft and Wizardry.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598823299i/42844155.jpg")
                .active(true)
                .build());

            // Science Fiction
            bookJdbcRepository.save(BookEntity.builder()
                .title("Dune")
                .author("Frank Herbert")
                .pages(688)
                .isbn("9780441172719")
                .genre("SCIENCE_FICTION")
                .totalQuantity(2)
                .availableQuantity(2)
                .summary("Set on the desert planet Arrakis, this epic tells the story of Paul Atreides and the struggle for control of melange, the most valuable substance in the universe.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg")
                .active(true)
                .build());

            bookJdbcRepository.save(BookEntity.builder()
                .title("Foundation")
                .author("Isaac Asimov")
                .pages(255)
                .isbn("9780553293357")
                .genre("SCIENCE_FICTION")
                .totalQuantity(3)
                .availableQuantity(3)
                .summary("The story of mathematician Hari Seldon who develops psychohistory to predict the future and preserve knowledge during the fall of the Galactic Empire.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg")
                .active(true)
                .build());

            bookJdbcRepository.save(BookEntity.builder()
                .title("Neuromancer")
                .author("William Gibson")
                .pages(271)
                .isbn("9780441569595")
                .genre("SCIENCE_FICTION")
                .totalQuantity(1)
                .availableQuantity(0)
                .summary("A cyberpunk masterpiece following hacker Case as he's hired for one last job in cyberspace, defining the genre of cyberpunk fiction.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554437249i/6088007.jpg")
                .active(true)
                .build());

            // Comics
            bookJdbcRepository.save(BookEntity.builder()
                .title("Watchmen")
                .author("Alan Moore")
                .pages(448)
                .isbn("9781401245252")
                .genre("COMICS")
                .totalQuantity(2)
                .availableQuantity(1)
                .summary("A groundbreaking graphic novel that deconstructs the superhero genre, exploring themes of power, morality, and human nature.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442239711i/472331.jpg")
                .active(true)
                .build());

            bookJdbcRepository.save(BookEntity.builder()
                .title("The Sandman Vol. 1: Preludes & Nocturnes")
                .author("Neil Gaiman")
                .pages(240)
                .isbn("9781852863753")
                .genre("COMICS")
                .totalQuantity(3)
                .availableQuantity(2)
                .summary("The story of Dream, one of the Endless, as he escapes captivity and rebuilds his realm in this dark fantasy masterpiece.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398256849i/23754.jpg")
                .active(true)
                .build());

            // Manga
            bookJdbcRepository.save(BookEntity.builder()
                .title("Fullmetal Alchemist Vol. 1")
                .author("Hiromu Arakawa")
                .pages(192)
                .isbn("9781591169208")
                .genre("MANGA")
                .totalQuantity(5)
                .availableQuantity(4)
                .summary("Brothers Edward and Alphonse Elric search for the Philosopher's Stone to restore their bodies after a failed alchemical experiment.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320288828i/870.jpg")
                .active(true)
                .build());

            bookJdbcRepository.save(BookEntity.builder()
                .title("Death Note Vol. 1")
                .author("Tsugumi Ohba")
                .pages(200)
                .isbn("9781421501383")
                .genre("MANGA")
                .totalQuantity(3)
                .availableQuantity(1)
                .summary("Light Yagami discovers a supernatural notebook that kills anyone whose name is written in it, sparking a cat-and-mouse game with detective L.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388267059i/13615.jpg")
                .active(true)
                .build());

            // Technical/Biography
            bookJdbcRepository.save(BookEntity.builder()
                .title("Clean Code")
                .author("Robert C. Martin")
                .pages(464)
                .isbn("9780132350884")
                .genre("TECHNICAL")
                .totalQuantity(4)
                .availableQuantity(3)
                .summary("A handbook of agile software craftsmanship with practical advice on writing clean, maintainable code.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg")
                .active(true)
                .build());

            bookJdbcRepository.save(BookEntity.builder()
                .title("Steve Jobs")
                .author("Walter Isaacson")
                .pages(656)
                .isbn("9781451648539")
                .genre("BIOGRAPHY")
                .totalQuantity(2)
                .availableQuantity(2)
                .summary("The authorized biography of Apple co-founder Steve Jobs, based on exclusive interviews and unprecedented access.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327861368i/11084145.jpg")
                .active(true)
                .build());

            // Horror
            bookJdbcRepository.save(BookEntity.builder()
                .title("The Shining")
                .author("Stephen King")
                .pages(447)
                .isbn("9780307743657")
                .genre("HORROR")
                .totalQuantity(2)
                .availableQuantity(0)
                .summary("Jack Torrance becomes winter caretaker of the isolated Overlook Hotel, where supernatural forces threaten his sanity and his family.")
                .imageUrl("https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg")
                .active(true)
                .build());
        }
    }
}
