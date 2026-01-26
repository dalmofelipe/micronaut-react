import { Skeleton, Card, CardContent } from '@mui/material';
import { StyledSkeletonGrid, StyledSkeletonChips } from './styles/BookListSkeleton.styled';

interface IBookListSkeletonProps {
  count?: number;
}

export function BookListSkeleton({ count = 8 }: IBookListSkeletonProps) {
  return (
    <StyledSkeletonGrid>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index}>
          <Skeleton variant="rectangular" height={240} />
          <CardContent>
            <Skeleton variant="text" width="80%" height={32} />
            <Skeleton variant="text" width="60%" height={24} />
            <StyledSkeletonChips>
              <Skeleton variant="rounded" width={80} height={24} />
              <Skeleton variant="rounded" width={60} height={24} />
            </StyledSkeletonChips>
          </CardContent>
        </Card>
      ))}
    </StyledSkeletonGrid>
  );
}
