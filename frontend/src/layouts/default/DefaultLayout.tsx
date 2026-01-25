import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { DefaultLayoutWrapper } from "./styles/DefaultLayout.styled"
import { Container } from "@mui/material"

export const DefaultLayout = () => {
  return (
    <DefaultLayoutWrapper>
      <Header />

      <Container maxWidth="lg" sx={{ padding: '60px 0' }}>
        <Outlet />
      </Container>
    </DefaultLayoutWrapper>
  )
}
