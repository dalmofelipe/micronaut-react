import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { DefaultLayoutWrapper, StyledMainContainer } from "./styles/DefaultLayout.styled"
import { useThemeStore } from "../../store/useThemeStore"

export const DefaultLayout = () => {
  const { headerHeight } =  useThemeStore()

  return (
    <DefaultLayoutWrapper>
      <Header />

      <StyledMainContainer maxWidth="lg" headerheight={headerHeight}>
        <Outlet />
      </StyledMainContainer>
    </DefaultLayoutWrapper>
  )
}
