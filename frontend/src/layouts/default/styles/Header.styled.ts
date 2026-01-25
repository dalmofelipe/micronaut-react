import { Container, Paper, styled } from "@mui/material";

export const HeaderWrapper = styled(Paper)(({ theme }) => ({
    width: '100%',
    minHeight: '55px',
    position: 'fixed',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    zIndex: theme.zIndex.appBar,
}));

export const HeaderContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '55px',
    padding: '8px',
});
