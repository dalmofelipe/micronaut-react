import { Typography } from "@mui/material"
import { ThemeToggleButton } from "@/shared/components/ThemeToggleButton";
import { useThemeStore } from "@/shared/store/useThemeStore";
import { Logo } from "./Logo"
import { HeaderActions, HeaderContainer, HeaderWrapper } from "./styles/Header.styled"

export const Header = () => {
  const { headerHeight } =  useThemeStore()

  return (
    <HeaderWrapper  headerheight={headerHeight} >
      <HeaderContainer headerheight={headerHeight}>
        <Logo />
        
        <HeaderActions>
          <ThemeToggleButton />

          <Typography fontWeight={"bold"} >
            Micronaut React Template
          </Typography>
        </HeaderActions>
      </HeaderContainer>
    </HeaderWrapper>
  )
}