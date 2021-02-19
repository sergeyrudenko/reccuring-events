import { Body, Controller, Put } from '@nestjs/common';

import { GetUser } from '../../decorators/user';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CalendarService } from './callendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(userService: UserService, calendarService: CalendarService) {}

  @Put('event')
  public changeEventDate(
    @GetUser() user: UserEntity,
    @Body() body: UpdateEventDto,
  ) {
    this.userService;
  }
}
