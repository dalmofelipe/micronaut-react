-- seed data for tests/dev environment

INSERT INTO users (name, email, active, created_at) VALUES
  ('João Silva','joao@example.com',true,CURRENT_TIMESTAMP),
  ('Maria Santos','maria@example.com',true,CURRENT_TIMESTAMP),
  ('Pedro Oliveira','pedro@example.com',true,CURRENT_TIMESTAMP),
  ('Ana Costa','ana@example.com',false,CURRENT_TIMESTAMP),
  ('Carlos Ferreira','carlos@example.com',true,CURRENT_TIMESTAMP);

INSERT INTO books (title, pages) VALUES
  ('The Lord of the Rings',1178),
  ('The Hobbit',310),
  ('Harry Potter',223),
  ('1984',328),
  ('Clean Code',464);

INSERT INTO loans (user_id, book_id, data_emprestimo, data_prevista_devolucao, data_real_devolucao, status) VALUES
  (1,1,CURRENT_DATE-5,CURRENT_DATE+9,NULL,'ATIVO'),
  (2,2,CURRENT_DATE-10,CURRENT_DATE-3,NULL,'ATRASADO'),
  (3,3,CURRENT_DATE-20,CURRENT_DATE-6,CURRENT_DATE-5,'DEVOLVIDO'),
  (1,4,CURRENT_DATE-2,CURRENT_DATE+12,NULL,'ATIVO');
