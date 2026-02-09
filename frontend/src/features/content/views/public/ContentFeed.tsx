import { Box, Card, CardContent, Chip, Skeleton, Typography } from '@mui/material';
import React from 'react';

import { useContents } from '@/features/content/hooks/useContent';
import type { IContent } from '@/features/content/types/Content';

const ContentCard: React.FC<{ content: IContent }> = ({ content }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {content.titulo}
      </Typography>
      <Box sx={{ mb: 1 }}>
        <Chip label={content.status} color={content.status === 'publicado' ? 'success' : 'default'} size="small" />
        {content.categoria && <Chip label={content.categoria} variant="outlined" size="small" sx={{ ml: 1 }} />}
      </Box>
      <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: content.conteudo.substring(0, 200) + '...' }} />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {new Date(content.createdAt).toLocaleDateString()}
      </Typography>
    </CardContent>
  </Card>
);

const ContentFeed: React.FC = () => {
  const { data: contents, isLoading, error } = useContents();

  if (isLoading) {
    return (
      <Box>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={200} sx={{ mb: 2 }} />
        ))}
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Erro ao carregar conteúdos</Typography>;
  }

  return (
    <Box>
      {contents?.map((content) => (
        <ContentCard key={content.id} content={content} />
      )) || <Typography>Nenhum conteúdo encontrado</Typography>}
    </Box>
  );
};

export default ContentFeed;