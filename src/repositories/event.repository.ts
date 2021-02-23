import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Frequency } from '../constants/frequencies';
import { IEventInstance } from '../modules/calendar/calendar.interface';
import { EventEntity } from '../modules/calendar/entities/event.entity';

@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {
  public async updateById(
    eventId: string,
    updateEventData: {
      startDate?: Date;
      frequencyId?: Frequency;
    },
  ): Promise<void> {
    const updateData: QueryDeepPartialEntity<EventEntity> = {};

    if (updateEventData.startDate) {
      updateData.startDate = updateEventData.startDate;
    }

    if (updateEventData.frequencyId) {
      updateData.frequency = {
        id: updateEventData.frequencyId,
      };
    }

    await this.update(eventId, updateData);
  }

  public async getById(eventId: string): Promise<EventEntity> {
    const [event] = await this.findByIds([eventId]);
    return event;
  }

  public async getGeneratedInstancesInPeriod(
    userId: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<IEventInstance[]> {
    const transformDateToTimestamp = (date: Date): number =>
      Math.round(date.getTime() / 1000);

    const dateToTimestamp = transformDateToTimestamp(dateTo);
    const dateFromTimestamp = transformDateToTimestamp(dateFrom);
    // select union used in case of different types of event
    return this.query(
      `select
            generate_series(?, ?, ef.frequency) as instanceTimestamp,
            e.id as eventId
        from
            events e
        join event_frequencies ef on
            ef.id = e.frequency_id
        where
            e.user_id = ? and e.start_date > ?
        union
        select
            e.start_date as instanceTimestamp,
            e.id as eventId
        from
            events e
        where
            e.user_id = ? and e.frequency_id = ? and e.start_date between ? and ?`,
      [
        dateFromTimestamp,
        dateToTimestamp,
        userId,
        dateFromTimestamp,
        userId,
        Frequency.NONE,
        dateFromTimestamp,
        dateToTimestamp,
      ],
    );
  }
}
