import express from "express";
import { AppDataSource } from "./config/database";
import movieRoutes from "./routes/movieRoutes";
import cors from "cors";

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private async database(): Promise<void> {
        try {
            await AppDataSource.initialize();
            console.log("Database connected");
        } catch (error) {
            console.error("Database connection error:", error);
        }
    }

    private routes(): void {
        this.express.use("/api/movies", movieRoutes);
    }
}

export default new App().express;