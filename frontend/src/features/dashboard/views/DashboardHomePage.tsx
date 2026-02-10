import * as BookManager from "@/features/books/shared/services/BookManager";
import { MenuBook } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { StatsCard } from './StatsCard';

export function DashboardHomePage() {
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
            title="Total de Livros"
            value={booksData?.totalElements}
            icon={<MenuBook fontSize="large" />}
            isLoading={isLoadingBooks}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
