import { Grid, Typography } from "@mui/material";
import React from "react";
import {
  EmptyMessage,
  ErrorMessage,
  FeedContainer,
  SkeletonCard,
} from "./styles/GenericContentFeed.styled";

interface IGenericContentFeedProps<T extends { id: number }> {
  data: T[] | undefined;
  isLoading: boolean;
  error: Error | null;
  renderCard: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export const GenericContentFeed = <T extends { id: number }>({
  data,
  isLoading,
  error,
  renderCard,
  emptyMessage = "Nenhum conteúdo encontrado",
}: IGenericContentFeedProps<T>) => {
  if (isLoading) {
    return (
      <FeedContainer>
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <SkeletonCard variant="rectangular" />
            </Grid>
          ))}
        </Grid>
      </FeedContainer>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        <Typography>Erro ao carregar conteúdos: {error.message}</Typography>
      </ErrorMessage>
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyMessage>
        <Typography>{emptyMessage}</Typography>
      </EmptyMessage>
    );
  }

  return (
    <FeedContainer>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            {renderCard(item)}
          </Grid>
        ))}
      </Grid>
    </FeedContainer>
  );
};
