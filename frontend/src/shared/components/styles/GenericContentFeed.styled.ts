import { Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FeedContainer = styled(Box)({
  width: '100%',
});

export const SkeletonCard = styled(Skeleton)(({ theme }) => ({
  height: 200,
  borderRadius: theme.shape.borderRadius,
}));

export const EmptyMessage = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
}));

export const ErrorMessage = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  color: theme.palette.error.main,
}));
