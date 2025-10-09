import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  getUsersRepository(): string {
    return 'Get all users';
  }
}
