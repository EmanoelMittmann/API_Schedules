import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692059353655 implements MigrationInterface {
    name = 'Migration1692059353655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "professionalId" uuid`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "UQ_02bf3a77a961fa345e848beb093" UNIQUE ("professionalId")`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_02bf3a77a961fa345e848beb093" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_02bf3a77a961fa345e848beb093"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "UQ_02bf3a77a961fa345e848beb093"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "professionalId"`);
    }

}
