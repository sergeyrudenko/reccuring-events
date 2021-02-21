import { Frequency } from '../../constants/frequencies';
import { InstanceExceptionType } from '../../constants/instance-exception-types';
import { EventEntity } from './entities/event.entity';

export interface ICreateEventInstances {
  typeId: InstanceExceptionType;
  date: number;
}
export interface IUpdateEvent {
  eventId: string;
  startDate?: string;
  exceptions?: ICreateEventInstances[];
}
export interface ICreateEvent {
  eventId: string;
  cancelInstanceDates?: number[];
  newInstanceDates?: number[];
  startDate: string;
  frequencyId: Frequency;
}

export interface ICalendarService {
  changeEvent(event: EventEntity, updateData: IUpdateEvent): Promise<void>;
  getEventById(eventId: string): Promise<EventEntity>;
  // commented code in case of test task
  //   getUserEvents(userId: string, fromDate: Date, toDate: Date): EventEntity[];
  //   createEvent(createData: ICreateEvent): Promise<EventEntity>;
  //   removeEvent(eventId: string): Promise<void>;
  //   handleEventInstance(eventId: string, startDate: Date): Promise<void>;
}
