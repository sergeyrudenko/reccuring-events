import { UserEntity } from '../../modules/user/entities/user.entity';

export class UserRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getById(id: string): Promise<UserEntity> {
    const user = {
      id: 'user-id',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
    } as UserEntity;
    return Promise.resolve(user);
  }
}
