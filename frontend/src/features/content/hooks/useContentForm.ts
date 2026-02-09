import { useCreateContent, useUpdateContent } from '@/features/content/hooks/useContent';
import type { IContent, ICreateContentRequest } from '@/features/content/types/Content';
import { useEffect, useState } from 'react';

export const useContentForm = (selectedContent?: IContent | null) => {
  const [form, setForm] = useState<ICreateContentRequest>({
    titulo: '',
    conteudo: '',
    conteudoJson: undefined,
    categoria: '',
    status: 'rascunho',
    autorId: 1,
    mediaUrls: [],
  });

  const createMutation = useCreateContent();
  const updateMutation = useUpdateContent();
  const isEditing = !!selectedContent;
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (selectedContent) {
      setForm({
        titulo: selectedContent.titulo,
        conteudo: selectedContent.conteudo,
        conteudoJson: selectedContent.conteudo,
        categoria: selectedContent.categoria || '',
        status: selectedContent.status,
        autorId: selectedContent.autorId,
        mediaUrls: selectedContent.mediaUrls || [],
      });
    } else {
      resetForm();
    }
  }, [selectedContent]);

  const resetForm = () => {
    setForm({
      titulo: '',
      conteudo: '',
      conteudoJson: undefined,
      categoria: '',
      status: 'rascunho',
      autorId: 1,
      mediaUrls: [],
    });
  };

  const updateContent = (updates: Partial<ICreateContentRequest>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const submitForm = async (
    latestHtml: string,
    latestJson: string,
    onSuccess?: () => void
  ) => {
    if (!form.titulo?.trim()) {
      alert('Título é obrigatório');
      return;
    }

    if (!latestHtml || latestHtml === '<p></p>') {
      alert('Conteúdo não pode ficar vazio');
      return;
    }

    const payload: ICreateContentRequest = {
      ...form,
      conteudo: latestHtml,
      conteudoJson: latestJson,
    };

    if (isEditing && selectedContent) {
      updateMutation.mutate(
        { id: selectedContent.id, data: payload },
        {
          onSuccess: () => {
            alert('Conteúdo atualizado com sucesso!');
            resetForm();
            onSuccess?.();
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          alert('Conteúdo criado com sucesso!');
          resetForm();
          onSuccess?.();
        },
      });
    }
  };

  return {
    form,
    setForm,
    resetForm,
    updateContent,
    submitForm,
    isEditing,
    isPending,
  };
};
