import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button } from '@mui/material';
import React from 'react';
import { ActionButtonsContainer, StatusBadge } from './styles/ContentList.styled';

interface IContentRowActionsProps {
  contentId: number;
  status: string;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export const ContentRowActions: React.FC<IContentRowActionsProps> = ({
  status,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const statusColors: Record<string, { label: string; color: string }> = {
    rascunho: { label: 'Rascunho', color: '#a89252' },
    publicado: { label: 'Publicado', color: '#4CAF50' },
  };
  const statusInfo = statusColors[status] || { label: status, color: '#757575' };

  return (
    <Box>
      <StatusBadge sx={{ backgroundColor: statusInfo.color }}>
        {statusInfo.label}
      </StatusBadge>

      <ActionButtonsContainer>
        <Button
          size="small"
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={onEdit}
          sx={{ textTransform: 'none' }}
        >
          Editar
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          sx={{ textTransform: 'none' }}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deletando...' : 'Deletar'}
        </Button>
      </ActionButtonsContainer>
    </Box>
  );
};
