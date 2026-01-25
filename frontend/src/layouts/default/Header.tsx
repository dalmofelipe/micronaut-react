import { Typography } from "@mui/material"
import { Logo } from "./Logo"
import { HeaderContainer, HeaderWrapper } from "./styles/Header.styled"

export const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo />
        <Typography>Skeleton Micronaut React</Typography>
      </HeaderContainer>
    </HeaderWrapper>
  )
}