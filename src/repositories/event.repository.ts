import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Frequency } from '../constants/frequencies';
import { EventEntity } from '../modules/calendar/entities/event.entity';

@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {
  public async updateById(
    eventId: string,
    updateEventData: {
      startDate?: Date;
      frequenceId?: Frequency;
    },
  ): Promise<void> {
    const updateData: QueryDeepPartialEntity<EventEntity> = {};

    if (updateEventData.startDate) {
      updateData.startDate = updateEventData.startDate;
    }

    if (updateEventData.frequenceId) {
      updateData.frequency = {
        id: updateEventData.frequenceId,
      };
    }

    await this.update(eventId, updateData);
  }

  public async getById(eventId: string): Promise<EventEntity> {
    const [event] = await this.findByIds([eventId]);
    return event;
  }
}
