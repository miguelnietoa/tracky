import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JoinCampaingDto {
  @ApiProperty({
    example: 'e73ccdab-13b6-468b-9424-d0e6e553914d',
    description: 'Debe ser el uuid de la campaña a unirse',
  })
  @IsNotEmpty({ message: 'El ID de la campaña es obligatorio' })
  campaingId: string;

  @ApiProperty({
    example: 'e73ccdab-13b6-468b-9424-d0e6e553914d',
    description: 'Debe ser el uuid del usuario que se une a la campaña',
  })
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  userId: string;
}
