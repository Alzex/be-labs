import { MigrationInterface, QueryRunner } from "typeorm";

export class Auth1702933975007 implements MigrationInterface {
    name = 'Auth1702933975007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordHash" character varying(255) NOT NULL DEFAULT 'old'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordSalt" character varying(255) NOT NULL DEFAULT 'old'`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordSalt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordHash"`);
    }

}
