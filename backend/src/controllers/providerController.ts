import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Provider } from "../entities/Provider";
import { syncTMDBData } from "../services/tmdbSync";

export const getProviders = async (req: Request, res: Response) => {
    try {
        const providerRepo = AppDataSource.getRepository("Provider");
        const providers = await providerRepo.find();
        res.json(providers);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
