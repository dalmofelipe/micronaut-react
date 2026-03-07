import { useGetBooksCount } from "@/features/books/hooks/useBooks";
import { useGetLoansCount } from "@/features/loans/hooks/useLoans";
import { useGetUsersCount } from "@/features/users/hooks/useUsers";
import { Assignment, MenuBook, People } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { StatsCard } from "./StatsCard";

export function DashboardHomePage() {
  const { data: usersCount, isLoading: isLoadingUsers } = useGetUsersCount();
  const { data: loansCount, isLoading: isLoadingLoans } =
    useGetLoansCount("ATIVO");
  const { data: booksCount, isLoading: isLoadingBooks } = useGetBooksCount();

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Bem-vindo ao painel administrativo do sistema de biblioteca
      </Typography>

      <Grid container spacing={3} mt={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatsCard
            title="Total de Usuários"
            value={usersCount}
            icon={<People fontSize="large" />}
            isLoading={isLoadingUsers}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatsCard
            title="Total de Livros"
            value={booksCount}
            icon={<MenuBook fontSize="large" />}
            isLoading={isLoadingBooks}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatsCard
            title="Empréstimos Ativos"
            value={loansCount}
            icon={<Assignment fontSize="large" />}
            isLoading={isLoadingLoans}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
