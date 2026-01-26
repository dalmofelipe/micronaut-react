import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { DefaultLayoutWrapper } from "./styles/DefaultLayout.styled"
import { Container } from "@mui/material"
import { useThemeStore } from "../../store/useThemeStore"

export const DefaultLayout = () => {
  const { headerHeight } =  useThemeStore()

  return (
    <DefaultLayoutWrapper>
      <Header />

      <Container maxWidth="lg" sx={{ padding: `${headerHeight}px 0` }}>
        <Outlet />
      </Container>
    </DefaultLayoutWrapper>
  )
}
