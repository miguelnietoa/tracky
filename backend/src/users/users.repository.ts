import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './Dtos/createUser.dto';
import { Credential } from 'src/entities/credential.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
  ) {}
  async getUserByEmailRepository(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
  async createUserRepository(createdUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(createdUserDto.password, salt);

    // Crear la credencial con el hash
    const credential = this.credentialRepository.create({
      password: hashedPassword,
    });

    await this.credentialRepository.save(credential);

    // Crear el usuario asociado
    const newUser = this.usersRepository.create({
      name: createdUserDto.name,
      lastName: createdUserDto.lastName,
      email: createdUserDto.email,
      wallet: createdUserDto.wallet,
      credential,
    });

    await this.usersRepository.save(newUser);

    return { message: 'Usuario creado exitosamente' };
  }

  async getUserByEmailAndCredentialRepository(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['credential'],
    });
  }

  getUserInformationByIdRepository(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }
}
