import {
  IsDateString,
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { InstanceExceptionType } from '../../constants/instance-exception-types';
import {
  ICreateEventInstances,
  IEventInstance,
  IUpdateEvent,
} from './calendar.interface';

class EventInstanceExceptionDto implements ICreateEventInstances {
  @IsDefined()
  @IsIn([InstanceExceptionType.EXCLUSION, InstanceExceptionType.INCLUSION])
  typeId: InstanceExceptionType;

  @IsDefined()
  @IsNumber()
  date: number;
}
export class UpdateEventDto implements IUpdateEvent {
  @IsDefined()
  @IsUUID()
  eventId: string;

  @IsOptional()
  @ValidateNested()
  exceptions?: EventInstanceExceptionDto[];

  @IsOptional()
  @IsDateString()
  startDate?: string;
}

export class GetEventInstancesInPeriodDto {
  @IsDefined()
  @IsDateString()
  dateFrom: string;

  @IsDefined()
  @IsDateString()
  dateTo: string;

  bom: string;
}
export class EventInstancesInPeriodDto implements IEventInstance {
  eventId: string;
  instanceTimestamp: number;
}
