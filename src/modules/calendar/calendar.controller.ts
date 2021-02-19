import { Body, Controller, ForbiddenException, Put } from '@nestjs/common';

import { EventNotFoundException } from '../../exceptions/event-not-found.exception';
import { EVENT_SUSSESSFULLY_UPDATED } from '../../messages/event';
import { MessageDto } from '../../shared/dto';
import { UserService } from '../user/user.service';
import { UpdateEventDto } from './calendar.dto';
import { CalendarService } from './callendar.service';

@Controller('calendar')
export class CalendarController {
    constructor(
        private _userService: UserService,
        private _calendarService: CalendarService,
    ) {}

    @Put('event')
    public async changeEventDate(
        @Body() body: UpdateEventDto,
    ): Promise<MessageDto> {
        const hardCodedUserId = 'user-id';
        const user = await this._userService.getUserById(hardCodedUserId);
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
