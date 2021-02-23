import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { InstanceExceptionType } from '../../constants/instance-exception-types';
import { EventInstanceExceptionRepository } from '../../repositories/event-instance-exception.repository';
import { EventRepository } from '../../repositories/event.repository';
import {
  ICalendarService,
  ICreateEventInstances,
  IEventInstance,
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

  public async getEventInstancesInPeriod(
    userId: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<IEventInstance[]> {
    const eventInstances = await this._eventRepository.getGeneratedInstancesInPeriod(
      userId,
      dateFrom,
      dateTo,
    );
    const eventsExceptions = await this._eventInstanceExceptionRepository.getInPeriod(
      eventInstances.map((e) => e.eventId),
      dateFrom,
      dateTo,
    );

    const [
      exceptionToInclude,
      exceptionToExclude,
    ] = _.partition(eventsExceptions, [
      'exceptionTypeId',
      InstanceExceptionType.INCLUSION,
    ]);

    const eventInstancesWithExcludedExceptions = eventInstances.filter((ei) =>
      exceptionToExclude.find(
        (etx) =>
          etx.eventId === ei.eventId &&
          etx.exceptionDate === ei.instanceTimestamp,
      ),
    );

    return [
      ...eventInstancesWithExcludedExceptions,
      ...exceptionToInclude.map((ei) => ({
        eventId: ei.eventId,
        instanceTimestamp: ei.exceptionDate,
      })),
    ].sort((a, b) => a.instanceTimestamp - b.instanceTimestamp);
  }
}
