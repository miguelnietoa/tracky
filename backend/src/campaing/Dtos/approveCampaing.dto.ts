import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ApproveCampaingDto {
  @ApiProperty({
    example: 'e73ccdab-13b6-468b-9424-d0e6e553914d',
    description: 'Debe ser el uuid de la campaña a aprobar',
  })
  @IsNotEmpty({ message: 'El ID de la campaña es obligatorio' })
  campaingId: string;

  @ApiProperty({
    example: 200,
    description: 'Debe ser la cantidad de tokens a asignar a la campaña',
  })
  @IsNotEmpty({ message: 'El token es obligatorio' })
  @IsNumber({}, { message: 'El token debe ser un número' })
  token: number;
}
