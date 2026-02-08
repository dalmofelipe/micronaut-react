import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentListDataGrid from './ContentListDataGrid';
import { ListPageHeader } from './styles/ContentList.styled';

const ContentListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
      <ListPageHeader>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Gerenciar Conteúdos
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/admin/content/new')}>
          Novo Conteúdo
        </Button>
      </ListPageHeader>

      <ContentListDataGrid onSelectContent={(content) => navigate(`/admin/content/edit/${content.id}`)} />
    </Box>
  );
};

export default ContentListPage;
