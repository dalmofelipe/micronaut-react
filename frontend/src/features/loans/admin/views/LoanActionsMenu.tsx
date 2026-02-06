import { AssignmentReturn, Delete } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import type { ILoan } from '../../shared/types/Loan';

interface ILoanActionsMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedLoan: ILoan | null;
  onReturn: () => void;
  onDeleteClick: () => void;
}

export function LoanActionsMenu({
  anchorEl,
  onClose,
  selectedLoan,
  onReturn,
  onDeleteClick,
}: ILoanActionsMenuProps) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {selectedLoan?.status === 'ATIVO' && (
        <MenuItem onClick={onReturn}>
          <ListItemIcon>
            <AssignmentReturn fontSize="small" />
          </ListItemIcon>
          <ListItemText>Devolver</ListItemText>
        </MenuItem>
      )}
      <MenuItem onClick={onDeleteClick}>
        <ListItemIcon>
          <Delete fontSize="small" />
        </ListItemIcon>
        <ListItemText>Deletar</ListItemText>
      </MenuItem>
    </Menu>
  );
}
