import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromCookie(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.get<string>('AUTH_SECRET')
                }
            );
            request['user'] = payload.username;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromCookie(req: Request): string | undefined {
        if (req.cookies && req.cookies.auth_token) {
            return req.cookies.auth_token;
        }
        return null;
    }
}