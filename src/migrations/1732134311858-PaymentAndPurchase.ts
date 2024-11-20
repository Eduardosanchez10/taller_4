import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentAndPurchase1732134311858 implements MigrationInterface {
    name = 'PaymentAndPurchase1732134311858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "method" character varying NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."purchase_status_enum" AS ENUM('create', 'modified', 'Pending_approval', 'in_proccess', 'processed', 'rejected', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "status" "public"."purchase_status_enum" NOT NULL DEFAULT 'Pending_approval', "payment_id" uuid, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_a9a94990bb6e5de63e1ebdae328" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_a9a94990bb6e5de63e1ebdae328"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TYPE "public"."purchase_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}
