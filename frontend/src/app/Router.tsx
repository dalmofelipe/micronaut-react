import { DashboardLayout } from '@/app/layouts/dashboard/DashboardLayout';
import { DefaultLayout } from '@/app/layouts/default/DefaultLayout';
import { AdminBooksPage } from '@/features/books/admin/views/AdminBooksPage';
import { BookDetailsPage } from '@/features/books/catalog/views/BookDetailsPage';
import { DashboardHomePage } from '@/features/dashboard/views/DashboardHomePage';
import { HomePage } from '@/features/home/views/HomePage';
import { NotificationSnackbar } from '@/shared/components/NotificationSnackbar';
import { useThemeStore } from "@/shared/store/useThemeStore";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { darkTheme, lightTheme } from "./theme";

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
              <Route path="/books/:id" element={<BookDetailsPage />} />
            </Route>

            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<DashboardHomePage />} />
              <Route path="books" element={<AdminBooksPage />} />
            </Route>
          </Routes>
          <NotificationSnackbar />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Router;