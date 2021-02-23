import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1613736332758 implements MigrationInterface {
  name = 'initial1613736332758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event_frequencies" ("id" SERIAL NOT NULL, "frequency" interval, CONSTRAINT "PK_e02045c0596fdbe3c1ebb9d4db5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO event_frequencies (id, frequency) VALUES (1, NULL), (2, '1 day'), (3, '1 week'), (4, '2 weeks'), (5, '1 month')`,
    );

    await queryRunner.query(
      `CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "start_date" TIMESTAMP NOT NULL, "frequency_id" integer NOT NULL, "user_id" uuid, "company_id" uuid, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_instance_exceptions" ("exception_date" TIMESTAMP NOT NULL, "exception_type_id" smallint NOT NULL, "event_id" uuid NOT NULL, CONSTRAINT "PK_34552b2757bcb6664170365559a" PRIMARY KEY ("exception_date", "event_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bb82034bd4062c04ac051ec05f" ON "event_instance_exceptions" ("exception_type_id") `,
    );

    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_3f7134cb57dbdc4af7c08a77d39" FOREIGN KEY ("frequency_id") REFERENCES "event_frequencies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_09f256fb7f9a05f0ed9927f406b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_b97c36be0cf65565fad88588c28" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_instance_exceptions" ADD CONSTRAINT "FK_279a226696a1736e89dd3db1311" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_instance_exceptions" DROP CONSTRAINT "FK_279a226696a1736e89dd3db1311"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_b97c36be0cf65565fad88588c28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_09f256fb7f9a05f0ed9927f406b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_3f7134cb57dbdc4af7c08a77d39"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_bb82034bd4062c04ac051ec05f"`);
    await queryRunner.query(`DROP TABLE "event_instance_exceptions"`);
    await queryRunner.query(`DROP TABLE "events"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "companies"`);
    await queryRunner.query(`DROP TABLE "event_frequencies"`);
  }
}
