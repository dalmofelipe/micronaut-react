import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import React from "react";
import type { IContent } from "@/features/content/types/Content";

interface IContentCardProps {
  content: IContent;
}

export const ContentCard: React.FC<IContentCardProps> = ({ content }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {content.titulo}
      </Typography>
      <Box sx={{ mb: 1 }}>
        <Chip
          label={content.status}
          color={content.status === "publicado" ? "success" : "default"}
          size="small"
        />
        {content.categoria && (
          <Chip
            label={content.categoria}
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
          />
        )}
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        dangerouslySetInnerHTML={{
          __html: content.conteudo.substring(0, 200) + "...",
        }}
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 1, display: "block" }}
      >
        {new Date(content.createdAt).toLocaleDateString()}
      </Typography>
    </CardContent>
  </Card>
);
