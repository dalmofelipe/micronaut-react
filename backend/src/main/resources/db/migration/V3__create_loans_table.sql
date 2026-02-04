-- Create loans table
CREATE TABLE loans (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_prevista_devolucao DATE NOT NULL,
    data_real_devolucao DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'ATIVO',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_loans_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_loans_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    CONSTRAINT chk_loan_status CHECK (status IN ('ATIVO', 'DEVOLVIDO', 'ATRASADO'))
);

-- Create indexes for faster queries
CREATE INDEX idx_loans_user_id ON loans(user_id);
CREATE INDEX idx_loans_book_id ON loans(book_id);
CREATE INDEX idx_loans_status ON loans(status);
CREATE INDEX idx_loans_data_emprestimo ON loans(data_emprestimo);
