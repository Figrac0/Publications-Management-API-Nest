/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthUser } from './auth-user.interface';

function decodeToken(token: string): AuthUser {
  try {
    const json = Buffer.from(token, 'base64').toString('utf8');
    const parsed = JSON.parse(json);

    if (!parsed.userId || !Array.isArray(parsed.roles)) {
      throw new Error('Invalid token payload');
    }

    return {
      userId: String(parsed.userId),
      roles: parsed.roles.map((r: unknown) => String(r)),
    };
  } catch {
    throw new UnauthorizedException('Invalid token');
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: AuthUser }>();

    const authHeader =
      (request.headers['authorization'] ||
        request.headers['Authorization' as any]) ??
      '';

    const header = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    const [type, token] = header.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const user = decodeToken(token);
    request.user = user;

    return true;
  }
}
