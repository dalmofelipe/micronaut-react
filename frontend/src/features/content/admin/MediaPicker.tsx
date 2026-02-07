import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useUploadMedia } from '../shared/hooks';

type Props = {
  onUpload: (url: string) => void;
};

const thumbStyle = {
  width: 96,
  height: 64,
  objectFit: 'cover' as const,
  borderRadius: 4,
  border: '1px solid rgba(0,0,0,0.08)',
};

const MediaPicker: React.FC<Props> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const upload = useUploadMedia();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    try {
      const res = await upload.mutateAsync(file);
      // typed as IMediaUploadResponse by the hook
      (window as any).__lastMediaUpload = res;
      onUpload((res as any).url);
      // keep preview until parent updates content
    } catch (err) {
      console.error('upload failed', err);
    }
  }, [upload, onUpload]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const inputProps = getInputProps();

  return (
    <Box {...getRootProps()} sx={{ display: 'inline-flex', alignItems: 'center' }}>
      {/* visually hide native input but keep it accessible */}
      <input {...inputProps} id="media-input" name="file" aria-labelledby="media-button" style={{ display: 'none' }} />
      <Button id="media-button" variant="outlined" size="small" component="div" disabled={upload.isPending} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {upload.isPending ? <CircularProgress size={18} /> : isDragActive ? 'Solte para inserir' : 'Inserir mídia'}
        {preview ? <img src={preview} style={thumbStyle} alt="preview" /> : null}
      </Button>
      <Box sx={{ ml: 2 }}>
        <Typography variant="caption" color="text.secondary">Arraste ou clique para inserir imagem/áudio/video</Typography>
      </Box>
    </Box>
  );
};

export default MediaPicker;
