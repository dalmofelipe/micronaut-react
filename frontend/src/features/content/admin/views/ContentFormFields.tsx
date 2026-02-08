import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import type { ICreateContentRequest } from '../../shared/types';

interface IContentFormFieldsProps {
  form: ICreateContentRequest;
  onUpdate: (updates: Partial<ICreateContentRequest>) => void;
}

export const ContentFormFields: React.FC<IContentFormFieldsProps> = ({ form, onUpdate }) => {
  return (
    <>
      <TextField
        id="content-title"
        fullWidth
        label="Título"
        value={form.titulo}
        onChange={(e) => onUpdate({ titulo: e.target.value })}
        required
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="content-category-label">Categoria</InputLabel>
          <Select
            id="content-category"
            name="categoria"
            labelId="content-category-label"
            value={form.categoria}
            onChange={(e) => onUpdate({ categoria: e.target.value })}
          >
            <MenuItem value="tutorial">Tutorial</MenuItem>
            <MenuItem value="guia">Guia</MenuItem>
            <MenuItem value="livro">Livro</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="content-status-label">Status</InputLabel>
          <Select
            id="content-status"
            name="status"
            labelId="content-status-label"
            value={form.status}
            onChange={(e) => onUpdate({ status: e.target.value })}
          >
            <MenuItem value="rascunho">Rascunho</MenuItem>
            <MenuItem value="publicado">Publicado</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
