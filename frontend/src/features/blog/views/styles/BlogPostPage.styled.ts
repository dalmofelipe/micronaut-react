import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const PostHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const PostTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
}));

export const PostMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

export const PostContent = styled(Box)(({ theme }) => ({
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.7,
  },
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  '& ul, & ol': {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
    marginLeft: 0,
    marginBottom: theme.spacing(2),
    fontStyle: 'italic',
  },
}));

export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh',
});

export const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));
