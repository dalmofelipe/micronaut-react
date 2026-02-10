import { TableCell, TableRow, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import type { IBook } from "../../shared/types/Book";

interface BooksTableRowProps {
  book: IBook;
  onActionClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export function BooksTableRow({ book, onActionClick }: BooksTableRowProps) {
  return (
    <TableRow hover>
      <TableCell>{book.id}</TableCell>
      <TableCell>{book.title}</TableCell>
      <TableCell>{book.author || "-"}</TableCell>
      <TableCell>{book.genre || "-"}</TableCell>
      <TableCell>{book.totalAvailable}</TableCell>
      <TableCell>{book.pages}</TableCell>
      <TableCell align="right">
        <IconButton onClick={onActionClick}>
          <MoreVert />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
