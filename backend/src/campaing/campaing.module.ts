import { Module } from '@nestjs/common';
import { CampaingController } from './campaing.controller';
import { CampaingService } from './campaing.service';
import { CampaingRepository } from './campaing.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaing } from 'src/entities/campaing.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Campaing]), UsersModule],
  controllers: [CampaingController],
  providers: [CampaingService, CampaingRepository],
})
export class CampaingModule {}
