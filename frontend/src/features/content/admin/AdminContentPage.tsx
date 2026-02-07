import React from 'react';
import { Box, Typography } from '@mui/material';
import ContentEditor from '../admin/ContentEditor';

const AdminContentPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gerenciar Conteúdos
      </Typography>
      <ContentEditor />
    </Box>
  );
};

export default AdminContentPage;