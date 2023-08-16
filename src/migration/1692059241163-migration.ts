import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692059241163 implements MigrationInterface {
    name = 'Migration1692059241163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "time" character varying NOT NULL, "enum_status" "public"."schedules_enum_status_enum" NOT NULL DEFAULT 'Aberto', "servicesId" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_57f036e4bc927fba3c0a1f6f339" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_57f036e4bc927fba3c0a1f6f339"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
    }

}
