import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelations1743687116391 implements MigrationInterface {
    name = 'CreateRelations1743687116391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "tmdb_id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_65c215601470cfebc85707b6e68" UNIQUE ("tmdb_id"), CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider" ("id" SERIAL NOT NULL, "tmdb_id" integer NOT NULL, "name" character varying NOT NULL, "logo_path" character varying, CONSTRAINT "UQ_cd6c75f2250e17594d75bc7c724" UNIQUE ("tmdb_id"), CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "overview" text, "poster_path" character varying, "release_date" date, "tmdb_id" integer NOT NULL, CONSTRAINT "UQ_22cb43bb628a84676ad3a4c2a91" UNIQUE ("tmdb_id"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_genres_genre" ("movieId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_aee18568f9fe4ecca74f35891af" PRIMARY KEY ("movieId", "genreId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId") `);
        await queryRunner.query(`CREATE TABLE "movie_providers_provider" ("movieId" integer NOT NULL, "providerId" integer NOT NULL, CONSTRAINT "PK_1e2ea928c97eee2b0929ef079c7" PRIMARY KEY ("movieId", "providerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c38e8859033e7717226c2c86bd" ON "movie_providers_provider" ("movieId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58fa682163c79d751a52dc591f" ON "movie_providers_provider" ("providerId") `);
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_1996ce31a9e067304ab168d6715" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_providers_provider" ADD CONSTRAINT "FK_c38e8859033e7717226c2c86bd6" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_providers_provider" ADD CONSTRAINT "FK_58fa682163c79d751a52dc591fd" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_providers_provider" DROP CONSTRAINT "FK_58fa682163c79d751a52dc591fd"`);
        await queryRunner.query(`ALTER TABLE "movie_providers_provider" DROP CONSTRAINT "FK_c38e8859033e7717226c2c86bd6"`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_1996ce31a9e067304ab168d6715"`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58fa682163c79d751a52dc591f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c38e8859033e7717226c2c86bd"`);
        await queryRunner.query(`DROP TABLE "movie_providers_provider"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1996ce31a9e067304ab168d671"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_985216b45541c7e0ec644a8dd4"`);
        await queryRunner.query(`DROP TABLE "movie_genres_genre"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "genre"`);
    }

}
