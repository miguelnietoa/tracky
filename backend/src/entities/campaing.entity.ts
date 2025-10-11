import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';
import { CampaingStatus } from 'src/enums/campaing.enum';

@Entity({ name: 'campaings' })
export class Campaing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'int', default: 0 })
  currentParticipants: number;

  @Column({ type: 'int' })
  totalParticipants: number;

  @Column({ type: 'text' })
  goal: string;

  @Column({ type: 'timestamp', nullable: false })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  endDate: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string;

  @Column({ type: 'int', default: 0 })
  token: number;

  @Column({
    type: 'enum',
    enum: CampaingStatus,
    default: CampaingStatus.CREATED,
  })
  campaignStatus: CampaingStatus;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @ManyToMany(() => User, (user) => user.campaigns)
  @JoinTable({
    name: 'campaign_participants',
    joinColumn: { name: 'campaign_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  participants: User[];

  @ManyToOne(() => User, (user) => user.createdCampaigns, { eager: true })
  creator: User;

  @Column({ type: 'varchar', length: 66, nullable: true })
  onchainTxHash?: string;

  @Column({ type: 'varchar', length: 78, nullable: true })
  onchainCampaignId?: string;
}
