import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { InstanceExceptionType } from '../constants/instance-exception-types';
import { EventInstanceExceptionEntity } from '../modules/calendar/entities/event-instance-exception.entity';

@EntityRepository(EventInstanceExceptionEntity)
export class EventInstanceExceptionRepository extends Repository<EventInstanceExceptionEntity> {
  public async createAndInsert(
    eventId: string,
    createData: {
      exceptionDates: Date[];
      exceptionTypeId: InstanceExceptionType;
    },
  ): Promise<void> {
    const instanceExceptions = this.create(
      createData.exceptionDates.map((ed) => ({
        exceptionDate: ed,
        event: { id: eventId },
        exceptionType: { id: createData.exceptionTypeId },
      })),
    );
    await this.createQueryBuilder()
      .insert()
      .values(instanceExceptions)
      .execute();
  }
}
