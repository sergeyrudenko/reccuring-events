import { Test } from '@nestjs/testing';

import { CalendarController } from '../../../src/modules/calendar/calendar.controller';
import { CalendarService } from '../../../src/modules/calendar/callendar.service';
import { UserService } from '../../../src/modules/user/user.service';
import { EventInstanceExceptionRepository } from '../../../src/repositories/event-instance-exception.repository';
import { EventRepository } from '../../../src/repositories/event.repository';
import { UserRepository } from '../../../src/repositories/user.repository';

jest.mock('../../../src/repositories/user.repository');
jest.mock('../../../src/repositories/event.repository');
jest.mock('../../../src/repositories/event-instance-exception.repository');

describe('CalendarController (unit)', () => {
  let calendarController: CalendarController;
  let userRepository: UserRepository;
  let eventInstanceExceptionRepository: EventInstanceExceptionRepository;
  let eventRepository: EventRepository;

  beforeAll(
    async (): Promise<void> => {
      const moduleFixture = await Test.createTestingModule({
        controllers: [CalendarController],
        providers: [
          UserService,
          CalendarService,
          UserRepository,
          EventRepository,
          EventInstanceExceptionRepository,
        ],
      }).compile();

      calendarController = moduleFixture.get<CalendarController>(
        CalendarController,
      );

      userRepository = moduleFixture.get<UserRepository>(UserRepository);
      eventInstanceExceptionRepository = moduleFixture.get<EventInstanceExceptionRepository>(
        EventInstanceExceptionRepository,
      );
      eventRepository = moduleFixture.get<EventRepository>(EventRepository);
    },
  );

  beforeEach(() => {
    jest.clearAllMocks().restoreAllMocks();
  });

  describe('update event dates', () => {
    it('should update event', async (): Promise<void> => {
      const getUserById = jest.spyOn(userRepository, 'getById');
      const createEventInstanceException = jest.spyOn(
        eventInstanceExceptionRepository,
        'createAndInsert',
      );

      const getEventById = jest.spyOn(eventRepository, 'getById');

      const updateEventById = jest.spyOn(eventRepository, 'updateById');

      const currentDate = new Date();
      await calendarController.changeEventDate({
        eventId: 'event-id',
        newInstanceDates: [123, 123],
        cancelInstanceDates: [123, 123],
        startDate: currentDate.toISOString(),
      });

      expect(getUserById).toBeCalledWith('user-id');
      expect(getUserById).toBeCalledTimes(1);

      expect(getEventById).toBeCalledWith('event-id');
      expect(getEventById).toBeCalledTimes(1);

      expect(createEventInstanceException).toBeCalledTimes(2);

      expect(updateEventById).toBeCalledWith('event-id', {
        startDate: currentDate,
      });
      expect(updateEventById).toBeCalledTimes(1);
    });
  });
});
