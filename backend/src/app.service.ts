import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { Credential } from './entities/credential.entity';
import * as fs from 'fs';
import { RolesEnum } from './enums/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class DataLoaderUsers implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
  ) {}
  async onModuleInit() {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      console.log('cargando usuarios iniciales...');
      const queryRunner =
        this.userRepository.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const rawData = fs.readFileSync('src/utils/user.json', 'utf-8');
        const parsed: unknown = JSON.parse(rawData);

        type SeedUser = {
          name: string;
          lastName: string;
          email: string;
          wallet: string;
          password: string;
          role: string;
        };

        const isSeedUser = (u: unknown): u is SeedUser => {
          if (!u || typeof u !== 'object') return false;
          const o = u as Record<string, unknown>;
          return (
            typeof o.name === 'string' &&
            typeof o.lastName === 'string' &&
            typeof o.email === 'string' &&
            typeof o.wallet === 'string' &&
            typeof o.password === 'string' &&
            typeof o.role === 'string'
          );
        };

        if (!Array.isArray(parsed) || !parsed.every(isSeedUser)) {
          throw new Error('Invalid format for users.json');
        }

        const users: SeedUser[] = parsed;
        await Promise.all(
          users.map(async (user) => {
            const newUser = this.userRepository.create({
              name: user.name,
              lastName: user.lastName,
              email: user.email,
              wallet: user.wallet,
            });
            const savedUser = await queryRunner.manager.save(newUser);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            const newCredential = this.credentialRepository.create({
              password: hashedPassword,
              role: user.role as RolesEnum,
              user: savedUser,
            });
            await queryRunner.manager.save(newCredential);
          }),
        );
        await queryRunner.commitTransaction();
        console.log('Usuarios iniciales cargados');
      } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error('Error al cargar usuarios iniciales:', error);
      } finally {
        await queryRunner.release();
      }
    } else {
      console.log('Usuarios ya existen, no se cargan datos iniciales');
    }
  }
}
