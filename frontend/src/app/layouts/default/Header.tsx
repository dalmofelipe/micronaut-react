import { ThemeToggleButton } from "@/shared/components/ThemeToggleButton";
import { useThemeStore } from "@/shared/store/useThemeStore";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { HeaderActions, HeaderContainer, HeaderNavLink, HeaderWrapper } from "./styles/Header.styled";

export const Header = () => {
  const { headerHeight } =  useThemeStore()

  return (
    <HeaderWrapper  headerheight={headerHeight} >
      <HeaderContainer headerheight={headerHeight}>
        <Logo />
        
        <HeaderActions>
          <Link to="/blog">
            <HeaderNavLink>Blog</HeaderNavLink>
          </Link>

          <ThemeToggleButton />
        </HeaderActions>
      </HeaderContainer>
    </HeaderWrapper>
  )
}