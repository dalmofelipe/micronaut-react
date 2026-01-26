import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBookFiltersStore } from '../store/useBookFiltersStore';
import type { IBookFilters } from '../types';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    filters,
    setSearch,
    setAutor,
    setGenero,
    setDisponibilidade,
    setPage
  } = useBookFiltersStore();

  // Sincronizar query params -> store (na montagem)
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const autor = searchParams.get('autor') || '';
    const genero = searchParams.get('genero') || '';
    const disponibilidade = 
      (searchParams.get('disponibilidade') as IBookFilters['disponibilidade']) 
      || 'todos';
    const page = parseInt(searchParams.get('page') || '1', 10);

    if (search) setSearch(search);
    if (autor) setAutor(autor);
    if (genero) setGenero(genero);
    if (disponibilidade !== 'todos') setDisponibilidade(disponibilidade);
    if (page !== 1) setPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sincronizar store -> query params (quando filtros mudarem)
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set('search', filters.search);
    if (filters.autor) params.set('autor', filters.autor);
    if (filters.genero) params.set('genero', filters.genero);
    if (filters.disponibilidade !== 'todos') params.set('disponibilidade', filters.disponibilidade);
    if (filters.page > 1) params.set('page', filters.page.toString());

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);
}
