import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    tmdb_id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    logo_path: string;

    @ManyToMany(() => Movie, (movie) => movie.providers)
    movies: Movie[];
}