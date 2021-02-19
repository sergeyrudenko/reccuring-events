import { Injectable } from '@nestjs/common';

import { InstanceExceptionType } from '../../constants/instance-exception-types';
import { EventInstanceExceptionRepository } from '../../repositories/event-instance-exception.repository';
import { EventRepository } from '../../repositories/event.repository';
import { IUpdateEvent } from './calendar.interface';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class CalendarService /* implements ICalendarService */ {
  constructor(
    private readonly _eventRepository: EventRepository,
    private readonly _eventInstanceExceptionRepository: EventInstanceExceptionRepository,
  ) {}

  public async changeEvent(
    event: EventEntity,
    updateData: IUpdateEvent,
  ): Promise<void> {
    const {
      eventId,
      cancelInstanceDates,
      newInstanceDates,
      startDate,
    } = updateData;

    if (startDate) {
      await this._eventRepository.updateById(eventId, {
        startDate: new Date(startDate),
      });
    }

    await this._createEventInstanceExceptionsIfNeed(
      event.id,
      cancelInstanceDates,
      InstanceExceptionType.EXCLUSION,
    );

    await this._createEventInstanceExceptionsIfNeed(
      event.id,
      newInstanceDates,
      InstanceExceptionType.INCLUSION,
    );
  }

  private async _createEventInstanceExceptionsIfNeed(
    eventId: string,
    timestampDates: number[],
    typeId: InstanceExceptionType,
  ): Promise<void> {
    if (timestampDates && timestampDates.length !== 0) {
      const prepareInstanceExceptionDate = {
        exceptionDates: timestampDates.map((cid) => new Date(cid * 1000)),
        exceptionTypeId: typeId,
      };
      await this._eventInstanceExceptionRepository.createAndInsert(
        eventId,
        prepareInstanceExceptionDate,
      );
    }
  }

  public getEventById(eventId: string): Promise<EventEntity> {
    return this._eventRepository.getById(eventId);
  }
}
