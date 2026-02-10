import { Button, Chip, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlogPost } from '../hooks/useBlogPosts';
import {
  ErrorContainer,
  LoadingContainer,
  PageContainer,
  PostContent,
  PostHeader,
  PostMeta,
  PostTitle,
} from './styles/BlogPostPage.styled';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, isError } = useBlogPost(Number(id));

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (isError || !post) {
    return (
      <ErrorContainer>
        <Typography variant="h5" color="error">
          Post não encontrado
        </Typography>
        <Button variant="contained" onClick={() => navigate('/blog')}>
          Voltar para o Blog
        </Button>
      </ErrorContainer>
    );
  }

  return (
    <PageContainer maxWidth="md">
      <PostHeader>
        <PostTitle variant="h3">{post.titulo}</PostTitle>

        <PostMeta>
          {post.categoria && (
            <Chip label={post.categoria} color="primary" size="medium" />
          )}
          <Typography variant="body2" color="text.secondary">
            {new Date(post.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </Typography>
        </PostMeta>
      </PostHeader>

      <PostContent>
        <div dangerouslySetInnerHTML={{ __html: post.conteudo }} />
      </PostContent>

      <Button
        variant="outlined"
        onClick={() => navigate('/blog')}
        sx={{ mt: 4 }}
      >
        Voltar para o Blog
      </Button>
    </PageContainer>
  );
};
