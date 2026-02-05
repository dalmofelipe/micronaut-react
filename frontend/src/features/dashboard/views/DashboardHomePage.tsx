import { Grid, Typography, Box } from '@mui/material';
import { People, MenuBook, Assignment } from '@mui/icons-material';
import { StatsCard } from "./StatsCard";
import { useGetUsersCount } from "@/features/users/hooks/useUsers";
import { useGetLoansCount } from "@/features/loans/hooks/useLoans";
import { useQuery } from '@tanstack/react-query';
import * as BookManager from "@/features/books/services/BookManager";

export function DashboardHomePage() {
  const { data: usersCount, isLoading: isLoadingUsers } = useGetUsersCount();
  const { data: loansCount, isLoading: isLoadingLoans } = useGetLoansCount('ATIVO');
  const { data: booksData, isLoading: isLoadingBooks } = useQuery({
    queryKey: ['books-count'],
    queryFn: () => BookManager.getAllBooks(0, 1, ''),
  });

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
            value={booksData?.totalElements}
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
