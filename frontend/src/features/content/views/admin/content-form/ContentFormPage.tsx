import { useContent } from '@/features/content/hooks/useContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentFormView from './ContentFormView';
import { PanelPaper } from './styles/ContentForm.styled';

const ContentFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const contentId = id ? Number(id) : undefined;

  const { data: selectedContent, isLoading } = useContent(contentId!);

  const handleSuccess = () => {
    navigate('/admin/content');
  };

  const isEditing = !!contentId;

  if (isLoading && isEditing) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/admin/content')} sx={{ mb: 2 }}>
        Voltar para lista
      </Button>

      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        {isEditing ? 'Editar Conteúdo' : 'Criar Novo Conteúdo'}
      </Typography>

      <PanelPaper>
        <ContentFormView selectedContent={isEditing ? selectedContent : null} onSuccess={handleSuccess} />
      </PanelPaper>
    </Box>
  );
};

export default ContentFormPage;
