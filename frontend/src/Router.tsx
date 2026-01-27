import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from './layouts/default/DefaultLayout';
import { BookPage } from "./pages/BookPage/BookPage";
import { BookDetailsPage } from "./pages/BookDetailsPage/BookDetailsPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { useThemeStore } from "./store/useThemeStore";
import { darkTheme, lightTheme } from "./theme";
import { TestPage } from "./pages/TestPage/TestPage";

export const queryClient = new QueryClient();

export const Router = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = mode === "light" ? lightTheme : darkTheme;
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BookPage />} />  
              <Route path="/books/:id" element={<BookDetailsPage />} />
              <Route path="/test" element={<TestPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Router;