import {
  IsDate,
  IsDateString,
  IsDefined,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

import { IUpdateEvent } from './calendar.interface';

export class UpdateEventDto implements IUpdateEvent {
  @IsDefined()
  @IsUUID()
  eventId: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  cancelInstanceDates?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  @IsDate({ each: true })
  newInstanceDates?: number[];

  @IsOptional()
  @IsDateString()
  startDate?: string;
}
