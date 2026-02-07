-- V5__add_conteudo_json_and_media_metadata.sql
ALTER TABLE contents ADD COLUMN conteudo_json TEXT;
ALTER TABLE contents ADD COLUMN media_metadata TEXT;
