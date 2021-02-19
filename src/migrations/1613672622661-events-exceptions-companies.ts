import { MigrationInterface,
  QueryRunner } from 'typeorm';

export class eventsExceptionsCompanies1613672622661
    implements MigrationInterface {
    name = 'eventsExceptionsCompanies1613672622661';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "event_instance_exceptions" ("exception_date" TIMESTAMP NOT NULL,
            "exception_type_id" smallint NOT NULL,
            "event_id" uuid NOT NULL,
            CONSTRAINT "PK_34552b2757bcb6664170365559a" PRIMARY KEY ("exception_date",
            "event_id"))`,
        );
        await queryRunner.query(
            'CREATE INDEX "IDX_bb82034bd4062c04ac051ec05f" ON "event_instance_exceptions" ("exception_type_id") ',
        );
        await queryRunner.query(
            `CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "title" character varying NOT NULL,
            CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            'ALTER TABLE "event_instance_exceptions" ADD CONSTRAINT "FK_279a226696a1736e89dd3db1311" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "event_instance_exceptions" DROP CONSTRAINT "FK_279a226696a1736e89dd3db1311"',
        );
        await queryRunner.query('DROP TABLE "companies"');
        await queryRunner.query('DROP INDEX "IDX_bb82034bd4062c04ac051ec05f"');
        await queryRunner.query('DROP TABLE "event_instance_exceptions"');
    }
}
