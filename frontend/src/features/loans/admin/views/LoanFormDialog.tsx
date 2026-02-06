import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { FormContainer } from './styles/AdminLoans.styled';

interface ILoanFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: { userId: string; bookId: string };
  onChange: (field: string, value: string) => void;
  users: any[];
  books: any[];
  isLoading: boolean;
}

export function LoanFormDialog({
  open,
  onClose,
  onSubmit,
  formData,
  onChange,
  users,
  books,
  isLoading,
}: ILoanFormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>

      <DialogTitle>Novo Empréstimo</DialogTitle>

      <DialogContent>
        <FormContainer>
          <FormControl fullWidth required>
            <InputLabel>Usuário</InputLabel>
            <Select
              value={formData.userId}
              onChange={(e) => onChange('userId', e.target.value)}
              label="Usuário"
              disabled={isLoading}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>Livro</InputLabel>
            <Select
              value={formData.bookId}
              onChange={(e) => onChange('bookId', e.target.value)}
              label="Livro"
              disabled={isLoading}
            >
              {books.map((book) => (
                <MenuItem key={book.id} value={book.id}>
                  {book.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormContainer>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={onSubmit} variant="contained" disabled={isLoading}>
          {isLoading ? 'Criando...' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
