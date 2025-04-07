import { useState, useEffect } from 'react';
import { Movie, StreamingProvider, Genre } from '../types/movie';
import {
  searchMovies,
  getPopularMovies,
  getMoviesByProvider,
  getMoviesByGenre,
  getProviders,
  getGenres,
} from '../services/movies';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<StreamingProvider[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [popularMovies, providersData, genresData] = await Promise.all([
          getPopularMovies(),
          getProviders(),
          getGenres(),
        ]);
        setMovies(popularMovies);
        setProviders(providersData);
        setGenres(genresData);
      } catch (err) {
        setError('Failed to fetch initial data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const search = async (query: string) => {
    try {
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError('Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  const filterByProvider = async (providerId: number) => {
    try {
      setLoading(true);
      const results = await getMoviesByProvider(providerId);
      setMovies(results);
    } catch (err) {
      setError('Failed to filter by provider');
    } finally {
      setLoading(false);
    }
  };

  const filterByGenre = async (genreId: number) => {
    try {
      setLoading(true);
      const results = await getMoviesByGenre(genreId);
      setMovies(results);
    } catch (err) {
      setError('Failed to filter by genre');
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    providers,
    genres,
    loading,
    error,
    search,
    filterByProvider,
    filterByGenre,
  };
};