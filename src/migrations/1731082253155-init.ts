import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1731082253155 implements MigrationInterface {
    name = 'Init1731082253155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "is_active" DROP DEFAULT`);
    }

}
