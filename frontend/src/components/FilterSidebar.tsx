import React from 'react';
import { StreamingProvider, Genre, FilterType } from '../types/movie';

interface FilterSidebarProps {
  providers: StreamingProvider[];
  genres: Genre[];
  activeFilter: FilterType | null;
  selectedProvider: number | null;
  selectedGenre: number | null;
  onToggleFilter: (filter: FilterType) => void;
  onSelectProvider: (providerId: number) => void;
  onSelectGenre: (genreId: number) => void;
  onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  providers,
  genres,
  activeFilter,
  selectedProvider,
  selectedGenre,
  onToggleFilter,
  onSelectProvider,
  onSelectGenre,
  onClearFilters,
}) => {
  return (
    <div className="w-64 bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">Filtros</h3>
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Limpar
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={() => onToggleFilter('provider')}
            className={`w-full text-left p-2 rounded-md ${
              activeFilter === 'provider' ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            Plataformas
          </button>
          {activeFilter === 'provider' && (
            <div className="mt-2 pl-4 space-y-2">
              {providers.map((provider) => (
                <div
                  key={provider.providerId}
                  onClick={() => onSelectProvider(provider.providerId)}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    selectedProvider === provider.providerId
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {provider.logoPath ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w45${provider.logoPath}`}
                      alt={provider.providerName}
                      className="w-6 h-6 mr-2"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                  )}
                  <span>{provider.providerName}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => onToggleFilter('genre')}
            className={`w-full text-left p-2 rounded-md ${
              activeFilter === 'genre' ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            Gêneros
          </button>
          {activeFilter === 'genre' && (
            <div className="mt-2 pl-4 space-y-2">
              {genres.map((genre) => (
                <div
                  key={genre.id}
                  onClick={() => onSelectGenre(genre.id)}
                  className={`p-2 rounded-md cursor-pointer ${
                    selectedGenre === genre.id
                      ? 'bg-blue-50'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {genre.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;