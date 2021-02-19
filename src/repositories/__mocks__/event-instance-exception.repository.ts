/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InstanceExceptionType } from '../../constants/instance-exception-types';

export class EventInstanceExceptionRepository {
  public async createAndInsert(
    eventId: string,
    createData: {
      exceptionDates: Date[];
      exceptionTypeId: InstanceExceptionType;
    },
  ): Promise<void> {}
}
