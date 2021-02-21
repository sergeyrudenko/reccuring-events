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
import { ICreateEventInstances, IUpdateEvent } from './calendar.interface';

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
