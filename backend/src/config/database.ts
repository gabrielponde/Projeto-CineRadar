import { DataSource } from "typeorm";
import { Movie } from "../entities/Movie";
import { Genre } from "../entities/Genre";
import { Provider } from "../entities/Provider";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, 
    logging: true,
    entities: [Movie, Genre, Provider],
    migrations: ["../migrations/*.ts"],
    subscribers: [],
});