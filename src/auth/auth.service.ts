import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, password: string) {
        const user = await this.userService.findUser(email);

        if (user.password !== password) {
            throw new UnauthorizedException()
        }

        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
            userDetails: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                department: user.department
            }
        };
    }

    async verify(email: string) {
        const user = await this.userService.findUser(email);
        if (!user) {
            throw new NotFoundException()
        }
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            department: user.department
        }
    }
}
