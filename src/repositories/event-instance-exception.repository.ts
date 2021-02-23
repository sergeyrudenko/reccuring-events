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

  public async getInPeriod(
    eventIds: string[],
    dateFrom: Date,
    dateTo: Date,
  ): Promise<
    {
      eventId: string;
      exceptionDate: number;
      exceptionTypeId: InstanceExceptionType;
    }[]
  > {
    const transformDateToTimestamp = (date: Date): number =>
      date.getTime() / 1000;

    const dateToTimestamp = transformDateToTimestamp(dateTo);
    const dateFromTimestamp = transformDateToTimestamp(dateFrom);

    const eventInstances = await this.createQueryBuilder('eie')
      .where('eie.event_id IN (:eventIds)', { eventIds })
      .andWhere(
        'eie.exception_date between :dateToTimestamp and :dateFromTimestamp ',
        { dateFromTimestamp, dateToTimestamp },
      )
      .getMany();
    return eventInstances.map((ei) => ({
      eventId: ei.eventId,
      exceptionDate: transformDateToTimestamp(ei.exceptionDate),
      exceptionTypeId: ei.exceptionTypeId,
    }));
  }
}
