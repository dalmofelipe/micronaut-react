import React from 'react';
import { GenericContentFeed } from '@/shared/components/GenericContentFeed';
import { useContents } from '@/features/content/hooks/useContent';
import { ContentCard } from './ContentCard';

const ContentFeed: React.FC = () => {
  const { data: contents, isLoading, error } = useContents();

  return (
    <GenericContentFeed
      data={contents}
      isLoading={isLoading}
      error={error || null}
      renderCard={(content) => <ContentCard content={content} />}
      emptyMessage="Nenhum conteúdo encontrado"
    />
  );
};

export default ContentFeed;