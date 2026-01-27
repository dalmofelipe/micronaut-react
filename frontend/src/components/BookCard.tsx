import { CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledBookCard } from "./styles/BookCard.styled";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  description?: string;
}

export const BookCard = ({ id, title, author, description }: BookCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${id}`);
  };

  return (
    <StyledBookCard onClick={handleClick}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {author}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
    </StyledBookCard>
  );
};
