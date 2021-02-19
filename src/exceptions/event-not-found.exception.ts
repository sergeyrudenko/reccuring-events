'use strict';

import { NotFoundException } from '@nestjs/common';

export class EventNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.event_not_found', error);
  }
}
