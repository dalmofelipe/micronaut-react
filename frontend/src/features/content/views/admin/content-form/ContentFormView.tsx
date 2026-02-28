import { useContentForm } from '@/features/content/hooks/useContentForm';
import type { IContent } from '@/features/content/types/Content';
import { Box, Button } from '@mui/material';
import React from 'react';
import { ContentFormFields } from './ContentFormFields';
import { RichTextEditor } from './RichTextEditor';

interface ContentFormProps {
  selectedContent?: IContent | null;
  onSuccess?: () => void;
}

const ContentFormView: React.FC<ContentFormProps> = ({ 
  selectedContent,
  onSuccess 
}) => {
  const { 
    form,
    updateContent,
    submitForm,
    isEditing,
    isPending,
    resetForm 
  } = useContentForm(selectedContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const html = form.conteudo;
    const json = form.conteudoJson || '{}';
    submitForm(html, json, onSuccess);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <ContentFormFields form={form} onUpdate={updateContent} />

      <RichTextEditor
        content={form.conteudo}
        onUpdate={(html, json) => updateContent({ conteudo: html, conteudoJson: json })}
      />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={resetForm} disabled={isPending}>
          Limpar
        </Button>
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? 'Processando...' : isEditing ? 'Atualizar' : 'Criar'}
        </Button>
      </Box>
    </Box>
  );
};

export default ContentFormView;
