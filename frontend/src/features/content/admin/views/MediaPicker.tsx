import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useUploadMedia } from '../../shared/hooks';
import {
  PickerContainer,
  PickerButton,
  HintContainer,
  PreviewThumb,
  HiddenFileInput,
} from './styles/MediaPicker.styled';

type Props = {
  onUpload: (url: string) => void;
};

const MediaPicker: React.FC<Props> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const upload = useUploadMedia();
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setPreview(URL.createObjectURL(file));
    try {
      const response = await upload.mutateAsync(file);
      onUpload(response.url);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await processFile(file);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) await processFile(file);
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const { getRootProps, isDragActive } = useDropzone({ 
    onDrop, 
    multiple: false,
    noClick: true,
  });

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const getButtonText = () => {
    if (upload.isPending) return null;
    return isDragActive ? 'Solte para inserir' : 'Inserir mídia';
  };

  return (
    <PickerContainer {...getRootProps()}>
      <HiddenFileInput 
        ref={inputRef}
        type="file"
        accept="image/*,audio/*,video/*"
        onChange={handleFileChange}
      />

      <PickerButton 
        onClick={handleButtonClick}
        variant="outlined" 
        size="small" 
        disabled={upload.isPending}
      >
        {upload.isPending && <CircularProgress size={18} />}
        {getButtonText()}
        {preview && <PreviewThumb src={preview} alt="preview" />}
      </PickerButton>
      
      <HintContainer>
        <Typography variant="caption" color="text.secondary">
          Arraste ou clique para inserir imagem/áudio/vídeo
        </Typography>
      </HintContainer>
    </PickerContainer>
  );
};

export default MediaPicker;