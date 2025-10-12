import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CampaingRepository } from './campaing.repository';
import { CreateCampaingDto } from './Dtos/createCampaing.dto';
import { UsersRepository } from 'src/users/users.repository';
import { ApproveCampaingDto } from './Dtos/approveCampaing.dto';
import { CampaingStatus } from 'src/enums/campaing.enum';
import { JoinCampaingDto } from './Dtos/joinCampaing.dto';

@Injectable()
export class CampaingService {
  constructor(
    private readonly campaingRepository: CampaingRepository,
    private readonly userRepository: UsersRepository,
  ) {}
  async getAllCampaingsServices() {
    return await this.campaingRepository.getAllCampaingsRepository();
  }

  async getCampaingByIdService(id: string) {
    const campaing = await this.campaingRepository.getCampaingById(id);
    if (!campaing) {
      throw new NotFoundException('Campaña no encontrada');
    }
    return campaing;
  }

  async createCampaingServices(createCampaingDto: CreateCampaingDto) {
    const userExisting = await this.userRepository.getUserByIdRepository(
      createCampaingDto.createdUserId,
    );
    if (!userExisting) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const campaingExisting = await this.campaingRepository.getCampaingByName(
      createCampaingDto.name,
    );
    if (campaingExisting) {
      throw new ConflictException('Ya existe una campaña con ese nombre');
    }
    return this.campaingRepository.createCampaingRepository(
      createCampaingDto,
      userExisting,
    );
  }

  async approveCampaingServices(approveCampaingDto: ApproveCampaingDto) {
    const campaing = await this.campaingRepository.getCampaingById(
      approveCampaingDto.campaingId,
    );
    if (!campaing) {
      throw new NotFoundException('Campaña no encontrada');
    }
    if (campaing.campaignStatus !== CampaingStatus.CREATED) {
      throw new ConflictException('La campaña no está en estado creado');
    }
    return this.campaingRepository.approveCampaingRepository(
      campaing,
      approveCampaingDto,
    );
  }

  async joinCampaingServices(joinCampaingDto: JoinCampaingDto) {
    const user = await this.userRepository.getUserByIdRepository(
      joinCampaingDto.userId,
    );
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const campaing = await this.campaingRepository.getCampaingById(
      joinCampaingDto.campaingId,
    );
    if (!campaing) {
      throw new NotFoundException('Campaña no encontrada');
    }
    if (user.id === campaing.creator.id) {
      throw new ConflictException(
        'El creador no puede unirse a su propia campaña',
      );
    }

    if (campaing.campaignStatus !== CampaingStatus.ACTIVE) {
      throw new ConflictException('La campaña no está activa');
    }
    if (
      campaing.participants?.some((participant) => participant.id === user.id)
    ) {
      throw new ConflictException('El usuario ya está en la campaña');
    }
    return this.campaingRepository.joinCampaingRepository(campaing, user);
  }
}
