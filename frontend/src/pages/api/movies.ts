import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "../../../../backend/src/config/database";
import { Movie } from "../../../../backend/src/entities/Movie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await AppDataSource.initialize();
  
  const { platform, genre } = req.query;
  const movieRepo = AppDataSource.getRepository(Movie);

  // Query Builder com TypeORM
  const query = movieRepo
    .createQueryBuilder("movie")
    .leftJoinAndSelect("movie.genres", "genre")
    .leftJoinAndSelect("movie.providers", "provider");

  if (platform) {
    query.andWhere("provider.name = :platform", { platform });
  }

  if (genre) {
    query.andWhere("genre.id = :genre", { genre: Number(genre) });
  }

  const movies = await query.getMany();
  res.status(200).json(movies);
}