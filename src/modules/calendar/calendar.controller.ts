import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Put,
} from '@nestjs/common';

import { EventNotFoundException } from '../../exceptions/event-not-found.exception';
import { EVENT_SUSSESSFULLY_UPDATED } from '../../messages/event';
import { userSeed } from '../../seeds/user';
import { MessageDto } from '../../shared/dto';
import { UserService } from '../user/user.service';
import {
  EventInstancesInPeriodDto,
  GetEventInstancesInPeriodDto,
  UpdateEventDto,
} from './calendar.dto';
import { CalendarService } from './callendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(
    private _userService: UserService,
    private _calendarService: CalendarService,
  ) {}

  @Get(':dateFrom/:dateTo')
  public async getEventInstancesInPeriod(
    @Param() query: GetEventInstancesInPeriodDto,
  ): Promise<EventInstancesInPeriodDto[]> {
    return this._calendarService.getEventInstancesInPeriod(
      userSeed.id,
      new Date(query.dateFrom),
      new Date(query.dateTo),
    );
  }

  @Put('event')
  public async changeEventDate(
    @Body() body: UpdateEventDto,
  ): Promise<MessageDto> {
    const user = await this._userService.getUserById(userSeed.id);
    const event = await this._calendarService.getEventById(body.eventId);
    if (!event) {
      throw new EventNotFoundException();
    }
    if (event.userId !== user.id) {
      throw new ForbiddenException();
    }
    await this._calendarService.changeEvent(event, body);
    return { message: EVENT_SUSSESSFULLY_UPDATED };
  }
}
