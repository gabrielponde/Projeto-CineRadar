import React from 'react';
import { useFilters } from '../hooks/useFilters';
import { useMovies } from '../hooks/useMovies';
import { Movie } from '../types/movie'; // Adjust the path if necessary
import FilterSidebar from '../components/FilterSidebar';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const {
    movies,
    providers,
    genres,
    loading,
    error,
    search,
    filterByProvider,
    filterByGenre,
  } = useMovies();

  const {
    activeFilter,
    selectedProvider,
    selectedGenre,
    toggleFilter,
    selectProvider,
    selectGenre,
    clearFilters,
  } = useFilters();

  const handleSearch = (query: string) => {
    clearFilters();
    search(query);
  };

  React.useEffect(() => {
    if (selectedProvider !== null) {
      filterByProvider(selectedProvider);
    }
  }, [selectedProvider, filterByProvider]);

  React.useEffect(() => {
    if (selectedGenre !== null) {
      filterByGenre(selectedGenre);
    }
  }, [selectedGenre, filterByGenre]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <FilterSidebar
              providers={providers}
              genres={genres}
              activeFilter={activeFilter}
              selectedProvider={selectedProvider}
              selectedGenre={selectedGenre}
              onToggleFilter={toggleFilter}
              onSelectProvider={selectProvider}
              onSelectGenre={selectGenre}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6">
                  {selectedProvider
                    ? `Filmes na ${providers.find(p => p.providerId === selectedProvider)?.providerName || 'Plataforma'}`
                    : selectedGenre
                    ? `Filmes de ${genres.find(g => g.id === selectedGenre)?.name || 'Gênero'}`
                    : 'Filmes Populares'}
                </h2>

                {movies.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      Nenhum filme encontrado. Tente outra busca.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movies.map((movie: Movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;