import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import java from 'highlight.js/lib/languages/java';
import js from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import ts from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/github.css';
import { lowlight } from 'lowlight';
import React, { useState } from 'react';
import { useCreateContent } from '../shared/hooks';
import type { ICreateContentRequest } from '../shared/types';
import MediaPicker from './MediaPicker';

// Register highlighting languages once at module load to avoid re-registration on every render
lowlight.registerLanguage('javascript', js);
lowlight.registerLanguage('typescript', ts);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('java', java);
lowlight.registerLanguage('python', python);
lowlight.registerLanguage('csharp', csharp);
lowlight.registerLanguage('cpp', cpp);

const ContentEditor: React.FC = () => {
  const [form, setForm] = useState<ICreateContentRequest>({
    titulo: '',
    conteudo: '',
    conteudoJson: undefined,
    categoria: '',
    status: 'rascunho',
    autorId: 1, // Mock: substituir por user logado
    mediaUrls: [],
  });

  const createMutation = useCreateContent();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false }),
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({ placeholder: 'Comece a escrever seu tutorial — suporte a código e mídia' }),
    ],
    content: form.conteudo || '<p></p>',
    editorProps: { attributes: { 'aria-label': 'Editor de conteúdo' } },
    onUpdate: ({ editor }) => {
      setForm((s) => ({ ...s, conteudo: editor.getHTML(), conteudoJson: JSON.stringify(editor.getJSON()) }));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Read latest content directly from the editor to avoid a race where
    // editor.onUpdate hasn't flushed to React state before submit.
    const latestHtml = editor?.getHTML() ?? form.conteudo;
    const latestJson = editor ? JSON.stringify(editor.getJSON()) : form.conteudoJson;

    if (!form.titulo || !form.titulo.trim()) {
      alert('Título é obrigatório');
      return;
    }

    if (!latestHtml || latestHtml === '<p></p>' || (editor && !editor.getText()?.trim())) {
      alert('Conteúdo não pode ficar vazio');
      return;
    }

    const payload: ICreateContentRequest = {
      ...form,
      conteudo: latestHtml,
      conteudoJson: latestJson,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        alert('Conteúdo criado com sucesso!');
        setForm({ titulo: '', conteudo: '', conteudoJson: undefined, categoria: '', status: 'rascunho', autorId: 1, mediaUrls: [] });
        editor?.commands.clearContent();
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Criar Conteúdo
      </Typography>
      <TextField
        id="content-title"
        fullWidth
        label="Título"
        value={form.titulo}
        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        required
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="content-category-label">Categoria</InputLabel>
        <Select
          id="content-category"
          name="categoria"
          labelId="content-category-label"
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        >
          <MenuItem value="tutorial">Tutorial</MenuItem>
          <MenuItem value="guia">Guia</MenuItem>
          <MenuItem value="livro">Livro</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="content-status-label">Status</InputLabel>
        <Select
          id="content-status"
          name="status"
          labelId="content-status-label"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <MenuItem value="rascunho">Rascunho</MenuItem>
          <MenuItem value="publicado">Publicado</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h6" gutterBottom>
        Conteúdo (Rich Text)
      </Typography>

      {/* TipTap editor (WYSIWYG-first). editor.getHTML() é salvo em `form.conteudo` */}

      {/* Editor instance (improved layout + placeholder + minHeight) */}
      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 1, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button size="small" variant="text" onClick={() => editor?.chain().focus().toggleBold().run()} disabled={!editor}>B</Button>
            <Button size="small" variant="text" onClick={() => editor?.chain().focus().toggleItalic().run()} disabled={!editor}>I</Button>
            <Button size="small" variant="text" onClick={() => editor?.chain().focus().toggleBulletList().run()} disabled={!editor}>• List</Button>
            <Button size="small" variant="text" onClick={() => editor?.chain().focus().toggleOrderedList().run()} disabled={!editor}>1. List</Button>
            <Button size="small" variant="text" onClick={() => {
              const url = window.prompt('URL');
              if (url) editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            }} disabled={!editor}>Link</Button>
            <Button size="small" variant="text" onClick={() => editor?.chain().focus().setCodeBlock().run()} disabled={!editor}>Code</Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <MediaPicker onUpload={(url) => editor?.chain().focus().setImage({ src: url }).run()} />
            <Typography variant="caption" color="text.secondary">Arraste ou clique para inserir imagem/áudio/video</Typography>
          </Box>
        </Box>

        <Box sx={{ '& .ProseMirror': { minHeight: 260, padding: 2, outline: 'none', whiteSpace: 'pre-wrap' } }}>
          <EditorContent editor={editor} />
        </Box>
      </Box>

      {/* end editor */} 
      <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Criando...' : 'Criar Conteúdo'}
      </Button>
    </Box>
  );
};

export default ContentEditor;