import { Container, Paper, styled } from "@mui/material";

export const HeaderWrapper = styled(Paper)<{
    headerheight: number
}>(({
    theme,
    headerheight
}) => ({
    width: '100%',
    height: headerheight,
    position: 'fixed',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
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
