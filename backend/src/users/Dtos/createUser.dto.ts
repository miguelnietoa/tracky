import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  @ApiProperty({
    description: 'El nombre debe ser un string de entre 3 y 20 caracteres',
    example: 'John',
  })
  @IsNotEmpty({
    message: 'El nombre es requerido',
  })
  @IsString({
    message: 'El nombre debe ser una cadena de caracteres',
  })
  @MinLength(3, {
    message: 'El nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(20, {
    message: 'El nombre debe tener máximo 20 caracteres',
  })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, {
    message: 'El nombre solo puede contener letras y espacios',
  })
  name: string;

  @ApiProperty({
    description: 'El apellido debe ser un string de entre 3 y 20 caracteres',
    example: 'Doe',
  })
  @IsNotEmpty({
    message: 'El apellido es requerido',
  })
  @IsString({
    message: 'El apellido debe ser una cadena de caracteres',
  })
  @MinLength(3, {
    message: 'El apellido debe tener al menos 3 caracteres',
  })
  @MaxLength(20, {
    message: 'El apellido debe tener máximo 20 caracteres',
  })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, {
    message: 'El apellido solo puede contener letras y espacios',
  })
  lastName: string;

  @ApiProperty({
    description: 'El email debe ser un string de entre 8 y 50 caracteres',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty({
    message: 'El email es requerido',
  })
  @IsString({
    message: 'El email debe ser una cadena de caracteres',
  })
  @MinLength(8, {
    message: 'El email debe tener al menos 8 caracteres',
  })
  @MaxLength(50, {
    message: 'El email debe tener máximo 50 caracteres',
  })
  @IsEmail(
    {},
    {
      message: 'El email no es válido',
    },
  )
  email: string;

  @ApiProperty({
    description: 'Dirección de wallet válida de la red Polkadot (formato SS58)',
    example: '12sPNvGgQXznTvJtLoxBkgM8ChYbC5j8pRT7XoHgfci2XUvu',
  })
  @IsString()
  @Matches(
    /^1[1-9A-HJ-NP-Za-km-z]{46,49}$|^1[1-9A-HJ-NP-Za-km-z]{47,48}$|^12[1-9A-HJ-NP-Za-km-z]{45,48}$/,
    {
      message:
        'La wallet no cumple con el formato de una dirección válida de Polkadot',
    },
  )
  wallet: string;

  @ApiProperty({
    description:
      'la contraseña debe ser un string de entre 8 y 15 caracteres con al menos una mayuscula una  minuscula, un numero y un caracter especial',
    example: 'Password123*',
  })
  @IsNotEmpty({
    message: 'La contraseña es requerida',
  })
  @IsString({
    message: 'La contraseña debe ser una cadena de caracteres',
  })
  @MinLength(8, {
    message: 'La contraseña debe tener al menos 8 caracteres',
  })
  @MaxLength(15, {
    message: 'La contraseña debe tener máximo 15 caracteres',
  })
  @Matches(
    /^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zñÑ\d@$!%*?&]{8,15}$/,
    {
      message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial',
    },
  )
  password: string;

  @ApiProperty({
    description:
      'Debe ser un string de entre 8 y 15 caracteres con al menos una mayuscula una  minuscula, un numero y un caracter especial',
    example: 'Password123*',
  })
  @IsNotEmpty({
    message: 'Confirmar contraseña es requerida',
  })
  @IsString({
    message: 'Confirmar contraseña debe ser una cadena de caracteres',
  })
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;
}
