import {MigrationInterface, QueryRunner} from "typeorm";

export class createFilesAndFolderTable1693498496114 implements MigrationInterface {
    name = 'createFilesAndFolderTable1693498496114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file_entity" ("id" SERIAL NOT NULL, "file_name" character varying NOT NULL, "file_url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "folderId" integer, "userId" integer, CONSTRAINT "PK_d8375e0b2592310864d2b4974b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "folder_entity" ("id" SERIAL NOT NULL, "folder_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_c1c9eba84f5c7029ad887020551" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file_entity" ADD CONSTRAINT "FK_08aefd9a5df416c7ede643cca74" FOREIGN KEY ("folderId") REFERENCES "folder_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file_entity" ADD CONSTRAINT "FK_fb7f05b8927a1295e3c49dec4dd" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "folder_entity" ADD CONSTRAINT "FK_4571399b7d5ee5b2b1536d31d55" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "folder_entity" DROP CONSTRAINT "FK_4571399b7d5ee5b2b1536d31d55"`);
        await queryRunner.query(`ALTER TABLE "file_entity" DROP CONSTRAINT "FK_fb7f05b8927a1295e3c49dec4dd"`);
        await queryRunner.query(`ALTER TABLE "file_entity" DROP CONSTRAINT "FK_08aefd9a5df416c7ede643cca74"`);
        await queryRunner.query(`DROP TABLE "folder_entity"`);
        await queryRunner.query(`DROP TABLE "file_entity"`);
    }

}
