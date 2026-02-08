import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useContents, useDeleteContent } from '../../shared/hooks';
import type { IContent } from '../../shared/types';
import { ContentRowActions } from './ContentRowActions';

interface ContentListProps {
  onSelectContent: (content: IContent) => void;
  selectedContentId?: number;
}

const ContentListDataGrid: React.FC<ContentListProps> = ({ onSelectContent }) => {
  const { data: contents = [], isLoading, error } = useContents();
  const deleteMutation = useDeleteContent();

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este conteúdo?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          alert('Conteúdo deletado com sucesso!');
        },
      });
    }
  };

  const columns: GridColDef<IContent>[] = [
    {
      field: 'titulo',
      headerName: 'Título',
      width: 250,
      flex: 1,
    },
    {
      field: 'categoria',
      headerName: 'Categoria',
      width: 100,
      renderCell: (params) => params.value || '-',
    },
    {
      field: 'createdAt',
      headerName: 'Data',
      width: 100,
      renderCell: (params) => new Date(params.value).toLocaleDateString('pt-BR'),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <ContentRowActions
          contentId={params.row.id}
          status={params.row.status}
          onEdit={() => onSelectContent(params.row)}
          onDelete={() => handleDelete(params.row.id)}
          isDeleting={deleteMutation.isPending}
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Erro ao carregar conteúdos. Tente novamente.</Alert>;
  }

  if (contents.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Nenhum conteúdo criado ainda.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, position: 'relative' }}>
      <Box sx={{ position: 'absolute', inset: 0 }}>
        <DataGrid
          rows={contents}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
        />
      </Box></Box>
  );
};

export default ContentListDataGrid;
