'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { UserEntity } from '../user.entity';

export class UserDto {
    @ApiPropertyOptional()
    firstName: string;

    @ApiPropertyOptional()
    lastName: string;

    @ApiPropertyOptional()
    username: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    phone: string;

    constructor(user: UserEntity) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
    }
}
