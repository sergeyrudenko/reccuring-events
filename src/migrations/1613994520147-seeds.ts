import { userSeed } from '../seeds/user';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { eventSeed1, eventSeed2 } from '../seeds/event';
import { eventExceptionSeed } from '../seeds/event-exception';

export class seeds1613994520147 implements MigrationInterface {
  name = 'seeds1613994520147';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users(id, first_name, last_name, email) VALUES('${userSeed.id}', '${userSeed.firstName}', '${userSeed.lastName}', '${userSeed.email}')`,
    );
    await queryRunner.query(
      `INSERT INTO events(id, start_date, frequency_id, user_id) VALUES('${eventSeed1.id}', '${eventSeed1.startDate}', '${eventSeed1.frequencyId}', '${userSeed.id}')`,
    );
    await queryRunner.query(
      `INSERT INTO events(id, start_date, frequency_id, user_id) VALUES('${eventSeed2.id}', '${eventSeed2.startDate}', '${eventSeed2.frequencyId}', '${userSeed.id}')`,
    );
    await queryRunner.query(
      `INSERT INTO event_instance_exceptions(exception_date, exception_type_id, event_id) VALUES('${eventExceptionSeed.exceptionDate}', '${eventExceptionSeed.exceptionId}', '${eventSeed1.id}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users`);
    await queryRunner.query(`DELETE FROM events`);
    await queryRunner.query(`DELETE FROM event_instance_exceptions`);
  }
}
