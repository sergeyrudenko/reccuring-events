import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class UserService {
    constructor(public readonly userRepository: UserRepository) {}
}
