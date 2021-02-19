import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../repositories/user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(private readonly _userRepository: UserRepository) {}
    public getUserById(userId: string): Promise<UserEntity> {
        return this._userRepository.getById(userId);
    }
}
