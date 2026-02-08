import { Typography } from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
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
import React, { useEffect } from 'react';
import MediaPicker from './MediaPicker';
import { EditorContainer, EditorContent as EditorContentStyled, EditorToolbar } from './styles/ContentForm.styled';
import { EditorFormattingToolbar } from './EditorToolbar';

// Register languages once
lowlight.registerLanguage('javascript', js);
lowlight.registerLanguage('typescript', ts);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('java', java);
lowlight.registerLanguage('python', python);
lowlight.registerLanguage('csharp', csharp);
lowlight.registerLanguage('cpp', cpp);

interface RichTextEditorProps {
  content: string;
  onUpdate: (html: string, json: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link.configure({ openOnClick: false }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          style: 'max-width: 100%; height: auto; display: block; margin: 1rem 0;',
        },
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({ placeholder: 'Comece a escrever seu tutorial — suporte a código e mídia' }),
    ],
    content: content || '<p></p>',
    editorProps: { attributes: { 'aria-label': 'Editor de conteúdo' } },
    onUpdate: ({ editor: ed }) => {
      onUpdate(ed.getHTML(), JSON.stringify(ed.getJSON()));
    },
  });

  // Atualizar conteúdo APENAS quando o content prop muda externamente (ex: ao selecionar item para editar)
  // Não durante digitação normal
  useEffect(() => {
    if (editor && content && !editor.isFocused) {
      const currentContent = editor.getHTML();
      if (currentContent !== content) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  return (
    <>
      <Typography variant="subtitle2" gutterBottom sx={{ mb: 1, fontWeight: 600, mt: 3 }}>
        Conteúdo (Rich Text Editor)
      </Typography>

      <EditorContainer>
        <EditorToolbar>
          <EditorFormattingToolbar editor={editor} />
          <MediaPicker onUpload={(url) => editor?.chain().focus().setImage({ src: url }).run()} />
        </EditorToolbar>

        <EditorContentStyled>
          <EditorContent editor={editor} />
        </EditorContentStyled>
      </EditorContainer>
    </>
  );
};
