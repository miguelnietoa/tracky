import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../enums/roles.enum';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/roles.decorator';

interface AuthUser {
  roles?: Roles[];
}

interface CustomRequest extends Request {
  user?: AuthUser;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest<CustomRequest>();

    if (!requiredRoles) return true;
    const user = request.user;

    if (!user) throw new ForbiddenException('Usuario No autorizado');
    const hasRole = user?.roles?.some((role) => requiredRoles.includes(role));

    if (!hasRole)
      throw new ForbiddenException(
        'No tienes permisos para acceder a esta ruta',
      );
    return true;
  }
}
