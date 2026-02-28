import { Box, Button, Container, styled } from "@mui/material";

export const HeaderWrapper = styled(Box)<{
    headerheight: number
}>(({
    theme,
    headerheight
}) => ({
    width: '100%',
    height: headerheight,
    position: 'fixed',
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[4],
    zIndex: theme.zIndex.appBar,
}));

export const HeaderContainer = styled(Container)<{
    headerheight: number
}>(({
    headerheight
}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: headerheight,
    padding: '8px',
}));

export const HeaderActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

export const HeaderNavLink = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: '0.9rem',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));
