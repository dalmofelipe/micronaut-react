import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBookFiltersStore } from '../store/useBookFiltersStore';
import type { IBookFilters } from '../types';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    filters,
    setSearch,
    setAuthor,
    setGenre,
    setAvailability,
    setPage
  } = useBookFiltersStore();

  // Sincronizar query params -> store (na montagem)
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const author = searchParams.get('author') || '';
    const genre = searchParams.get('genre') || '';
    const availability = 
      (searchParams.get('availability') as IBookFilters['availability']) 
      || 'all';
    const page = parseInt(searchParams.get('page') || '1', 10);

    if (search) setSearch(search);
    if (author) setAuthor(author);
    if (genre) setGenre(genre);
    if (availability !== 'all') setAvailability(availability);
    if (page !== 1) setPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sincronizar store -> query params (quando filtros mudarem)
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set('search', filters.search);
    if (filters.author) params.set('author', filters.author);
    if (filters.genre) params.set('genre', filters.genre);
    if (filters.availability !== 'all') params.set('availability', filters.availability);
    if (filters.page > 1) params.set('page', filters.page.toString());

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);
}
