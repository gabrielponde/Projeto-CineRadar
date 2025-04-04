import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    tmdb_id: number;

    @Column()
    name: string;

    @ManyToMany(() => Movie, (movie) => movie.genres)
    movies: Movie[];
}