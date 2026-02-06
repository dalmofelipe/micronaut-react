import type { IBook } from "@/shared/types";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface BookTableProps {
  books: IBook[];
  isLoading: boolean;
  totalElements: number;
  page: number;
  size: number;
  onPageChange: (newPage: number) => void;
  onSizeChange: (newSize: number) => void;
  onEdit: (book: IBook) => void;
  onDelete: (book: IBook) => void;
}

export const BookTable = ({
  books,
  isLoading,
  totalElements,
  page,
  size,
  onPageChange,
  onSizeChange,
  onEdit,
  onDelete,
}: BookTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuBook, setMenuBook] = useState<IBook | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    book: IBook,
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuBook(book);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuBook(null);
  };

  const handleEditClick = () => {
    if (menuBook) onEdit(menuBook);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (menuBook) onDelete(menuBook);
    handleMenuClose();
  };

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
      <TableRow key={book.id} hover>
        <TableCell>{book.id}</TableCell>
        <TableCell>{book.title}</TableCell>
        <TableCell>{book.autor || "-"}</TableCell>
        <TableCell>{book.genero || "-"}</TableCell>
        <TableCell>{book.quantidadeTotal}</TableCell>
        <TableCell align="right">
          <IconButton onClick={(e) => handleMenuOpen(e, book)}>
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
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
        onRowsPerPageChange={(e) => onSizeChange(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Deletar</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};
