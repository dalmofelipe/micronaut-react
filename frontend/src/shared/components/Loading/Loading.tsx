import { CircularProgress } from "@mui/material";
import { LoadingContainer } from "./styles/Loading.styled";

export const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
}
