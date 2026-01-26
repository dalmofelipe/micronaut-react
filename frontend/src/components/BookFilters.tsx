import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Drawer,
  IconButton,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close as CloseIcon, FilterList as FilterIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useBookFiltersStore } from '../store/useBookFiltersStore';
import {
  StyledFilterContainer,
  StyledFilterHeader,
  StyledFilterTitle,
  StyledSidebar,
} from './styles/BookFilters.styled';

interface IBookFiltersProps {
  variant?: 'sidebar' | 'drawer';
}

export function BookFilters({ variant = 'sidebar' }: IBookFiltersProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    filters,
    setAutor,
    setGenero,
    setDisponibilidade,
    resetFilters
  } = useBookFiltersStore();

  const renderCloseButton = () => {
    if (variant !== 'drawer' && !isMobile) return null;

    return (
      <IconButton onClick={() => setDrawerOpen(false)}>
        <CloseIcon />
      </IconButton>
    );
  };

  const renderAutorFilter = () => (
    <Tooltip title="Disponível após Fase 1 do backend" placement="top">
      <span>
        <TextField
          label="Autor"
          value={filters.autor}
          onChange={(e) => setAutor(e.target.value)}
          fullWidth
          size="small"
          disabled
        />
      </span>
    </Tooltip>
  );

  const renderGeneroFilter = () => (
    <Tooltip title="Disponível após Fase 1 do backend" placement="top">
      <span>
        <FormControl fullWidth size="small" disabled>
          <InputLabel>Gênero</InputLabel>
          <Select 
            value={filters.genero} 
            onChange={(e) => setGenero(e.target.value)} 
            label="Gênero"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Ficção Científica">Ficção Científica</MenuItem>
            <MenuItem value="Fantasia">Fantasia</MenuItem>
            <MenuItem value="Quadrinhos">Quadrinhos</MenuItem>
            <MenuItem value="Mangá">Mangá</MenuItem>
            <MenuItem value="Biografia Técnica">Biografia Técnica</MenuItem>
          </Select>
        </FormControl>
      </span>
    </Tooltip>
  );

  const renderDisponibilidadeFilter = () => (
    <Tooltip title="Disponível após Fase 1 do backend" placement="top">
      <span>
        <FormControl fullWidth size="small" disabled>
          <InputLabel>Disponibilidade</InputLabel>
          <Select
            value={filters.disponibilidade}
            onChange={(e) =>
              setDisponibilidade(e.target.value as typeof filters.disponibilidade)
            }
            label="Disponibilidade"
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="disponiveis">Disponíveis</MenuItem>
            <MenuItem value="indisponiveis">Indisponíveis</MenuItem>
          </Select>
        </FormControl>
      </span>
    </Tooltip>
  );

  const renderFilterContent = () => (
    <StyledFilterContainer 
      sx={{ 
        width: variant === 'drawer' || isMobile ? 280 : '100%' 
      }}
    >
      <StyledFilterHeader>
        <StyledFilterTitle variant="h6">
          <FilterIcon />
          Filtros
        </StyledFilterTitle>
        {renderCloseButton()}
      </StyledFilterHeader>

      <Divider />

      {renderAutorFilter()}
      {renderGeneroFilter()}
      {renderDisponibilidadeFilter()}

      <Button variant="outlined" onClick={resetFilters} sx={{ mt: 'auto' }}>
        Limpar Filtros
      </Button>
    </StyledFilterContainer>
  );

  const renderMobileDrawer = () => (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterIcon />}
        onClick={() => setDrawerOpen(true)}
        sx={{ mb: 2 }}
      >
        Filtros
      </Button>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {renderFilterContent()}
      </Drawer>
    </>
  );

  const renderDesktopSidebar = () => <StyledSidebar>{renderFilterContent()}</StyledSidebar>;

  if (isMobile || variant === 'drawer') {
    return renderMobileDrawer();
  }

  return renderDesktopSidebar();
}
