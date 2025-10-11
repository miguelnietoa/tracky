import { InjectRepository } from '@nestjs/typeorm';
import { Campaing } from 'src/entities/campaing.entity';
import { Repository } from 'typeorm';
import { CreateCampaingDto } from './Dtos/createCampaing.dto';
import { User } from 'src/entities/users.entity';
import { ApproveCampaingDto } from './Dtos/approveCampaing.dto';
import { CampaingStatus } from 'src/enums/campaing.enum';
import { Contract, JsonRpcProvider, Wallet, parseUnits } from 'ethers';

// ABI mínimo de CampaignManager para crear campaña
const CAMPAIGN_MANAGER_ABI = [
  'function createCampaign(string,string,uint256,uint256,address,string[],address[],uint256) external returns (uint256)',
];

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
    const willReachCapacity =
      campaing.currentParticipants + 1 === campaing.totalParticipants;
    campaing.currentParticipants += 1;
    if (!campaing.participants) {
      campaing.participants = [];
    }
    campaing.participants.push(user);
    if (willReachCapacity) {
      campaing.campaignStatus = CampaingStatus.INPROGRESS;
    }
    const saved = await this.campaingRepository.save(campaing);

    // Si alcanzó la capacidad, crea la campaña on-chain en CampaignManager
    if (willReachCapacity) {
      this.createOnchainCampaign(saved).catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : String(e);
        console.error('Error creando campaña on-chain:', msg);
      });
    }
    return saved;
  }

  private async createOnchainCampaign(c: Campaing) {
    const rpcUrl = process.env.RPC_URL ?? '';
    const privateKey = process.env.PRIVATE_KEY ?? '';
    const managerAddress = ((process.env.CAMPAIGN_MANAGER_ADDRESS as string) ||
      '0x270451c0D3e44bd97ce9F77CFE776EdfaA536dc7') as `0x${string}`;

    if (!rpcUrl || !privateKey) {
      throw new Error('Faltan variables de entorno RPC_URL o PRIVATE_KEY');
    }
    if (!c.creator || !c.creator.wallet) {
      throw new Error('El creador de la campaña no tiene wallet definida');
    }

    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    const provider: JsonRpcProvider = new JsonRpcProvider(rpcUrl);
    const signer: Wallet = new Wallet(privateKey, provider);
    const contract: Contract = new Contract(
      managerAddress,
      CAMPAIGN_MANAGER_ABI,
      signer,
    );

    const name = c.name;
    const description = c.description || '';
    const startAtSec: bigint = BigInt(
      Math.floor(new Date(c.startDate).getTime() / 1000),
    );
    const endAtSec: bigint = BigInt(
      Math.floor(new Date(c.endDate).getTime() / 1000),
    );
    const creatorAddress = c.creator.wallet as `0x${string}`;
    const participantNames = (c.participants || []).map((p) => p.name);
    const participantWallets = (c.participants || []).map(
      (p) => p.wallet as `0x${string}`,
    );
    // Interpretamos c.token como cantidad de TRK con 18 decimales
    const rewardAmountWei: bigint = parseUnits(String(c.token || 0), 18);

    const tx: { wait: (conf?: number) => Promise<unknown> } = await (
      contract as any
    ).createCampaign(
      name,
      description,
      startAtSec,
      endAtSec,
      creatorAddress,
      participantNames,
      participantWallets,
      rewardAmountWei,
    );
    await tx.wait();
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
  }
}
