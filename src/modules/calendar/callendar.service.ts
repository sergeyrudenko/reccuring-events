import { Injectable } from '@nestjs/common';

import { EventRepository } from '../../repositories/event.repository';
import { ICalendarService, IUpdateEvent } from './calendar.interface';

@Injectable()
export class CalendarService implements ICalendarService {
  constructor(public readonly eventRepository: EventRepository) {}

  public async changeEvent(updateData: IUpdateEvent): Promise<void> {
    
  }
}
