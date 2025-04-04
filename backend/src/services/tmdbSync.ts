import axios from "axios";
import { AppDataSource } from "../config/database";
import { Movie } from "../entities/Movie";
import { Genre } from "../entities/Genre";
import { Provider } from "../entities/Provider";
import { In } from "typeorm";
import { MoviesResponse } from "../types/MoviesResponse";
import { TMDBMovie } from "../types/TMDBMovie";

export async function syncTMDBData(): Promise<void> {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const movieRepo = AppDataSource.getRepository(Movie);
    const genreRepo = AppDataSource.getRepository(Genre);
    const providerRepo = AppDataSource.getRepository(Provider);

    try {
        // 1. Buscar gêneros disponíveis
        const genresResponse = await axios.get<{
            genres: Array<{ id: number; name: string }>;
        }>(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=pt-BR`
        );
        const allGenres = genresResponse.data.genres;

        // 2. Sincronizar gêneros no banco
        await Promise.all(
            allGenres.map(async (genre: any) => {
                await genreRepo.upsert(
                    { id: genre.id, name: genre.name },
                    ["id"]
                );
            })
        );

        // 3. Buscar filmes populares (paginação recomendada)
        const moviesResponse = await axios.get<MoviesResponse>(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=pt-BR&page=1`
        );

        // 4. Processar cada filme
        for (const tmdbMovie of moviesResponse.data.results) {
            // Buscar providers
            const providersResponse = await axios.get<{
                results: {
                    BR?: {
                        flatrate?: Array<{
                            provider_id: number;
                            provider_name: string;
                            logo_path: string;
                        }>;
                    };
                };
            }>(
                `https://api.themoviedb.org/3/movie/${tmdbMovie.id}/watch/providers?api_key=${process.env.TMDB_KEY}`
            );
            const brProviders = providersResponse.data.results.BR?.flatrate || [];

            // Criar/Atualizar filme
            await movieRepo.upsert(
                {
                    tmdb_id: tmdbMovie.id,
                    title: tmdbMovie.title,
                    overview: tmdbMovie.overview,
                    poster_path: tmdbMovie.poster_path,
                    release_date: tmdbMovie.release_date,
                },
                ["tmdb_id"]
            );

            // Atualizar relacionamentos
            const movie = await movieRepo.findOneBy({ tmdb_id: tmdbMovie.id });
            if (movie) {
                // Atualizar gêneros
                movie.genres = await genreRepo.findBy({
                    id: In(tmdbMovie.genre_ids),
                });

                // Atualizar providers
                movie.providers = await Promise.all(
                    brProviders.map(async (provider: any) => {
                        await providerRepo.upsert(
                            {
                                id: provider.provider_id,
                                name: provider.provider_name,
                                logo_path: provider.logo_path,
                            },
                            ["id"]
                        );
                        return providerRepo.findOneBy({
                            id: provider.provider_id,
                        }) as Promise<Provider>;
                    })
                );

                await movieRepo.save(movie);
            }
        }
    } catch (error) {
        console.error("Sync error:", error);
        throw error;
    }
}