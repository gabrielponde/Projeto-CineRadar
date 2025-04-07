import { useState } from 'react';
import { FilterType } from '../types/movie';

export const useFilters = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const selectProvider = (providerId: number) => {
    setSelectedProvider(providerId);
    setActiveFilter('provider');
  };

  const selectGenre = (genreId: number) => {
    setSelectedGenre(genreId);
    setActiveFilter('genre');
  };

  const clearFilters = () => {
    setActiveFilter(null);
    setSelectedProvider(null);
    setSelectedGenre(null);
  };

  return {
    activeFilter,
    selectedProvider,
    selectedGenre,
    toggleFilter,
    selectProvider,
    selectGenre,
    clearFilters,
  };
};