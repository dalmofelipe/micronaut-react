import { Box, Button, styled } from '@mui/material';

export const PickerContainer = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
});

export const PickerButton = styled(Button)({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
});

export const HintContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

export const PreviewThumb = styled('img')({
  width: 96,
  height: 64,
  objectFit: 'cover',
  borderRadius: 4,
  border: '1px solid rgba(0,0,0,0.08)',
});

export const HiddenFileInput = styled('input')({
  display: 'none',
});
