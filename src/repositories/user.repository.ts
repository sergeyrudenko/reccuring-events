import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { UserEntity } from '../modules/user/entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    public async getById(userId: string): Promise<UserEntity> {
        const [user] = await this.findByIds([userId]);
        return user;
    }
}
