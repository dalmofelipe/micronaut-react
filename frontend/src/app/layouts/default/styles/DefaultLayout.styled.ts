import { Box, Container, styled } from "@mui/material";

export const DefaultLayoutWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  minHeight: '100vh',
});

export const StyledMainContainer = styled(Container)<{ headerheight: number }>(({ headerheight }) => ({
  padding: `${headerheight}px 0`,
}));