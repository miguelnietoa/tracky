import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: any;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<CustomRequest>();

    // Obtener el token del encabezado de autorización
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token requerido');

    // Validar que JWT_SECRET esté definido
    const secret = process.env.JWT_SECRET;
    if (!secret)
      throw new UnauthorizedException('Configuración del servidor incorrecta');

    try {
      // Verificar el token
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = this.jwtService.verify(token, { secret });
      // Convertir las fechas de timestamp a objetos Date
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      payload.exp = new Date(payload.exp * 1000);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      payload.iat = new Date(payload.iat * 1000);

      // Validar que el token contenga roles válidos
      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        !payload.role ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        !Array.isArray(payload.role) ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        payload.role.length === 0
      ) {
        throw new UnauthorizedException('No tienes los permisos necesarios');
      }

      // Almacenar el usuario en la solicitud
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      request.user = payload;

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('El token ha expirado');
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Token inválido');
      }
      throw new UnauthorizedException(`Error de autenticación `);
    }
  }
}
