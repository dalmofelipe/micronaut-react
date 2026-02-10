import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

export const StyledCardActionArea = styled(CardActionArea)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  width: '100%',
});

export const PostTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

export const ChipContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(0.5),
}));

export const PostPreview = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
}));

export const PostDate = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'block',
}));
