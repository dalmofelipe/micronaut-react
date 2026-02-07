import React, { useState } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import csharp from 'highlight.js/lib/languages/csharp';
import cpp from 'highlight.js/lib/languages/cpp';
import 'highlight.js/styles/github.css';
import MediaPicker from './MediaPicker';
import { useCreateContent } from '../shared/hooks';
import type { ICreateContentRequest } from '../shared/types';

const ContentEditor: React.FC = () => {
  const [form, setForm] = useState<ICreateContentRequest>({
    titulo: '',
    conteudo: '',
    categoria: '',
    status: 'rascunho',
    autorId: 1, // Mock: substituir por user logado
    mediaUrls: [],
  });

  const createMutation = useCreateContent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(form, {
      onSuccess: () => {
        alert('Conteúdo criado com sucesso!');
        setForm({ titulo: '', conteudo: '', categoria: '', status: 'rascunho', autorId: 1, mediaUrls: [] });
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Criar Conteúdo
      </Typography>
      <TextField
        fullWidth
        label="Título"
        value={form.titulo}
        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        required
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Categoria</InputLabel>
        <Select
          value={form.categoria}
          onChange={(e) => setForm({ ...form, categoria: e.target.value })}
        >
          <MenuItem value="tutorial">Tutorial</MenuItem>
          <MenuItem value="guia">Guia</MenuItem>
          <MenuItem value="livro">Livro</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
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
      {/* register languages for lowlight */}
      {/* languages registered below to enable syntax highlighting */}
      {/* Editor toolbar (minimal) + MediaPicker for uploads */}
      {/* initialize lowlight languages */}
      {(() => {
        lowlight.registerLanguage('javascript', js);
        lowlight.registerLanguage('typescript', ts);
        lowlight.registerLanguage('css', css);
        lowlight.registerLanguage('java', java);
        lowlight.registerLanguage('python', python);
        lowlight.registerLanguage('csharp', csharp);
        lowlight.registerLanguage('cpp', cpp);
        return null;
      })()}

      {/* Editor instance */}
      {(() => {
        const editor = useEditor({
          extensions: [
            StarterKit.configure({
              codeBlock: false,
            }),
            Link.configure({ openOnClick: false }),
            Image.configure({ inline: false }),
            CodeBlockLowlight.configure({ lowlight }),
          ],
          content: form.conteudo || '<p></p>',
          onUpdate: ({ editor }) => {
            setForm((s) => ({ ...s, conteudo: editor.getHTML(), conteudoJson: editor.getJSON() }));
          },
        });

        return (
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Button size="small" onClick={() => editor?.chain().focus().toggleBold().run()} disabled={!editor}>B</Button>
              <Button size="small" onClick={() => editor?.chain().focus().toggleItalic().run()} disabled={!editor}>I</Button>
              <Button size="small" onClick={() => editor?.chain().focus().toggleBulletList().run()} disabled={!editor}>• List</Button>
              <Button size="small" onClick={() => editor?.chain().focus().toggleOrderedList().run()} disabled={!editor}>1. List</Button>
              <Button size="small" onClick={() => {
                const url = window.prompt('URL');
                if (url) editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
              }} disabled={!editor}>Link</Button>
              <Button size="small" onClick={() => editor?.chain().focus().setCodeBlock().run()} disabled={!editor}>Code</Button>
              <MediaPicker onUpload={(url) => editor?.chain().focus().setImage({ src: url }).run()} />
            </Box>

            <EditorContent editor={editor} />
          </Box>
        );
      })()}

      {/* end editor */} 
      <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Criando...' : 'Criar Conteúdo'}
      </Button>
    </Box>
  );
};

export default ContentEditor;