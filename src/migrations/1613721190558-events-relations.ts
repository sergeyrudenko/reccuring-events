import {MigrationInterface, QueryRunner} from "typeorm";

export class eventsRelations1613721190558 implements MigrationInterface {
    name = 'eventsRelations1613721190558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_relations" ("event_id" uuid NOT NULL, "user_id" uuid, "company_id" uuid, CONSTRAINT "REL_e11e0f260ff6df1a1f78497df2" UNIQUE ("event_id"), CONSTRAINT "PK_e11e0f260ff6df1a1f78497df28" PRIMARY KEY ("event_id"))`);
        await queryRunner.query(`ALTER TABLE "event_relations" ADD CONSTRAINT "FK_e11e0f260ff6df1a1f78497df28" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_relations" ADD CONSTRAINT "FK_11806f4445f3dfca346a6c1dc4b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_relations" ADD CONSTRAINT "FK_b5e5e63aa210db23f8e2b4cdbc3" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_relations" DROP CONSTRAINT "FK_b5e5e63aa210db23f8e2b4cdbc3"`);
        await queryRunner.query(`ALTER TABLE "event_relations" DROP CONSTRAINT "FK_11806f4445f3dfca346a6c1dc4b"`);
        await queryRunner.query(`ALTER TABLE "event_relations" DROP CONSTRAINT "FK_e11e0f260ff6df1a1f78497df28"`);
        await queryRunner.query(`DROP TABLE "event_relations"`);
    }

}
