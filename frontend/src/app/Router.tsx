import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotificationSnackbar } from '@/shared/components/NotificationSnackbar';
import { DashboardLayout } from '@/app/layouts/dashboard/DashboardLayout';
import { DefaultLayout } from '@/app/layouts/default/DefaultLayout';
import { AdminBooksPage } from "@/features/books/views/AdminBooksPage";
import { AdminLoansPage } from "@/features/loans/views/AdminLoansPage";
import { AdminUsersPage } from "@/features/users/views/AdminUsersPage";
import { BookDetailsPage } from "@/features/books/views/BookDetailsPage";
import { BookPage } from "@/features/books/views/BookPage";
import { DashboardHomePage } from "@/features/dashboard/views/DashboardHomePage";
import { HomePage } from "@/features/home/views/HomePage";
import { useThemeStore } from "@/shared/store/useThemeStore";
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
              <Route path="/books" element={<BookPage />} />  
              <Route path="/books/:id" element={<BookDetailsPage />} />
            </Route>
            
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<DashboardHomePage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="books" element={<AdminBooksPage />} />
              <Route path="loans" element={<AdminLoansPage />} />
            </Route>
          </Routes>
          <NotificationSnackbar />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Router;