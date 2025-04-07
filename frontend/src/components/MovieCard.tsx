// front/src/components/MovieCard.tsx
import React from 'react';
import Image from 'next/image';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : '/no-poster.jpg';

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Container da imagem com position relative - ESSA PARTE É CRUCIAL */}
      <div className="relative aspect-[2/3] w-full">
        {!movie.posterPath ? (
          <div className="aspect-[2/3] w-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500 text-sm">Poster não disponível</span>
          </div>
        ) : (
          <Image
            src={posterUrl}
            alt={`Poster de ${movie.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/no-poster.jpg';
            }}
          />
        )}
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{movie.title}</h3>
        {movie.releaseDate && (
          <span className="text-sm text-gray-500 mt-auto">
            {new Date(movie.releaseDate).getFullYear()}
          </span>
        )}
      </div>
    </div>
  );
};

export default MovieCard;