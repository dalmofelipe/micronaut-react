import { DashboardLayout } from "@/app/layouts/dashboard/DashboardLayout";
import { DefaultLayout } from "@/app/layouts/default/DefaultLayout";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { BlogFeed, BlogPostPage } from "@/features/blog";
import { AdminBooksPage, BookDetailsPage } from "@/features/books";
import { ContentFormPage, ContentListPage } from "@/features/content";
import { DashboardHomePage } from "@/features/dashboard/DashboardHomePage";
import { HomePage } from "@/features/home/HomePage";
import { AdminLoansPage } from "@/features/loans";
import { AdminUsersPage } from "@/features/users";
import { NotificationSnackbar } from "@/shared/components/NotificationSnackbar";
import { useThemeStore } from "@/shared/store/useThemeStore";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { darkTheme, lightTheme } from "./theme";

export const Router = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/books/:id" element={<BookDetailsPage />} />
              <Route path="/blog" element={<BlogFeed />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
            </Route>

            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<DashboardHomePage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="books" element={<AdminBooksPage />} />
              <Route path="loans" element={<AdminLoansPage />} />
              <Route path="content" element={<ContentListPage />} />
              <Route path="content/new" element={<ContentFormPage />} />
              <Route path="content/edit/:id" element={<ContentFormPage />} />
            </Route>
          </Routes>
          <NotificationSnackbar />
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default Router;
