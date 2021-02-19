/* eslint-disable max-classes-per-file */
'use strict';

import { UserEntity } from './entities/user.entity';

export class UserDto {
  firstName: string;

  lastName: string;

  username: string;

  email: string;

  phone: string;

  constructor(user: UserEntity) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }
}
