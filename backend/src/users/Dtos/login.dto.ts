import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Debe ser un string de entre 8 y 50 caracteres',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty({
    message: 'El email es requerido',
  })
  @IsString({
    message: 'El email debe ser una cadena de caracteres',
  })
  email: string;

  @ApiProperty({
    description:
      'Debe ser un string de entre 8 y 15 caracteres con al menos una mayuscula una  minuscula, un numero y un caracter especial',
    example: 'Password123*',
  })
  @IsNotEmpty({
    message: 'La contraseña es requerida',
  })
  @IsString({
    message: 'La contraseña debe ser una cadena de caracteres',
  })
  password: string;
}
