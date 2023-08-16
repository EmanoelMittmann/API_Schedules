import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692063297182 implements MigrationInterface {
    name = 'Migration1692063297182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."schedules_enum_status_enum" RENAME TO "schedules_enum_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."schedules_enum_status_enum" AS ENUM('Agendado', 'Aberto', 'Cancelado', 'Concluido')`);
        await queryRunner.query(`ALTER TABLE "schedules" ALTER COLUMN "enum_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "schedules" ALTER COLUMN "enum_status" TYPE "public"."schedules_enum_status_enum" USING "enum_status"::"text"::"public"."schedules_enum_status_enum"`);
        await queryRunner.query(`ALTER TABLE "schedules" ALTER COLUMN "enum_status" SET DEFAULT 'Aberto'`);
        await queryRunner.query(`DROP TYPE "public"."schedules_enum_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."schedules_enum_status_enum_old" AS ENUM('Agendado', 'Aberto', 'Cancelado')`);
        await queryRunner.query(`ALTER TABLE "schedules" ALTER COLUMN "enum_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "schedules" ALTER COLUMN "enum_status" TYPE "public"."schedules_enum_status_enum_old" USING "enum_status"::"text"::"public"."schedules_enum_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "schedules" ALTER COLUMN "enum_status" SET DEFAULT 'Aberto'`);
        await queryRunner.query(`DROP TYPE "public"."schedules_enum_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."schedules_enum_status_enum_old" RENAME TO "schedules_enum_status_enum"`);
    }

}
