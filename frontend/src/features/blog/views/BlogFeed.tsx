import React from "react";
import { GenericContentFeed } from "@/shared/components/GenericContentFeed";
import { useBlogPosts } from "../hooks/useBlogPosts";
import { BlogPostCard } from "./BlogPostCard";

export const BlogFeed: React.FC = () => {
  const { data, isLoading, error } = useBlogPosts();

  return (
    <GenericContentFeed
      data={data}
      isLoading={isLoading}
      error={error || null}
      renderCard={(post) => <BlogPostCard post={post} />}
      emptyMessage="Nenhum post encontrado"
    />
  );
};
