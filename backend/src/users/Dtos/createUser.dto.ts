import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  IsEthereumAddress,
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
    description:
      'Dirección de wallet válida de la red Ethereum (formato 0x + 40 hex)',
    example: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  })
  @IsString({ message: 'La wallet debe ser una cadena de texto' })
  @IsEthereumAddress({
    message:
      'La wallet no cumple con el formato de una dirección válida de Ethereum',
  })
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
