import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/Dtos/createUser.dto';
import { LoginDto } from 'src/users/Dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(201)
  @Post('createUser')
  async createUser(@Body() createdUserDto: CreateUserDto) {
    return await this.authService.createUserServices(createdUserDto);
  }

  @HttpCode(200)
  @Post('loginUser')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.loginServices(loginDto);
  }
}
