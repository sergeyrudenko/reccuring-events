/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1613657074935 implements MigrationInterface {
    name = 'initial1613657074935';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users"
            ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "firstName" character varying, "lastName" character varying,
            "email" character varying, "password" character varying,
            "phone" character varying,
            CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "users"');
    }
}
