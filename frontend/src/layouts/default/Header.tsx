import { Typography } from "@mui/material"
import { Logo } from "./Logo"
import { HeaderActions, HeaderContainer, HeaderWrapper } from "./styles/Header.styled"
import { useThemeStore } from "../../store/useThemeStore"
import { ThemeToggleButton } from "../../components/ThemeToggleButton"

export const Header = () => {
  const { headerHeight } =  useThemeStore()

  return (
    <HeaderWrapper  headerheight={headerHeight} >
      <HeaderContainer headerheight={headerHeight}>
        <Logo />
        <HeaderActions>
          <ThemeToggleButton />
          <Typography>Micronaut React Template</Typography>
        </HeaderActions>
      </HeaderContainer>
    </HeaderWrapper>
  )
}