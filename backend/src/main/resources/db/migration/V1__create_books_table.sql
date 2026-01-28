-- Create books table
CREATE TABLE IF NOT EXISTS books (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150),
    isbn VARCHAR(13) UNIQUE,
    genre VARCHAR(50) NOT NULL,
    pages INTEGER NOT NULL DEFAULT 1,
    total_quantity INTEGER NOT NULL DEFAULT 1,
    available_quantity INTEGER NOT NULL DEFAULT 1,
    summary TEXT,
    image_url VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for common queries
CREATE INDEX idx_books_active ON books(active);
CREATE INDEX idx_books_genre ON books(genre);
CREATE INDEX idx_books_isbn ON books(isbn);

-- Seed data: 14 books across all genres
INSERT INTO books (title, author, pages, isbn, genre, total_quantity, available_quantity, summary, image_url, active) VALUES
-- Fantasy
('The Lord of the Rings', 'J.R.R. Tolkien', 1178, '9780544003415', 'FANTASY', 3, 2, 
'Epic fantasy tale of hobbits, wizards, and the quest to destroy the One Ring and defeat the Dark Lord Sauron.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg', true),

('The Hobbit', 'J.R.R. Tolkien', 310, '9780547928227', 'FANTASY', 2, 0, 
'Bilbo Baggins embarks on an unexpected adventure with dwarves to reclaim their homeland from the dragon Smaug.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg', true),

('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 223, '9780439708180', 'FANTASY', 4, 1, 
'Harry Potter discovers he''s a wizard and begins his magical education at Hogwarts School of Witchcraft and Wizardry.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1598823299i/42844155.jpg', true),

-- Science Fiction
('Dune', 'Frank Herbert', 688, '9780441172719', 'SCIENCE_FICTION', 2, 2, 
'Set on the desert planet Arrakis, this epic tells the story of Paul Atreides and the struggle for control of melange, the most valuable substance in the universe.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg', true),

('Foundation', 'Isaac Asimov', 255, '9780553293357', 'SCIENCE_FICTION', 3, 3, 
'The story of mathematician Hari Seldon who develops psychohistory to predict the future and preserve knowledge during the fall of the Galactic Empire.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg', true),

('Neuromancer', 'William Gibson', 271, '9780441569595', 'SCIENCE_FICTION', 1, 0, 
'A cyberpunk masterpiece following hacker Case as he''s hired for one last job in cyberspace, defining the genre of cyberpunk fiction.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554437249i/6088007.jpg', true),

-- Comics
('Watchmen', 'Alan Moore', 448, '9781401245252', 'COMICS', 2, 1, 
'A groundbreaking graphic novel that deconstructs the superhero genre, exploring themes of power, morality, and human nature.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442239711i/472331.jpg', true),

('The Sandman Vol. 1: Preludes & Nocturnes', 'Neil Gaiman', 240, '9781852863753', 'COMICS', 3, 2, 
'The story of Dream, one of the Endless, as he escapes captivity and rebuilds his realm in this dark fantasy masterpiece.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398256849i/23754.jpg', true),

-- Manga
('Fullmetal Alchemist Vol. 1', 'Hiromu Arakawa', 192, '9781591169208', 'MANGA', 5, 4, 
'Brothers Edward and Alphonse Elric search for the Philosopher''s Stone to restore their bodies after a failed alchemical experiment.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320288828i/870.jpg', true),

('Death Note Vol. 1', 'Tsugumi Ohba', 200, '9781421501383', 'MANGA', 3, 1, 
'Light Yagami discovers a supernatural notebook that kills anyone whose name is written in it, sparking a cat-and-mouse game with detective L.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388267059i/13615.jpg', true),

-- Technical/Biography
('Clean Code', 'Robert C. Martin', 464, '9780132350884', 'TECHNICAL', 4, 3, 
'A handbook of agile software craftsmanship with practical advice on writing clean, maintainable code.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg', true),

('Steve Jobs', 'Walter Isaacson', 656, '9781451648539', 'BIOGRAPHY', 2, 2, 
'The authorized biography of Apple co-founder Steve Jobs, based on exclusive interviews and unprecedented access.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327861368i/11084145.jpg', true),

-- Horror
('The Shining', 'Stephen King', 447, '9780307743657', 'HORROR', 2, 0, 
'Jack Torrance becomes winter caretaker of the isolated Overlook Hotel, where supernatural forces threaten his sanity and his family.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg', true),

-- Romance (adding one more for variety)
('Pride and Prejudice', 'Jane Austen', 279, '9780141439518', 'ROMANCE', 3, 3, 
'The romantic clash between the opinionated Elizabeth Bennet and her proud beau, Mr. Darcy, in Regency England.', 
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg', true);
