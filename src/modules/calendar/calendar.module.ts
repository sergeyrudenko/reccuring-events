import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventInstanceExceptionRepository } from '../../repositories/event-instance-exception.repository';
import { EventRepository } from '../../repositories/event.repository';
import { UserModule } from '../user/user.module';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './callendar.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      EventRepository,
      EventInstanceExceptionRepository,
    ]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
