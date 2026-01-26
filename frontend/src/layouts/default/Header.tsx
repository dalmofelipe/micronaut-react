import { Typography } from "@mui/material"
import { Logo } from "./Logo"
import { HeaderContainer, HeaderWrapper } from "./styles/Header.styled"
import { useThemeStore } from "../../store/useThemeStore"

export const Header = () => {
  const { headerHeight } =  useThemeStore()

  return (
    <HeaderWrapper  headerheight={headerHeight} >
      <HeaderContainer headerheight={headerHeight}>
        <Logo />
        <Typography>Skeleton Micronaut React</Typography>
      </HeaderContainer>
    </HeaderWrapper>
  )
}