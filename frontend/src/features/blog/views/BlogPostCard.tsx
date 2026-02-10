import { Chip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { IContent } from "@/features/content/types/Content";
import {
  ChipContainer,
  PostDate,
  PostPreview,
  PostTitle,
  StyledCard,
  StyledCardActionArea,
  StyledCardContent,
} from "./styles/BlogPostCard.styled";

interface BlogPostCardProps {
  post: IContent;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  // Remove HTML tags for preview
  const getPlainTextPreview = (
    html: string,
    maxLength: number = 150,
  ): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <StyledCard>
      <StyledCardActionArea onClick={handleClick}>
        <StyledCardContent>
          <PostTitle variant="h6">{post.titulo}</PostTitle>

          <ChipContainer>
            {post.categoria && (
              <Chip label={post.categoria} color="primary" size="small" />
            )}
          </ChipContainer>

          <PostPreview variant="body2" color="text.secondary">
            {getPlainTextPreview(post.conteudo)}
          </PostPreview>

          <PostDate variant="caption" color="text.secondary">
            {new Date(post.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </PostDate>
        </StyledCardContent>
      </StyledCardActionArea>
    </StyledCard>
  );
};
