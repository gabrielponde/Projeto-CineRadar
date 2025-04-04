import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Movie } from "../entities/Movie";
import { syncTMDBData } from "../services/tmdbSync";

// Todas as funções devem retornar void (o Express lida com a resposta)
export const getMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const { platform, genre } = req.query;
        const movieRepo = AppDataSource.getRepository(Movie);

        const query = movieRepo
            .createQueryBuilder("movie")
            .leftJoinAndSelect("movie.genres", "genre")
            .leftJoinAndSelect("movie.providers", "provider");

        if (platform) {
            query.andWhere("provider.name = :platform", { platform: platform as string });
        }

        if (genre) {
            query.andWhere("genre.id = :genre", { genre: Number(genre) });
        }

        const movies = await query.getMany();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const movieRepo = AppDataSource.getRepository(Movie);
        const movie = await movieRepo.findOne({
            where: { id: Number(id) },
            relations: ["genres", "providers"],
        });

        if (!movie) {
            res.status(404).json({ error: "Movie not found" });
            return; // Early return sem valor
        }

        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Tipagem mais segura para o query param
interface GetMovieByNameRequest extends Request {
    query: {
        name?: string;
    }
}

export const getMovieByName = async (req: GetMovieByNameRequest, res: Response): Promise<void> => {
    try {
        const { name } = req.query;
        if (!name) {
            res.status(400).json({ error: "Name parameter is required" });
            return;
        }

        const movieRepo = AppDataSource.getRepository(Movie);
        const movies = await movieRepo.find({
            where: { title: name },
            relations: ["genres", "providers"],
        });

        if (!movies.length) {
            res.status(404).json({ error: "Movie not found" });
            return;
        }

        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const syncMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        await syncTMDBData();
        res.json({ message: "Sync completed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Sync failed" });
    }
};