import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692058963463 implements MigrationInterface {
    name = 'Migration1692058963463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professional" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "availabilitily" character varying NOT NULL, CONSTRAINT "PK_2846b0dcaac01f9983cb719f124" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "professional"`);
    }

}
