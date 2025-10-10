import { InjectRepository } from '@nestjs/typeorm';
import { Campaing } from 'src/entities/campaing.entity';
import { Repository } from 'typeorm';
import { CreateCampaingDto } from './Dtos/createCampaing.dto';
import { User } from 'src/entities/users.entity';
import { ApproveCampaingDto } from './Dtos/approveCampaing.dto';
import { CampaingStatus } from 'src/enums/campaing.enum';

export class CampaingRepository {
  constructor(
    @InjectRepository(Campaing)
    private readonly campaingRepository: Repository<Campaing>,
  ) {}

  async getAllCampaingsRepository() {
    return await this.campaingRepository.find();
  }

  async createCampaingRepository(
    createCampaingDto: CreateCampaingDto,
    userExisting: User,
  ) {
    const newCampaing = this.campaingRepository.create({
      ...createCampaingDto,
      creator: userExisting,
    });
    return await this.campaingRepository.save(newCampaing);
  }

  async getCampaingByName(name: string) {
    return this.campaingRepository.findOne({ where: { name } });
  }

  async getCampaingById(campaingId: string) {
    return this.campaingRepository.findOne({
      where: { id: campaingId },
      relations: ['participants'],
    });
  }

  async approveCampaingRepository(
    campaing: Campaing,
    approveCampaingDto: ApproveCampaingDto,
  ) {
    campaing.campaignStatus = CampaingStatus.ACTIVE;
    campaing.token = approveCampaingDto.token;
    return await this.campaingRepository.save(campaing);
  }

  async joinCampaingRepository(campaing: Campaing, user: User) {
    if (campaing.currentParticipants >= campaing.totalParticipants) {
      throw new Error(
        'La campaña ha alcanzado el número máximo de participantes',
      );
    }
    campaing.currentParticipants += 1;
    if (!campaing.participants) {
      campaing.participants = [];
    }
    campaing.participants.push(user);
    return await this.campaingRepository.save(campaing);
  }
}
