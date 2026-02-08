import { ThemeToggleButton } from "@/shared/components/ThemeToggleButton";
import {
  Assignment as AssignmentIcon,
  Dashboard as DashboardIcon,
  MenuBook as MenuBookIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  StyledDashboardContainer,
  StyledMainContent,
} from "./styles/DashboardLayout.styled";

const DRAWER_WIDTH = 240;

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
  { label: "Usuários", icon: <PeopleIcon />, path: "/admin/users" },
  { label: "Livros", icon: <MenuBookIcon />, path: "/admin/books" },
  { label: "Empréstimos", icon: <AssignmentIcon />, path: "/admin/loans" },
  { label: "Conteúdos", icon: <AssignmentIcon />, path: "/admin/content" },
];

export function DashboardLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderDrawerContent = () => (
    <Box>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          Admin Panel
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => handleMenuClick(item.path)}
            sx={{
              mx: 1,
              borderRadius: 1,
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <StyledDashboardContainer>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Sistema de Biblioteca
          </Typography>
          <ThemeToggleButton />
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isMobile ? mobileOpen : desktopOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: desktopOpen ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {renderDrawerContent()}
      </Drawer>

      <StyledMainContent>
        <Outlet />
      </StyledMainContent>
    </StyledDashboardContainer>
  );
}
