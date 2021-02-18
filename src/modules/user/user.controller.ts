'use strict';

import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UserController {
    @Get('admin')
    @HttpCode(HttpStatus.OK)
    admin(): string {
        return '';
    }
}
