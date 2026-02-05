import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import type { ReactNode } from "react";

interface IStatsCardProps {
  title: string;
  value: number | undefined;
  icon: ReactNode;
  isLoading?: boolean;
}

export const StatsCard: React.FC<IStatsCardProps> = ({ 
  title,
  value,
  icon,
  isLoading 
}) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="40%" height={48} />
        </>
      );
    }

    return (
      <>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" component="div" fontWeight={700}>
          {value ?? 0}
        </Typography>
      </>
    );
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
            {icon}
          </Avatar>
          <Box flex={1}>{renderContent()}</Box>
        </Box>
      </CardContent>
    </Card>
  );
}
