import { Injectable } from '@nestjs/common';

import { EventInstanceExceptionRepository } from '../../repositories/event-instance-exception.repository';
import { EventRepository } from '../../repositories/event.repository';
import {
  ICalendarService,
  ICreateEventInstances,
  IUpdateEvent,
} from './calendar.interface';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class CalendarService implements ICalendarService {
  constructor(
    private readonly _eventRepository: EventRepository,
    private readonly _eventInstanceExceptionRepository: EventInstanceExceptionRepository,
  ) {}

  public async changeEvent(
    event: EventEntity,
    updateData: IUpdateEvent,
  ): Promise<void> {
    const { eventId, exceptions, startDate } = updateData;

    if (startDate) {
      await this._eventRepository.updateById(eventId, {
        startDate: new Date(startDate),
      });
    }

    if (exceptions) {
      await this._createEventInstanceExceptions(event.id, exceptions);
    }
  }

  private async _createEventInstanceExceptions(
    eventId: string,
    exceptionData: ICreateEventInstances[],
  ): Promise<void> {
    const preparedInstanceExceptionDate = exceptionData.map((ed) => ({
      exceptionDate: new Date(ed.date * 1000),
      exceptionTypeId: ed.typeId,
    }));
    await this._eventInstanceExceptionRepository.createAndInsert(
      eventId,
      preparedInstanceExceptionDate,
    );
  }

  public getEventById(eventId: string): Promise<EventEntity> {
    return this._eventRepository.getById(eventId);
  }
}
