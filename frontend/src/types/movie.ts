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
  
  export type FilterType = 'provider' | 'genre';