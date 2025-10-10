import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getUserInformationServices(id: string) {
    return this.usersRepository.getUserInformationByIdRepository(id);
  }
}
