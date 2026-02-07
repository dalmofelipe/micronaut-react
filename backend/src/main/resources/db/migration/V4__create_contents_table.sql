-- V4__create_contents_table.sql
CREATE TABLE contents (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,  -- Rich text HTML/JSON
    categoria VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'rascunho',  -- rascunho, publicado
    autor_id BIGINT NOT NULL,
    media_urls TEXT,  -- JSON array como string para H2
    ativo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES users(id)
);