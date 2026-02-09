import { Box, Paper, styled } from '@mui/material';

export const PanelPaper = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2.5),
  boxShadow: 'none',
}));

export const EditorContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  marginBottom: theme.spacing(2),
}));

export const EditorToolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexWrap: 'wrap',
  backgroundColor: theme.palette.background.paper,
}));

export const EditorContent = styled(Box)(({ theme }) => ({
  '& .ProseMirror': {
    minHeight: 350,
    padding: theme.spacing(2),
    outline: 'none',
    whiteSpace: 'pre-wrap',
  },
}));

export const ToolbarGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  alignItems: 'center',
}));
