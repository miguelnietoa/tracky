import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/Dtos/createUser.dto';
import { LoginDto } from 'src/users/Dtos/login.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async createUserServices(createdUserDto: CreateUserDto) {
    if (!createdUserDto.email || !createdUserDto.password) {
      throw new BadRequestException('El email y el password son necesarios');
    }
    const emailExisting = await this.usersRepository.getUserByEmailRepository(
      createdUserDto.email,
    );
    if (emailExisting) {
      throw new BadRequestException('Este email ya está en uso');
    }

    return await this.usersRepository.createUserRepository(createdUserDto);
  }

  async loginServices(loginDto: LoginDto) {
    const user =
      await this.usersRepository.getUserByEmailAndCredentialRepository(
        loginDto.email,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Correo electronico o contraseña son inválidas',
      );
    }

    if (!(await bcrypt.compare(loginDto.password, user.credential.password))) {
      throw new UnauthorizedException(
        'Correo electrónico o contraseña son inválidas',
      );
    }

    const payload = {
      email: user.email,
      uuid: user.id,
      role: Array.isArray(user.credential.role)
        ? user.credential.role
        : [user.credential.role],
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
