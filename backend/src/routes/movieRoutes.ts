import express from "express";
import { 
    getMovies, 
    getMovieById, 
    getMovieByName, 
    syncMovies 
} from "../controllers/movieController";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.get("/search", getMovieByName);
router.post("/sync", syncMovies);

export default router;