import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsNumber,
  IsUrl,
} from 'class-validator';

export class CreateCampaingDto {
  @ApiProperty({
    example: 'e73ccdab-13b6-468b-9424-d0e6e553914d',
    description: 'Debe ser el uuid del usuario que crea la campaña',
  })
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  createdUserId: string;

  @ApiProperty({
    example: 'Salva el amazonas',
    description: 'Debe ser el nombre de la campaña',
  })
  @IsNotEmpty({ message: 'El nombre de la campaña es obligatorio' })
  @IsString({ message: 'El nombre de la campaña debe ser un texto' })
  name: string;

  @ApiProperty({
    example: 'Campaña para salvar el amazonas',
    description: 'Descripción de la campaña',
    required: false,
  })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @IsString({ message: 'La descripción debe ser un texto' })
  description: string;

  @ApiProperty({
    example: 'Brasil',
    description: 'País de la campaña',
  })
  @IsNotEmpty({ message: 'El país es obligatorio' })
  @IsString({ message: 'El país debe ser un texto' })
  country: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Ciudad de la campaña',
  })
  @IsNotEmpty({ message: 'La ciudad es obligatoria' })
  @IsString({ message: 'La ciudad debe ser un texto' })
  city: string;

  @ApiProperty({
    example: 'Av. Paulista, 1578',
    description: 'Dirección de la campaña',
  })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsString({ message: 'La dirección debe ser un texto' })
  address: string;

  @ApiProperty({
    example: 100,
    description: 'Número total de participantes de la campaña',
  })
  @IsNotEmpty({ message: 'El número total de participantes es obligatorio' })
  @IsNumber(
    {},
    { message: 'El número total de participantes debe ser un número' },
  )
  totalParticipants: number;

  @ApiProperty({
    example: 'Reforestación de 1000 árboles',
    description: 'Objetivo de la campaña',
  })
  @IsNotEmpty({ message: 'El objetivo es obligatorio' })
  @IsString({ message: 'El objetivo debe ser un texto' })
  goal: string;

  @ApiProperty({
    example: '2023-10-01',
    description: 'Fecha de inicio de la campaña en formato YYYY-MM-DD',
  })
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2023-10-31',
    description: 'Fecha de fin de la campaña en formato YYYY-MM-DD',
  })
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    example: 'https://example.com/images/amazonas.jpg',
    description: 'URL de la imagen asociada a la campaña',
    required: false,
  })
  @IsNotEmpty({ message: 'La URL de la imagen no puede estar vacía' })
  @IsUrl({}, { message: 'Debe ser una URL válida' })
  imageUrl: string;
}
