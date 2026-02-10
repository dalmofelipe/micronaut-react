import { IconButton } from "@mui/material";
import { useThemeStore } from '../store/useThemeStore';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const ThemeToggleButton = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const mode = useThemeStore((state) => state.mode);

  return <IconButton color="inherit" onClick={toggleTheme}>
    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
  </IconButton>;
}