import type { IContent } from '@/features/content/types/Content';
import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ContentListDataGrid from '../content-list/ContentListDataGrid';
import ContentFormView from './ContentFormView';
import { PanelPaper } from './styles/ContentForm.styled';

const ContentEditor: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<IContent | null>(null);

  const handleSelectContent = (content: IContent) => {
    setSelectedContent(content);
  };

  const handleFormSuccess = () => {
    setSelectedContent(null);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Left Column: Content List */}
        <Grid size={{ xs: 12, md: 6 }}>
          <PanelPaper>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
              Conteúdos
            </Typography>

            <ContentListDataGrid onSelectContent={handleSelectContent} selectedContentId={selectedContent?.id} />
          </PanelPaper>
        </Grid>

        {/* Right Column: Content Form */}
        <Grid size={{ xs: 12, md: 6 }}>
          <PanelPaper>
            <ContentFormView selectedContent={selectedContent} onSuccess={handleFormSuccess} />
          </PanelPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContentEditor;