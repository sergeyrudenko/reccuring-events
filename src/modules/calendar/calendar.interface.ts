import { EventEntity } from './entities/event.entity';

export interface IUpdateEvent {
  eventId: string;
  cancelInstanceDates?: number[];
  newInstanceDates?: number[];
  startDate?: string;
}

export interface ICalendarService {
  getEvents(fromDate: Date, toDate: Date): EventEntity[];
  changeEvent(updateData: IUpdateEvent): void;
  createEvent(): EventEntity;
  removeEvent(eventId: string): void;
  handleEventInstance(eventId: string, startDate: Date): void;
}
