import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Genre } from "./Genre";
import { Provider } from "./Provider";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: "text", nullable: true })
    overview: string;

    @Column({ nullable: true })
    poster_path: string;

    @Column({ type: "date", nullable: true })
    release_date: Date;

    @Column({ unique: true })
    tmdb_id: number;

    @ManyToMany(() => Genre, (genre) => genre.movies, { cascade: true })
    @JoinTable()
    genres: Genre[];

    @ManyToMany(() => Provider, (provider) => provider.movies, { cascade: true })
    @JoinTable()
    providers: Provider[];
}