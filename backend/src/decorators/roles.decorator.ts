import { SetMetadata } from '@nestjs/common';
import { Roles as RolesEnum } from '../enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
