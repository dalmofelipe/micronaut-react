-- Create users table
CREATE TABLE IF NOT EXISTS tb_users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    accumulated_fines DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for common queries
CREATE INDEX idx_users_active ON tb_users(active);
CREATE INDEX idx_users_email ON tb_users(email);

-- Seed data: 5 example users (famous computer scientists)
INSERT INTO tb_users (name, email, phone, accumulated_fines, active) VALUES
('Ada Lovelace', 'ada.lovelace@example.com', '(11) 98765-4321', 0.00, true),
('Alan Turing', 'alan.turing@example.com', '(21) 99876-5432', 0.00, true),
('Grace Hopper', 'grace.hopper@example.com', '(31) 97654-3210', 0.00, true),
('Linus Torvalds', 'linus.torvalds@example.com', '(41) 96543-2109', 0.00, true),
('Margaret Hamilton', 'margaret.hamilton@example.com', '(51) 95432-1098', 0.00, true);
