import { Button } from '@mui/material';
import type { Editor } from '@tiptap/react';
import React from 'react';
import { ToolbarGroup } from './styles/ContentForm.styled';

interface EditorToolbarButtonProps {
  editor: Editor | null;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const EditorToolbarButton: React.FC<EditorToolbarButtonProps> = ({
  editor,
  isActive,
  onClick,
  children,
  disabled = false,
}) => {
  return (
    <Button
      size="small"
      variant={isActive ? 'contained' : 'outlined'}
      onClick={onClick}
      disabled={!editor || disabled}
      sx={{ minWidth: 32, p: 0.5 }}
    >
      {children}
    </Button>
  );
};

interface EditorFormattingToolbarProps {
  editor: Editor | null;
}

export const EditorFormattingToolbar: React.FC<EditorFormattingToolbarProps> = ({ editor }) => {
  return (
    <ToolbarGroup>
      <EditorToolbarButton
        editor={editor}
        isActive={editor?.isActive('bold') ?? false}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        B
      </EditorToolbarButton>

      <EditorToolbarButton
        editor={editor}
        isActive={editor?.isActive('italic') ?? false}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        I
      </EditorToolbarButton>

      <EditorToolbarButton
        editor={editor}
        isActive={editor?.isActive('bulletList') ?? false}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        •
      </EditorToolbarButton>

      <EditorToolbarButton
        editor={editor}
        isActive={editor?.isActive('orderedList') ?? false}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        1.
      </EditorToolbarButton>

      <EditorToolbarButton
        editor={editor}
        isActive={editor?.isActive('codeBlock') ?? false}
        onClick={() => editor?.chain().focus().setCodeBlock().run()}
      >
        &lt;&gt;
      </EditorToolbarButton>

      <EditorToolbarButton
        editor={editor}
        isActive={false}
        onClick={() => {
          const url = window.prompt('URL do link:');
          if (url) editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }}
      >
        🔗
      </EditorToolbarButton>
    </ToolbarGroup>
  );
};
