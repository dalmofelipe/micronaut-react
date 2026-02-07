-- V6__add_media_urls_json_and_migrate_data.sql
-- Adiciona coluna compatível com naming convention (media_urls_json) e copia valores de media_urls
ALTER TABLE contents ADD COLUMN media_urls_json TEXT;

-- Copia dados existentes (se houver) para a nova coluna
UPDATE contents SET media_urls_json = media_urls WHERE media_urls_json IS NULL;

-- Nota: manteremos a coluna antiga `media_urls` por compatibilidade
