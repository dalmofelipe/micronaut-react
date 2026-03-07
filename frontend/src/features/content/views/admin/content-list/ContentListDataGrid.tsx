import {
  useContents,
  useDeleteContent,
} from "@/features/content/hooks/useContent";
import type { IContent } from "@/features/content/types/Content";
import { ConfirmDeleteDialog } from "@/shared/components/ConfirmDeleteDialog";
import { useNotificationStore } from "@/shared/store/useNotificationStore";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { ContentRowActions } from "./ContentRowActions";

interface ContentListProps {
  onSelectContent: (content: IContent) => void;
}

const ContentListDataGrid: React.FC<ContentListProps> = ({
  onSelectContent,
}) => {
  const { data: contents = [], isLoading, error } = useContents();
  const deleteMutation = useDeleteContent();
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<IContent | null>(null);

  const handleDelete = (content: IContent) => {
    setContentToDelete(content);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!contentToDelete) return;
    try {
      await deleteMutation.mutateAsync(contentToDelete.id);
      showNotification("Conteúdo deletado com sucesso!", "success");
      setDeleteDialogOpen(false);
      setContentToDelete(null);
    } catch (err: any) {
      showNotification(
        err.response?.data?.message || "Erro ao deletar conteúdo",
        "error",
      );
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setContentToDelete(null);
  };

  const columns: GridColDef<IContent>[] = [
    { field: "titulo", headerName: "Título", width: 250, flex: 1 },
    {
      field: "categoria",
      headerName: "Categoria",
      width: 100,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "createdAt",
      headerName: "Data",
      width: 100,
      renderCell: (params) =>
        new Date(params.value).toLocaleDateString("pt-BR"),
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <ContentRowActions
          contentId={params.row.id}
          status={params.row.status}
          onEdit={() => onSelectContent(params.row)}
          onDelete={() => handleDelete(params.row)}
          isDeleting={deleteMutation.isPending}
        />
      ),
    },
  ];

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error">
        Erro ao carregar conteúdos. Tente novamente.
      </Alert>
    );

  if (contents.length === 0)
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          Nenhum conteúdo criado ainda.
        </Typography>
      </Box>
    );

  return (
    <>
      <Box sx={{ flex: 1, position: "relative" }}>
        <Box sx={{ position: "absolute", inset: 0 }}>
          <DataGrid
            rows={contents}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
          />
        </Box>
      </Box>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Deletar Conteúdo"
        message={`Tem certeza que deseja deletar "
          ${contentToDelete?.titulo}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

export default ContentListDataGrid;
