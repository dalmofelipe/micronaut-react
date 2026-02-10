import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Typography,
} from "@mui/material";
import { BooksTableRow } from "./BooksTableRow";
import type { IBook } from "../../shared/types/Book";

interface BooksTableProps {
  books: IBook[];
  isLoading: boolean;
  page: number;
  size: number;
  totalElements: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (size: number) => void;
  onActionClick: (event: React.MouseEvent<HTMLElement>, book: IBook) => void;
}

export function BooksTable({
  books,
  isLoading,
  page,
  size,
  totalElements,
  onPageChange,
  onRowsPerPageChange,
  onActionClick,
}: BooksTableProps) {
  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    }

    if (!books || books.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">
            <Typography color="text.secondary">
              Nenhum livro encontrado
            </Typography>
          </TableCell>
        </TableRow>
      );
    }

    return books.map((book) => (
      <BooksTableRow
        key={book.id}
        book={book}
        onActionClick={(e) => onActionClick(e, book)}
      />
    ));
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Gênero</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableContent()}</TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalElements}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={size}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
}
