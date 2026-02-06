import { CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledBookCard, StyledAuthorText } from "../styles/BookCard.styled";

interface IBookCardProps {
  id: number;
  title: string;
  author: string;
  description?: string;
}

export const BookCard = ({ id, title, author, description }: IBookCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${id}`);
  };

  const renderDescription = () => {
    if (!description) return null;

    return (
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    );
  };

  return (
    <StyledBookCard onClick={handleClick}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <StyledAuthorText color="text.secondary">
          {author}
        </StyledAuthorText>
        {renderDescription()}
      </CardContent>
    </StyledBookCard>
  );
};
