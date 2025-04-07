import api from './api';

export interface Movie {
  id: number;
  tmdbId: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  genres: number[];
  streamingProviders: number[];
}

export interface StreamingProvider {
  providerId: number;
  providerName: string;
  logoPath: string;
}

export interface Genre {
  id: number;
  name: string;
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await api.get('/search', { params: { query } });
  return response.data;
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await api.get('/popular');
  return response.data;
};

export const getMoviesByProvider = async (providerId: number): Promise<Movie[]> => {
  const response = await api.get(`/provider/${providerId}`);
  return response.data;
};

export const getMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
  const response = await api.get(`/genre/${genreId}`);
  return response.data;
};

export const getProviders = async (): Promise<StreamingProvider[]> => {
  const response = await api.get('/providers');
  return response.data;
};

export const getGenres = async (): Promise<Genre[]> => {
  const response = await api.get('/genres');
  return response.data;
};