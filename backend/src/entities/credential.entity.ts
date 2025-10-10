import { Roles } from 'src/enums/roles.enum';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'credentials' })
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.USER,
  })
  role: Roles;

  @OneToOne(() => User, (user) => user.credential)
  user: User;
}
