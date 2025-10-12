import { Body, Controller, Get, Post, Put, UseGuards, Param } from '@nestjs/common';
import { CampaingService } from './campaing.service';
import { CreateCampaingDto } from './Dtos/createCampaing.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enums/roles.enum';
import { ApproveCampaingDto } from './Dtos/approveCampaing.dto';
import { JoinCampaingDto } from './Dtos/joinCampaing.dto';

@Controller('campaing')
export class CampaingController {
  constructor(private readonly campaingService: CampaingService) {}

  @Get('allCampaings')
  getAllCampaings() {
    return this.campaingService.getAllCampaingsServices();
  }

  @Get(':id')
  getCampaingById(@Param('id') id: string) {
    return this.campaingService.getCampaingByIdService(id);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('createCampaing')
  createCampaing(@Body() createCampaingDto: CreateCampaingDto) {
    return this.campaingService.createCampaingServices(createCampaingDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Put('approveCampaing')
  approveCampaing(@Body() approveCampaingDto: ApproveCampaingDto) {
    return this.campaingService.approveCampaingServices(approveCampaingDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put('joinCampaing')
  joinCampaing(@Body() joinCampaingDto: JoinCampaingDto) {
    return this.campaingService.joinCampaingServices(joinCampaingDto);
  }
}
