import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Edit, Delete, ToggleOn, ToggleOff } from '@mui/icons-material';
import type { IUser } from '../../shared/types/User';

interface UserActionsMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedUser: IUser | null;
  onEdit: () => void;
  onToggleActive: () => void;
  onDelete: () => void;
}

export function UserActionsMenu({
  anchorEl,
  onClose,
  selectedUser,
  onEdit,
  onToggleActive,
  onDelete,
}: UserActionsMenuProps) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem onClick={onEdit}>
        <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
        <ListItemText>Editar</ListItemText>
      </MenuItem>
      <MenuItem onClick={onToggleActive}>
        <ListItemIcon>
          {selectedUser?.active ? <ToggleOff fontSize="small" /> : <ToggleOn fontSize="small" />}
        </ListItemIcon>
        <ListItemText>{selectedUser?.active ? 'Desativar' : 'Ativar'}</ListItemText>
      </MenuItem>
      <MenuItem onClick={onDelete}>
        <ListItemIcon><Delete fontSize="small" /></ListItemIcon>
        <ListItemText>Deletar</ListItemText>
      </MenuItem>
    </Menu>
  );
}
