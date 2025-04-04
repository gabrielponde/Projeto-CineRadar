import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Genre } from "../entities/Genre";
import { syncTMDBData } from "../services/tmdbSync";

export const getGenres = async (req: Request, res: Response) => {
    try {
        const genreRepo = AppDataSource.getRepository("Genre");
        const genres = await genreRepo.find();        
        res.json(genres);        
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });       
    }
}