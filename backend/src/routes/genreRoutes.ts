import { Router } from "express";
import { getGenres } from "controllers/genreController";

const router = Router();

router.get("/genres", getGenres);

export default router;