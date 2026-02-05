import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotificationSnackbar } from './components/NotificationSnackbar';
import { DashboardLayout } from './layouts/dashboard/DashboardLayout';
import { DefaultLayout } from './layouts/default/DefaultLayout';
import { AdminBooksPage } from "./pages/AdminBooksPage/AdminBooksPage";
import { AdminLoansPage } from "./pages/AdminLoansPage/AdminLoansPage";
import { AdminUsersPage } from "./pages/AdminUsersPage/AdminUsersPage";
import { BookDetailsPage } from "./pages/BookDetailsPage/BookDetailsPage";
import { BookPage } from "./pages/BookPage/BookPage";
import { DashboardHomePage } from "./pages/DashboardHomePage/DashboardHomePage";
import { HomePage } from "./pages/HomePage/HomePage";
import { TestPage } from "./pages/TestPage/TestPage";
import { useThemeStore } from "./store/useThemeStore";
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
              <Route path="/test" element={<TestPage />} />
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