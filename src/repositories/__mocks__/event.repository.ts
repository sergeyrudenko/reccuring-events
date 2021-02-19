/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Frequency } from '../../constants/frequencies';
import { EventEntity } from '../../modules/calendar/entities/event.entity';

export class EventRepository {
  public getById(id: string): Promise<EventEntity> {
    const event = {
      id: 'event-id',
      frequencyId: Frequency['BI-WEEKLY'],
      userId: 'user-id',
      companyId: 'company-id',
    } as EventEntity;
    return Promise.resolve(event);
  }

  public async updateById(
    eventId: string,
    updateEventData: {
      startDate?: Date;
      frequenceId?: Frequency;
    },
  ): Promise<void> {}
}
