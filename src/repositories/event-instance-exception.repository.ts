import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { InstanceExceptionType } from '../constants/instance-exception-types';
import { EventInstanceExceptionEntity } from '../modules/calendar/entities/event-instance-exception.entity';

@EntityRepository(EventInstanceExceptionEntity)
export class EventInstanceExceptionRepository extends Repository<EventInstanceExceptionEntity> {
  public async createAndInsert(
    eventId: string,
    createData: {
      exceptionDate: Date;
      exceptionTypeId: InstanceExceptionType;
    }[],
  ): Promise<void> {
    const instanceExceptions = this.create(
      createData.map((ed) => ({
        exceptionDate: ed.exceptionDate,
        event: { id: eventId },
        exceptionType: { id: ed.exceptionTypeId },
      })),
    );
    await this.createQueryBuilder()
      .insert()
      .values(instanceExceptions)
      .execute();
  }
}
